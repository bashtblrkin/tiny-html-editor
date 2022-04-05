import {Editor as TinyMCEEditor} from "tinymce";
import {Dispatch, SetStateAction} from "react";

export const cloneNode = <T extends Node>(node: T) => {
    return node.cloneNode(true) as T
}

export const pasteNewContent = (editor: TinyMCEEditor, type: string, closeDropDown: Dispatch<SetStateAction<boolean>>) => {
    const node = editor.selection.getContent()
    const styleForSpan = `
                display: inline;
                position: absolute;
                right: 0;
                top: -15px;
                text-indent: 0;
                font-size: 12px;
                font-weight: 300;           
                white-space: nowrap;
            `
    const innerHTML = `${node}<span style="${styleForSpan}" class="__typed_span__">${type}</span>`
    editor.selection.setNode(editor.dom.create('span', {
        style: `position: relative;
                    display: inline;
                    border: 2px solid #cce2fa;
                    padding: 2px;
                    border-radius: 3px;`,
        class: "__typed__"
    }, innerHTML))
    closeDropDown(false)
}

export const deleteTypeContent = (editor: TinyMCEEditor) => {
    const node = editor.selection.getNode()
    const newNode = cloneNode<HTMLSpanElement>(node as HTMLSpanElement)
    node.remove()
    const innerSpan = newNode.querySelector('.__typed_span__')

    if (!innerSpan) return

    innerSpan.remove()
    const innerText = newNode.innerText
    editor.selection.setContent(innerText)
}