const toggleMenu = document.querySelectorAll(".find-cargo-wrapper")

toggleMenu.forEach(item=>{
    item.addEventListener("click",()=>{
        document.querySelector(".find-cargo-select").classList.remove("find-cargo-select")
        item.classList.toggle("find-cargo-select")
    })
})