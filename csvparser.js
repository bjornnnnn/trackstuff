
let header = null

function parseHeader(aLine){
    header = aLine.split(";")
}



function parseLine(aLine){
    let nobj = {}
    let splitted = aLine.split(";")
    for (var i = 0; i < splitted.length; i++){
        if (header[i] == "tags"){
            nobj.tags = splitted[i].split(",")
        } else {
            nobj[header[i]] = splitted[i]
        }
    }
    return(nobj)
}

function parseLines(lines){
    let objects = []

    parseHeader(lines[0])
    for(var i = 1; i < lines.length; i++){
        if (lines[i] != ""){
            console.debug(`Parsing line: ${lines[i]}`)
            objects.push(parseLine(lines[i]))
        }
    }
    return objects
}

function parseArea(elemId){
    let e = document.getElementById(elemId)
    lines = e.value.split("\n")
    console.debug(`lines: ${lines}`)
    let result = parseLines(lines)
    console.info(JSON.stringify(result))
    return result
}


