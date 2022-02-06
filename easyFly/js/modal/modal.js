function showModal(modal) {
    const closeModalOrder = document.getElementById("closeModalOrder")
    const modalOrderFind = document.querySelector(modal)

    if(!modalOrderFind) return

    modalOrderFind.style.display = "flex"
    modalOrderFind.classList.add("show")

    closeModalOrder.addEventListener("click",e => {
        modalOrderFind.style.display = "none"
        modalOrderFind.classList.remove("show")

    },{once:true})

    modalOrderFind.addEventListener("click",e => {
        modalOrderFind.classList.remove("show")
        modalOrderFind.style.display = "none"
    },{once:true})

    modalOrderFind.firstElementChild.onclick = e => e.stopPropagation()
}

const buttonOrder = document.querySelectorAll(".button-price > .button")
buttonOrder.forEach(element => {
    element.onclick = () => showModal("#modalOrderFind")
});