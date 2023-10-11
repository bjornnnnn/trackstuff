function plotsq(trackobj, statelut){
    const s = document.createElement("span")
    s.setAttribute("class", "ticket" + " " + statelut[trackobj.status])

    s.setAttribute("id", trackobj.id)
    const h = document.createElement("h3")
    h.innerHTML = trackobj.id
    s.appendChild(h)
    const p = document.createElement("p")
    p.innerHTML= trackobj.title
    s.appendChild(p)
    return(s)
}

const data = [
    {"id" : "ticket:001", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:002", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:003", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:004", "title" : "some title", "status":"IN-TEST"},
    {"id" : "ticket:005", "title" : "some title", "status":"IN-TEST"},
    {"id" : "ticket:006", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:007", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:008", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:009", "title" : "some title", "status":"IN-DEV"},
    {"id" : "ticket:010", "title" : "some title", "status":"NEW"}
]

function displayTickets(){
    const statelut = {
        "IN-DEV" : "state-orange",
        "IN-TEST" : "state-blue",
        "NEW" : "state-gray"
    }
    const e = document.getElementById("squares")
    for (i in data){
        e.appendChild(plotsq(data[i], statelut ))
    }
}
