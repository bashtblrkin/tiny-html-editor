import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyMCEEditor} from 'tinymce';
import DropDownWrapper from "../DropDownWrapper/DropDownWrapper";
import AutocompleteType from "../Controls/AutocompleteType/AutocompleteType";
import TypesHistoryList from '../TypesHistoryList/TypesHistoryList';
import './HTMLEditor.scss';
import {cloneNode} from "../../services/dom.service";
import {ListItems} from "../../interfaces/interfaces";
import {createPortal} from "react-dom";

const simpleDoc = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
\t<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
\t<title>&lt;4D6963726F736F667420576F7264202D20F2F0E5E1EEE2E0EDE8FF20EAF3EAF3F0F3E7E02C20F1EEFF2C20F0E8F120E820F0E0EFF1&gt;</title>
\t<meta name="generator" content="LibreOffice 7.2.5.2 (Linux)"/>
\t<meta name="author" content="chernova-my-080115"/>
\t<meta name="created" content="2022-03-15T14:23:00"/>
\t<meta name="changedby" content="Прокопчик Надежда"/>
\t<meta name="changed" content="2022-03-16T08:32:00"/>
\t<meta name="AppVersion" content="16.0000"/>
\t<meta name="Creator" content="PScript5.dll Version 5.2.2"/>
\t<style type="text/css">
\t\t@page { size: 8.27in 11.69in; margin-left: 1.11in; margin-right: 0.46in; margin-top: 0.74in; margin-bottom: 0.19in }
\t\tp { text-align: left; orphans: 0; widows: 0; margin-left: 0.07in; margin-bottom: 0in; direction: ltr; background: transparent }
\t\tp.western { font-family: "Times New Roman", serif; font-size: 14pt }
\t\tp.cjk { font-family: "Times New Roman"; font-size: 14pt }
\t\tp.ctl { font-family: "Times New Roman"; font-size: 14pt }
\t</style>
</head>
<body lang="en-US" link="#000080" vlink="#800000" dir="ltr">
<div id="TextSection" dir="ltr"><p class="western" align="justify" style="margin-top: 0.05in">
\t<span lang="ru-RU">Приложение</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">1 </span>
\t</p>
\t<p lang="ru-RU" class="western" style="margin-left: 0in; margin-top: 0in">
\t<br/>

\t</p>
\t<p class="western" style="margin-left: 1.79in; text-indent: -1.39in">
\t<span lang="ru-RU">Фитосанитарные</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">требования</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">к</span><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">сое,</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">кукурузе,</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">заливному</span><span style="letter-spacing: -0.3pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">рису</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">и</span><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">рапсу,</span><span style="letter-spacing: -3.4pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">ввозимым</span><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">из</span><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">Российской Федерации</span></p>
\t<p lang="ru-RU" class="western" style="margin-left: 0in; margin-top: 0.01in">
\t<br/>

