const readline = require('readline-sync')
<<<<<<< HEAD
const robots =  {
    text: require ('./robots/text.js')
}

async function start () {
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    await robots.text(content)

=======

function start () {
    const content = {}
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

>>>>>>> f57f106b267fc3d6df6b29957c1af4a2641ad5cc
    function askAndReturnSearchTerm() {
        return readline.question('Type a Wikipedia search term :')
    }
    function askAndReturnPrefix() {
        const prefixes = ['Who is','What is','The History of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes, "Choose one option: ")
        const selectedPrefixText = prefixes[selectedPrefixIndex]
<<<<<<< HEAD

=======
        
>>>>>>> f57f106b267fc3d6df6b29957c1af4a2641ad5cc
        return selectedPrefixText    
    }
    console.log(content)

}
<<<<<<< HEAD
=======

>>>>>>> f57f106b267fc3d6df6b29957c1af4a2641ad5cc
start()
