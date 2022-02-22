class Modal {
    constructor(modal) {
        this.modal = modal
        this.context = null
        this.btn = null
    }

    openModal() {
        const list = document.querySelectorAll("#tableTickets tbody tr");
        const modalContent = document.getElementById(this.modal)
        if(!modalContent) return

        const myModal = new bootstrap.Modal(modalContent)
        this.hideItem()
        list.forEach(item=>{
            item.addEventListener("click",e=>{
                this.hideItem()
                myModal.show()
            })
        })
    }

    changeContextModal() {
        const actionBtn = document.querySelectorAll(".change-context-modal")
        actionBtn.forEach(item=>{
            item.addEventListener("click",()=>{
                const context = item.dataset.id
                if(!context) return
                const newContext = document.querySelector(context)
                if(!newContext) return
                this.context.style.display="none"
                this.btn.classList.remove("active-context")
                newContext.style.display = "block"
                item.parentElement.classList.add("active-context")
                this.context = newContext
                this.btn = item.parentElement
            })
    
        })
    }

    hideItem() {
        const element = document.querySelectorAll(`#${this.modal} .modal-body`)
        const btns = document.querySelectorAll(`#${this.modal} .modal-navigation .modal-item`)
        element.forEach((item, index)=>{
            if(index===0) {
                item.style.display = "block"
                this.context = item
            } else {
                item.style.display = "none"
            }
        })

        btns.forEach((item,index)=>{
            if(index===0) {
                item.classList.add("active-context")
                this.btn = item
            } else {
                item.classList.remove("active-context")
            }
        })
    }

    run() {
        this.openModal()
        this.changeContextModal()
    }
}

// function openModal() {
//     const list = document.querySelectorAll("#tableTickets tbody tr");
//     const modalContent = document.getElementById('modal')
//     if(!modalContent) return
//     const myModal = new bootstrap.Modal(modalContent)
//     list.forEach(item=>{
//         item.addEventListener("click",e=>{
//             console.log("dd")
//             myModal.show()
//         })
//     })
// }

// openModal()

// function changeContextModal() {
//     const actionBtn = document.querySelectorAll(".change-context-modal")
//     actionBtn.forEach((item, index)=>{
//         item.addEventListener("click",()=>{
//             const context = item.dataset.id
//             if(!context) return
//             console.log(context)
//         })

//     })
// }

// changeContextModal()
new Modal("modal").run()