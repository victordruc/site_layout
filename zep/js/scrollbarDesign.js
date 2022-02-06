function scrollStyle(option) {
    let element = option?.element
    if(!element) return
    let backgroundThumb = option?.backgroundThumb || "#ebeaea"
    let backgroundScroll = option?.backgroundScroll || "#d7d3d3"
    let thumbRight = option?.thumbRight || 0
    let thumbWidth = option?.thumbWidth || 2
    setTimeout(()=>{
        let scrollBarContainer = document.querySelectorAll(element)
        scrollBarContainer.forEach(item=> {
            if(item.offsetHeight==item.scrollHeight) return
            let heightScroll = item.offsetHeight*0.12
            let divThumb = document.createElement("div")
            divThumb.classList.add("div-thumb")
            divThumb.style.position = "absolute"
            divThumb.style.top = 0
            divThumb.style.height = 100 + "%"
            divThumb.style.width = thumbWidth + "px"
            divThumb.style.right = thumbRight + "px"
            divThumb.style.backgroundColor = backgroundThumb

            let divScroll = document.createElement("div")
            divScroll.classList.add("div-scroll")
            divScroll.style.position = "absolute"
            divScroll.style.top = 0
            divScroll.style.height = heightScroll + "px"
            divScroll.style.width = 100 + "%"
            divScroll.style.backgroundColor = backgroundScroll
            
            divThumb.append(divScroll)
            item.append(divThumb)

            item.addEventListener("scroll",e=>{
                let scrollTop = e.target.scrollTop
                let scrollTotal = e.target.offsetHeight-heightScroll
                let scrollHeight = e.target.scrollHeight - e.target.offsetHeight 

                divThumb.style.top = scrollTop + "px"
                divScroll.style.top = scrollTop*scrollTotal/scrollHeight + "px"
                
            })
        })
    },0)
}


document.addEventListener("DOMContentLoaded",()=>{
    let option = {
        element: ".filter-list-detail",
        backgroundThumb: "#EEEEEE",
        backgroundScroll: "#00488E",
        thumbRight: 16,
        thumbWidth: 3,
    }
    scrollStyle(option)
})