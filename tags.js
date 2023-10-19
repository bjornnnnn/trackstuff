// Protected
global_toggle_state = {}



function toggle(stateName){
    if (global_toggle_state[stateName]){
        global_toggle_state[stateName] = false
    } else {
        global_toggle_state[stateName] = true
    }
}

function getToggleState(stateName){
    return (global_toggle_state[stateName])
}

function elemStyleToggle(toggleState, elementId, classIfOn, classIfOff){
    let e = document.getElementById(elementId)
    if (toggleState){
        console.debug(`Toggling style for element ${elementId} on: ${classIfOn}`)
        e.setAttribute("class", classIfOn)
    } else {
        console.debug(`Toggling style for element ${elementId} off: ${classIfOff}`)
        e.setAttribute("class", classIfOff)
    }
}

function registerToggleState(stateName, initState=true){
    console.debug(`Register toggle state: ${stateName}`)
    global_toggle_state[stateName] = initState
}


// TAGS Functionality
// Global tags is temporary storage strategy. Will be replaced by real DB-solution.
// Protected
global_tags = []

function trackTag(tagName, newTagHook = function(tagName){}){
    if(!global_tags.includes(tagName)){
        global_tags.push(tagName)
        console.log(`New tag: ${tagName}`)
        newTagHook(tagName)
    }
}

function getTagList(){
    return(global_tags)
}

function trackAndToggle(tagName){
    trackTag(tagName, newTagHook=registerToggleState)
}

