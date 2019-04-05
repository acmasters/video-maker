
const algorithmia = require('algorithmia')  
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentencesBoundaryDetection = require('sbd')

async function robot(content) { 
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    //console.log('Logando se a função"fetchContentFromWikipedia" retorna')
    //console.log(fetchContentFromWikipedia())

    async function fetchContentFromWikipedia(content)  { 
        //return 'Resultado da Promise'
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponde.get()

        content.sourceContentOriginal =  wikipediaContent.content

        console.log(wikipediaContent)
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkDown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDataInParentheses(withoutBlankLinesAndMarkDown)

        content.sourceContentSanitized = withoutDatesInParentheses

        function removeBlankLinesAndMarkDown(text) {
            const allLines = text.split('\n')
            const withoutBlankLinesAndMarkDown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false 
                }
                return true
                })

            return withoutBlankLinesAndMarkDown.join(' ')
            }
        function removeDataInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }

        function breakContentIntoSentences(content) { 
            const sentences = sentenceBondaryDetection.sentences(content.sourceContentSanitized)
            console.log(sentences)
        }

    }
}
module.exports = robot