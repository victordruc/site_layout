// Navbar Toogle
let toggleButton = document.querySelector(".navbar-toggler")
let navbarColapse = document.querySelector(".nav-collapse")

toggleButton.onclick = (e) => {
    e.stopPropagation()
    navbarColapse.classList.toggle("show")
}

navbarColapse.onclick = (e) => {
    e.stopPropagation()
}

document.body.addEventListener("click",()=>{
    navbarColapse.classList.remove("show")
})

// 

// render temporary main-ad-item ----------------------->

function temporaryRender() {
    let mainAd = document.querySelector(".main-ad-items")
    let element = document.querySelector(".main-ad-item")
    if(!mainAd || !element) return

    for(let i = 0; i<6;i++) {
        let cloneEl = element.cloneNode(true)

        mainAd.append(cloneEl)
    }
}

temporaryRender()

// render temporary main-ad-item -----------------------<

// render user-login ----------------------------------->

function userLoginNavigation() {
    const userLoginNavigationButton = document.getElementById("userLoginNavigation")
    const userNavigationMenu = document.querySelector(".navbar-user-login-body")
    if(!userLoginNavigationButton || !userNavigationMenu) return
    userLoginNavigationButton.addEventListener("click",e=>{
        e.stopPropagation()
        e.currentTarget.classList.toggle("open-navigation-login")
        userNavigationMenu.classList.toggle("open-navigation-login")
    })
    userNavigationMenu.addEventListener("click",e=>e.stopPropagation())
    document.body.addEventListener("click",()=>{
        userLoginNavigationButton.classList.remove("open-navigation-login")
        userNavigationMenu.classList.remove("open-navigation-login")
    })
}

userLoginNavigation()

// render user-login -----------------------------------<