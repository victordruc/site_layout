function openCloseQuestion() {
    const buttonExpand = document.querySelectorAll(".question-expand-button")
    const textExpand = document.querySelectorAll(".question-secondary-text")

    textExpand.forEach(item=>{
            let styleLine = parseInt(window.getComputedStyle(item).lineHeight)
            if(item.offsetHeight > styleLine) {
                item.style.whiteSpace = "nowrap"
            } else {
                item.closest(".question-secondary").querySelector(".question-secondary-expand").style.display = "none"
            }
            item.style.visibility = "inherit"
    })

    buttonExpand.forEach(button=>{
        const textExpand = button.closest(".question-secondary").querySelector(".question-secondary-text")
        const titleExpand = button.closest(".question-wrapper").querySelector(".question-primary")
        button.onclick = () => {
            titleExpand.classList.toggle("show-text")
            textExpand.classList.toggle("show-text")
            if(!textExpand.classList.contains("show-text")) {
                textExpand.classList.add("hide-text")
                textExpand.addEventListener("animationend",()=>{
                    textExpand.classList.remove("hide-text")
                },{once:true})
            } else {
                textExpand.classList.remove("hide-text")
            }
        }
    })
    

}

document.addEventListener("DOMContentLoaded",openCloseQuestion)