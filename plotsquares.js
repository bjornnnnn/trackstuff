/* function tagToggleWrap(elemId, classIfOn, classIfOff){
    return function(state){
        elemStyleToggle(state, elemId, classIfOn, classIfOff)
    }
}
 */

function showHideTagFilteredElems(){
    // data holds all tickets, 
    // global_toggle_state holds all tag states
    // Check if ticket i has state j and show if j is true.
    // Tickets with no tags shall always show.
    // Showing tickets according to OR conditional if a trackable has more than one tag.
    const trackableLabels = Object.keys(data)
    for (var i in trackableLabels){
        let trackableObj = data[trackableLabels[i]]
        let e = document.getElementById(trackableObj.id)
        const stateKeys = Object.keys(global_toggle_state)
        for (var j in stateKeys){
            // OR Rule gives that if a trackable has at least one tag that is toggled on
            // it shall show up. 
            //console.debug(`Style toggling elem: ${trackableObj.id} -> ${stateKeys[j]}`)
            if (trackableObj.tags.includes(stateKeys[j]) ){
                if (global_toggle_state[stateKeys[j]]){
                    //console.debug(`...set on`)
                    e.setAttribute("class","ticket " + statelut[trackableObj.status]) 
                    break // The OR-rule: stop hiding things if at least one tag is present.
                } else {
                    //console.debug(`...set off`)
                    e.setAttribute("class","ticket-hidden state-hidden") 
                    
                }
            }
        }
    }
}


function user_clicks_tagMain(state){
    //console.info("Clicked tagMain:" + state)
    toggle(state)
    elemStyleToggle(getToggleState(state), "tag_" + state, "tictag-on", "tictag-off")
    showHideTagFilteredElems()
}


function tagElemMain(tagName){
    let b = document.createElement("button")
    b.setAttribute("class", "tictag-on")
    b.setAttribute("id", "tag_" + tagName)
    b.innerHTML = tagName
    b.setAttribute("onclick", `javascript:user_clicks_tagMain("${tagName}")`)
    return(b)
}

function tagElem(tagName){
    let b = document.createElement("button")
    b.setAttribute("class", "tictag-on")
    b.innerHTML = tagName
    return(b)
}

// Drag and drop reorder begin -->

/* Any ticket shall be draggable to all other tickets. 
   If a ticket is dropped on another ticket 
   it shall be placed before it in the dataOrder-array
*/
let dragged = null

function moveTrackableBefore(targetId, moveId){
    let targetPos = dataOrder.indexOf(targetId)
    let movePos = dataOrder.indexOf(moveId)
    let nAry = ary_deleteElemAtIndex(dataOrder, movePos)
    dataOrder = ary_insertElemBefore(nAry, targetPos, moveId)
    let e = document.getElementById("squares")
    e.innerHTML = ""
    displayTrackablesInOrder()
}

// <-- Drag and drop reorder end


function plotsq(trackobj, statelut){
    const s = document.createElement("span")
    s.setAttribute("class", "ticket" + " " + statelut[trackobj.status])
    s.setAttribute("id", trackobj.id)
    s.setAttribute("draggable", true)

    s.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem
        dragged = event.target;
    });

    s.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
      });

    s.addEventListener("drop", (event) => {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged element to the selected drop target
        console.debug(`orderBefore('${s.id}','${dragged.id}')`)
        moveTrackableBefore(s.id, dragged.id)
      });


    const h = document.createElement("h3")
    h.innerHTML = trackobj.id
    s.appendChild(h)
    const p = document.createElement("p")
    p.innerHTML= trackobj.title
    s.appendChild(p)
    
    // Add tags
    for(var t in trackobj.tags){
        let tagE = tagElem(trackobj.tags[t])
        trackAndToggle(trackobj.tags[t])        
        s.appendChild(tagE)
    }
    return(s)
}

const statelut = {
    "IN-PROD" : "state-green",
    "IN-DEV" : "state-orange",
    "IN-TEST" : "state-blue",
    "NEW" : "state-gray"
}

function displayTrackablesInOrder(){
    let indexedT = {}
    data.forEach(element => {
        indexedT[element.id] = element
    });
    const e = document.getElementById("squares")
    for (i in dataOrder){
        e.appendChild(plotsq(indexedT[dataOrder[i]], statelut ))
    }

}
/* 
function displayTickets(data){
    const e = document.getElementById("squares")
    for (i in data){
        e.appendChild(plotsq(data[i], statelut ))
    }
}
 */
function displayTagbar(){
    let tb = document.getElementById("tagbar")
    const tags = getTagList()
    for (var i in tags){
        let t = tagElemMain(tags[i])
        tb.appendChild(t)
    }
}

// Replace internal data with user provided csv
function syncCSVIn(){
    let jsondata = parseArea("csvArea")
    dataOrder = jsondata.map(e => e.id)
    data = jsondata
    let squares  = document.getElementById("squares")
    squares.innerHTML = ""
    displayTrackablesInOrder()
    let tb = document.getElementById("tagbar")
    tb.innerHTML = ""
    displayTagbar()
}

// Show internal data in parse area for csv.
function syncCSVOut(){
    let outStr = ""
    header = ["id", "title", "status", "tags"]
    outStr = outStr + header.join(";") + "\n";  
    data.forEach(o => outStr = outStr + `${o[header[0]]};${o[header[1]]};${o[header[2]]};${o[header[3]]}\n`)
    let pa = document.getElementById("csvArea")
    console.debug(`csv data: ${outStr}`)
    pa.value  = outStr
}
