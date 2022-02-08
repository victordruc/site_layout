function showJobsDetail() {
    const btnShow = document.querySelectorAll(".btn-show-jobs-vacancies")
    const btnHide = document.querySelectorAll(".btn-hide-jobs-vacancies")

    btnShow.forEach(item=>{
        item.addEventListener("click",e=>{
            const container = e.currentTarget.closest(".jobs-vacancies-item")
            const containerScroll = container.querySelector(".jobs-vacancies-animation")
            $(containerScroll).animate(
                {
                height: containerScroll.scrollHeight
                }, 2000, 
                function() {
                    container.classList.remove("jobs-vacancies-item-hide")
                    containerScroll.style.height = ""
              });
        })
    })

    btnHide.forEach(item=>{
        item.addEventListener("click",e=>{
            const container = e.currentTarget.closest(".jobs-vacancies-item")
            const containerScroll = container.querySelector(".jobs-vacancies-animation")
            $(containerScroll).animate(
                {
                height: "360"
                }, 2000, 
                function() {
                    container.classList.add("jobs-vacancies-item-hide")
                    containerScroll.style.height = ""
              });
        })
    })
}

showJobsDetail()

function searchNavbar() {
    const btnSearch = document.querySelector(".header-main .search-btn")
    const searchInput = document.querySelector(".header-main .search-input")

    if(!btnSearch || !searchInput) return

    btnSearch.addEventListener("click",e=>{
        if(!searchInput.classList.contains("showSearch")) {
            searchInput.classList.remove("hideSearch")
            searchInput.classList.add("showSearch")
        } else {
            searchInput.classList.remove("showSearch")
            searchInput.classList.add("hideSearch")
            searchInput.addEventListener("animationend",()=>{
                searchInput.classList.remove("hideSearch")
            }, {
                once:true
            })
        }
    })
}

searchNavbar()

function navbarLang() {
    const navbarLang = document.querySelector("#navbarLang")
    const langSelection = navbarLang.querySelector(".navbar-lang-selection")
    if(!navbarLang || !langSelection) return
    navbarLang.addEventListener("pointerenter",()=>{
        langSelection.classList.add("show-navbar-lang")
    })
    navbarLang.addEventListener("pointerleave",()=>{
        langSelection.classList.remove("show-navbar-lang")
    })
    navbarLang.addEventListener("click",()=>{
        langSelection.classList.toggle("show-navbar-lang")
    })
}

navbarLang()


AOS.init();