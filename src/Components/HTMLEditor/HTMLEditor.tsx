import React, {Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyMCEEditor} from 'tinymce';
import DropDownWrapper from "../DropDownWrapper/DropDownWrapper";
import AutocompleteType from "../Controls/AutocompleteType/AutocompleteType";
import TypesHistoryList from '../TypesHistoryList/TypesHistoryList';
import './HTMLEditor.scss';
import {cloneNode, deleteTypeContent} from "../../services/dom.service";
import {ListItems} from "../../interfaces/interfaces";
import {useParams} from "react-router-dom";
import {host} from "../../Environment";
import {ConnectionContext} from "../../Context/context";

interface HtmlEditorProps {
    setViewObj: (items: ListItems | undefined) => void
}

const HtmlEditor: FC<HtmlEditorProps> = ({setViewObj}) => {

    const editorRef = useRef<TinyMCEEditor | null>(null)
    const [openDropDown, setOpenDropDown] = useState(false)
    const [positionDropDown, setPositionDropDown] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [dropDownRender, setDropDownRender] = useState<JSX.Element>()
    const [historyList, setHistoryList] = useState<{ title: string, func: () => void }[]>([])
    const [data, setData] = useState<string>('')

    const {id} = useParams()
    const {connection} = useContext(ConnectionContext)

    useEffect(() => {
        let busy = false
        console.log('myConnection', connection?.connectionId)
        fetch(`${host}/Requirement/download`, {
            method: 'POST',
            body: JSON.stringify({
                clientId: connection?.connectionId,
                documentId: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 400) {
                    busy = true
                }
                return res.text()
            })
            .then(data => setData(data))
            .catch(error => {
                console.log(error);
            })

        return () => {
            if (!busy) {
                connection?.invoke('AccessDocument',{
                    State: 'Exist',
                    DocumentId: id
                })
            }
        }
    }, [connection, id])

    const checkUndefined = (str: string | undefined | ListItems) => {
        return str ? str : ''
    }

    const handleEditorSetup = (editor: TinyMCEEditor) => {

        editor.ui.registry.addButton('myCustomToolbarButton', {
            text: 'Установить тип',
            onAction: (api) => {
                const toolbar = editorRef.current?.getContainer().querySelector('.tox-toolbar__primary');
                if (toolbar) {
                    const buttonGroup = toolbar.querySelectorAll('.tox-toolbar__group')
                    if (buttonGroup) {
                        const button = buttonGroup[6]
                        const {x, y, width, height} = button.getBoundingClientRect()
                        setPositionDropDown({
                            x: x - (200 - width),
                            y: y + height
                        })
                        setDropDownRender(<AutocompleteType editor={editorRef.current}
                                                            setOpenDropDown={setOpenDropDown}
                                                            addHistoryItem={setHistoryList}
                        />)
                        setOpenDropDown(prev => !prev)
                    }
                }
            }
        })

        editor.ui.registry.addButton('myViewButton', {
            text: 'Показать превью',
            onAction: (api) => {
                let newViewObj: ListItems = {}
                const tinyIframe = document.querySelector('iframe')?.contentDocument
                if (tinyIframe) {
                    const allTypes: NodeListOf<HTMLDivElement> = tinyIframe.querySelectorAll('.__typed__')
                    if (allTypes.length !== 0) {
                        allTypes.forEach(typedElement => {
                            const cloneTypedElement = cloneNode(typedElement)
                            const spanElement: HTMLSpanElement | null = cloneTypedElement.querySelector('.__typed_span__')
                            const type = spanElement?.innerText.toLowerCase()
                            spanElement?.remove()
                            const typedText = cloneTypedElement.innerText
                            switch (type) {
                                case 'подкарантинный объект':
                                    newViewObj = {
                                        ...newViewObj,
                                        'Подкарантинный объект': checkUndefined(newViewObj['Подкарантинный объект']) + ' ' + typedText
                                    }
                                    break;
                                case 'маркировка':
                                    newViewObj = {
                                        ...newViewObj,
                                        'Упаковка': {
                                            ...(newViewObj['Упаковка'] as ListItems),
                                            'Маркировка': checkUndefined((newViewObj['Упаковка'] as ListItems)?.['Маркировка']) + ' ' + typedText
                                        }
                                    }
                                    break;
                                case 'условия':
                                    newViewObj = {
                                        ...newViewObj,
                                        'Упаковка': {
                                            ...(newViewObj['Упаковка'] as ListItems),
                                            'Условия': checkUndefined((newViewObj['Упаковка'] as ListItems)?.['Условия']) + ' ' + typedText
                                        }
                                    }
                                    break;
                                case 'экспорт':
                                    newViewObj = {
                                        ...newViewObj,
                                        'Упаковка': {
                                            ...(newViewObj['Упаковка'] as ListItems),
                                            'Требования': {
                                                ...((newViewObj['Упаковка'] as ListItems)?.['Требования'] as ListItems),
                                                'Требования к экспорту': checkUndefined(((newViewObj['Упаковка'] as ListItems)?.['Требования'] as ListItems)?.['Требования к экспорту']) + ' ' + typedText
                                            }
                                        }
                                    }
                                    break;
                                case 'импорт':
                                    newViewObj = {
                                        ...newViewObj,
                                        'Упаковка': {
                                            ...(newViewObj['Упаковка'] as ListItems),
                                            'Требования': {
                                                ...((newViewObj['Упаковка'] as ListItems)?.['Требования'] as ListItems),
                                                'Требования к импорту': checkUndefined(((newViewObj['Упаковка'] as ListItems)?.['Требования'] as ListItems)?.['Требования к импорту']) + ' ' + typedText
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    return null
                            }
                        })
                        setViewObj(newViewObj)
                    }
                }
            }
        })

        /*editor.ui.registry.addButton('getContentButton', {
            text: 'Получить документ',
            onAction: (api) => {
                getDoc().catch(setError)
            }
        })*/

        editor.ui.registry.addButton('deleteContentType', {
            text: 'Удалить тип',
            onAction: (api) => {
                deleteTypeContent(editor)
            }
        })
    }

    const handleInit = (event: {[p: string]: any}, editor: TinyMCEEditor) => {
        editorRef.current = editor
    }

    const handleClickAway = () => {
        if (openDropDown) {
            setOpenDropDown(false)
        }
    }

    const deleteLastElement = useCallback(() => {
        setHistoryList(prev => [...prev.slice(0, prev.length - 1)])
    }, [])

    return (
        <>
            <Editor
                onInit={handleInit}
                initialValue={data}
                init={{
                    height: 900,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount fullpage'
                    ],
                    valid_children: "+body[style]",
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'myCustomToolbarButton | myViewButton |' +
                        'getContentButton | deleteContentType',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    setup: handleEditorSetup
                }}
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                onClick={handleClickAway}
            />
            <DropDownWrapper position={positionDropDown} open={openDropDown}
                             renderComponent={dropDownRender} handleClickAway={handleClickAway}/>
            {historyList.length !== 0 && <TypesHistoryList history={historyList} deleteLastElem={deleteLastElement}/>}
        </>
    )
};

export default React.memo(HtmlEditor);