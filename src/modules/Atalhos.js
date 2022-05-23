// Atalhos *********************************************************************
// Define atalhos inspirados no jQuery | facilita a sintaxe
// *****************************************************************************
const $ = document.querySelector.bind(document);      // pega seletor
const $$ = document.querySelectorAll.bind(document);  // pega todos os seletores
const print = console.log.bind(console);              // imprime no console
// *****************************************************************************
// Para remover os atalhos, substitua todas as ocorrências de:
// $$(      por    document.querySelectorAll(
// $(       por    document.querySelector(
// print(   por    console.log(
// *****************************************************************************

export { $, $$, print };