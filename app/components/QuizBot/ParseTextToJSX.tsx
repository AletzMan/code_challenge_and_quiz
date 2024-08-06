import React from 'react'

// Función para escape de HTML
const escapeHTML = (str: string): string => {
    return str.replace(/&/g, '&amp')
        .replace(/</g, '&lt')
        .replace(/>/g, '&gt')
        .replace(/"/g, '&quot')
        .replace(/'/g, '&#039')
}

// Función para parsear el texto a JSX
export const parseTextToJSX = (text: string): JSX.Element => {
    // Reemplazar bloques de código por <pre><code></code></pre> con soporte para lenguajes
    const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g
    text = text.replace(codeBlockPattern, (match, lang, code) => {
        return ``
    })

    // Reemplazar **negritas** por <strong>negritas</strong>
    const boldPattern = /\*\*(.*?)\*\*/g
    text = text.replace(boldPattern, '<strong>$1</strong>')

    // Reemplazar //itálicas// por <em>itálicas</em>
    const italicPattern = /\/\/(.*?)\/\//g
    text = text.replace(italicPattern, '<em>$1</em>')

    // Reemplazar listas ordenadas (números) por <ol><li></li></ol>
    const orderedListPattern = /(?:^\d+\.\s.*(?:\n|$))+/gm
    text = text.replace(orderedListPattern, match => {
        const items = match.trim().split('\n').map(item => item.replace(/^\d+\.\s/, ''))
        return `<ol>${items.map(item => `<li>${item}</li>`).join('')}</ol>`
    })

    // Reemplazar listas desordenadas (asteriscos) por <ul><li></li></ul>
    const unorderedListPattern = /(?:^\*\s.*(?:\n|$))+/gm
    text = text.replace(unorderedListPattern, match => {
        const items = match.trim().split('\n').map(item => item.replace(/^\*\s/, ''))
        return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`
    })

    // Reemplazar líneas nuevas con <p></p>, excluyendo los que ya están dentro de etiquetas HTML
    const paragraphPattern = /^(?!<[^>]+>)(.+)$/gm
    text = text.replace(paragraphPattern, '<p>$1</p>')

    // Reemplazar listas desordenadas (asteriscos) por <ul><li></li></ul>
    const unorderedListPatternTwo = /\*\s`[^`]+`:\s[^.]+\./
    text = text.replace(unorderedListPatternTwo, match => {
        const items = match.trim().split('\n').map(item => item.replaceAll(/^\*\s/, ''))
        return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`
    })
    // Convertir la cadena resultante a elementos JSX
    return <div dangerouslySetInnerHTML={{ __html: text }} />
}


export const GetCodeBlock = (text: string) => {
    // Expresión regular para capturar el bloque de código entre triples comillas
    const regex = /```(?:java|[a-z]+)?\n([\s\S]*?)\n```/
    const match = text.match(regex)
    if (match) {
        return match[1].trim() // match[1] contiene el código extraído
    }
    return null

}