\t</p>
\t<ol>
\t\t<li><p align="justify" style="line-height: 0.22in; margin-top: 0in">
\t\t<font size="2" style="font-size: 11pt"><font size="4" style="font-size: 14pt">Нормативно-правовая</font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.3pt">
\t\t</span></font><font size="4" style="font-size: 14pt">база</font></font></p>
\t</ol>
\t<ol>
\t\t<li><p align="justify" style="line-height: 100%; margin-right: 0.12in">
\t\t<font size="2" style="font-size: 11pt"><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Закон
\t\t</span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">КНР</span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">
\t\tо карантине животных и растений,
\t\tввозимых и вывозимых</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">через</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">границу»,</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Положение</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">о</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">применении</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">закона</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">КНР</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">о</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">карантине</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -3.4pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">животных</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">и</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">растений,</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">ввозимых</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">и
\t\tвывозимых</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">через</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">границу».</span></font></font></p>
\t\t<li><p align="justify" style="line-height: 100%; margin-right: 0.13in; margin-top: 0in">
\t\t<font size="2" style="font-size: 11pt"><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Закон</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">КНР</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">о</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">безопасности</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">пищевой</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">продукции»,</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Положение</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">о</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -3.4pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">применении</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">закона</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">КНР</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">о
\t\tбезопасности</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.2pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">пищевой</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">продукции».</span></font></font></p>
\t\t<li><p align="justify" style="line-height: 0.22in"><font size="2" style="font-size: 11pt"><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Закон</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 5.6pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">КНР
\t\t </span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 1.9pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">об
\t\t </span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 2.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">инспекции
\t\t </span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 2.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">импортных
\t\t </span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 2.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">и
\t\t </span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 2.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">экспортных
\t\t </span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 2.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">товаров»,</span></font></font></p>
\t</ol>
\t<p class="western" align="justify" style="line-height: 100%; margin-right: 0.12in">
\t<span lang="ru-RU">«Положение</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">о</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">применении</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">закона</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">КНР</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">об</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">инспекции</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">импортных</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">и</span><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">экспортных</span><span style="letter-spacing: -0.1pt"><span lang="ru-RU">
\t</span></span><span lang="ru-RU">товаров».</span></p>
\t<ol start="4">
\t\t<li><p align="justify" style="line-height: 100%; margin-right: 0.12in">
\t\t<font size="2" style="font-size: 11pt"><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Положение</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">КНР</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">об</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">управлении</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">безопасностью</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">ГМО</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">в</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">сельском</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">хозяйстве».</span></font></font></p>
\t\t<li><p align="justify" style="line-height: 100%; margin-right: 0.12in">
\t\t<font size="2" style="font-size: 11pt"><font size="4" style="font-size: 14pt"><span lang="ru-RU">«Протокол</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">между</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">федеральной</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">службой</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">по</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">ветеринарному</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">и</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">фитосанитарному</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">надзору</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">российской</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">федерации</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">и</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">главным</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">государственным</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">управлением</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">по</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">контролю</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">качества,</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">инспекции</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 3.6pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">и</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: -3.4pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">карантину
\t\tкитайской народной республики о
\t\tфитосанитарных требованиях к</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">сое,
\t\tкукурузе, заливному рису и рапсу,
\t\tввозимым в КНР» (17 декабря 2015</span></font><font size="4" style="font-size: 14pt"><span style="letter-spacing: 0.1pt"><span lang="ru-RU">
\t\t</span></span></font><font size="4" style="font-size: 14pt"><span lang="ru-RU">года).</span></font></font></p>
\t</ol>
\t<p lang="ru-RU" class="western" style="margin-left: 0in; margin-top: 0in">
\t<br/>
`

interface HtmlEditorProps {
    /*setViewObj: Dispatch<SetStateAction<ListItems | undefined>>*/
    setViewObj: (items: ListItems | undefined) => void
}

const HtmlEditor: FC<HtmlEditorProps> = ({setViewObj}) => {

    const editorRef = useRef<TinyMCEEditor | null>(null)
    const [toolbarContainer, setToolbarContainer] = useState<Element | null>(null)
    const [openDropDown, setOpenDropDown] = useState(false)
    const [positionDropDown, setPositionDropDown] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [dropDownRender, setDropDownRender] = useState<JSX.Element>()
    const [historyList, setHistoryList] = useState<Set<{ title: string, func: () => void }>>(new Set())

    const checkUndefined = (str: string | undefined | ListItems) => {
        return str ? str : ''
    }

    useEffect(() => {console.log(toolbarContainer)}, [toolbarContainer])

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

    }

    const handleInit = (event: {[p: string]: any}, editor: TinyMCEEditor) => {
        editorRef.current = editor
        setToolbarContainer(document.querySelector('.tox-toolbar__primary'))
    }

    const handleClickAway = () => {
        if (openDropDown) {
            setOpenDropDown(false)
        }
    }

    return (
        <>
            <Editor
                onInit={handleInit}
                initialValue={simpleDoc}
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
                        'removeformat | help | myCustomToolbarButton | myViewButton',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    setup: handleEditorSetup
                }}
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                onClick={handleClickAway}
            />
            <DropDownWrapper position={positionDropDown} open={openDropDown}
                             renderComponent={dropDownRender} handleClickAway={handleClickAway}/>
            <TypesHistoryList history={historyList}/>
        </>
    )
};

export default React.memo(HtmlEditor);