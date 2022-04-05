import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyMCEEditor} from 'tinymce';
import DropDownWrapper from "../DropDownWrapper/DropDownWrapper";
import AutocompleteType from "../Controls/AutocompleteType/AutocompleteType";
import TypesHistoryList from '../TypesHistoryList/TypesHistoryList';
import './HTMLEditor.scss';
import {cloneNode, deleteTypeContent} from "../../services/dom.service";
import {ListItems} from "../../interfaces/interfaces";
import {useGetDoc} from "../../hooks/fetch.hooks";

interface HtmlEditorProps {
    /*setViewObj: Dispatch<SetStateAction<ListItems | undefined>>*/
    setViewObj: (items: ListItems | undefined) => void
}

const HtmlEditor: FC<HtmlEditorProps> = ({setViewObj}) => {

    const editorRef = useRef<TinyMCEEditor | null>(null)
    const [doc, setDoc] = useState('')
    const [openDropDown, setOpenDropDown] = useState(false)
    const [positionDropDown, setPositionDropDown] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [dropDownRender, setDropDownRender] = useState<JSX.Element>()
    const [historyList, setHistoryList] = useState<{ title: string, func: () => void }[]>([])

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const checkUndefined = (str: string | undefined | ListItems) => {
        return str ? str : ''
    }

    const getDoc = useCallback(async () => {
        setLoading(true)
        const doc = await fetch(`http://192.168.0.54/html`).then(res => res.text())
        setDoc(doc)
        setLoading(false)
    }, [])

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

        editor.ui.registry.addButton('getContentButton', {
            text: 'Получить документ',
            onAction: (api) => {
                getDoc().catch(setError)
            }
        })

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
                initialValue={doc}
                init={{
                    height: 900,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help | myCustomToolbarButton | myViewButton |' +
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