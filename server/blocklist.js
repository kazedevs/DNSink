const fs = require('fs')

function loadBlockList(){
    const lines = fs.readFileSync('./blocklist.txt', 'utf-8').split('\n')
    const blocked = new Set()


    for (const line of lines){
        if (line.startsWith('0.0.0.0')){
            const domain = line.split(' ')[1].trim()
            if(domain && domain.trim() !== '0.0.0.0') {
                blocked.add(domain.trim())
            }
        }
    }

    function isBlocked(domain) {
        return blocked.has(domain);
    }

    console.log(`Loaded ${blocked.size} blocked domains`)
    return {isBlocked};
}

module.exports = { loadBlockList }