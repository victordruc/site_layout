function toggleFilterSearch() {
    const btn = document.getElementById("filterToggle")
    const filter = document.getElementById("filterSearch")

    if(!btn || !filter) return

    btn.addEventListener("click",e=>{
        e.stopPropagation()
        filter.classList.toggle("open-filter")
    })

    filter.addEventListener("click", e=>e.stopPropagation())
    document.body.addEventListener("click", ()=>{
        filter.classList.remove("open-filter")
    })
}

toggleFilterSearch()

function toggleSearch() {
    const btn = document.getElementById("navSearch")
    const searchNavbar = document.getElementById("searchNavbar")

    if(!btn || !searchNavbar) return

    btn.addEventListener("click",e=>{
        e.stopPropagation()
        searchNavbar.classList.toggle("open-find")
    })

    searchNavbar.addEventListener("click", e=>e.stopPropagation())
    document.body.addEventListener("click", ()=>{
        searchNavbar.classList.remove("open-find")
    })
}

toggleSearch()


function simList(qty=1) {
    const container = document.querySelector(".table-list tbody")
    if(!container) return

    const content = container.innerHTML

    for(let i = 0; i<qty; i++) {
        container.innerHTML += content
    }
}

simList(4)

function openManagerCard() {
    const target = document.querySelector(".manager-card")
    const btn = document.querySelector("#toggleManagerCard")
    if(!target || !btn) return

    btn.addEventListener("click",e=>{
        e.stopPropagation()
        target.classList.toggle("open-mobile")
    })

    target.addEventListener("click", e=>e.stopPropagation())
    document.body.addEventListener("click", ()=>{
        target.classList.remove("open-mobile")
    })
}

openManagerCard()

