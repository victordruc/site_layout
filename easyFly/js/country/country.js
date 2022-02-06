function countryAlphabet(alphabet=[]) {
    const containerAlphabet = document.querySelector(".main-country-header-select")
    alphabet.forEach(item=>{
        const spanElement = document.createElement("a")
        spanElement.className="country-alphabet"
        spanElement.innerText = item
        containerAlphabet.append(spanElement)
    })
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
countryAlphabet(alphabet)

function countryListRender(country=[]) {
    const contryList1 = document.getElementById("mainCountry1")
    const contryList2 = document.getElementById("mainCountry2")
    const contryList3 = document.getElementById("mainCountry3")
    const contryList4 = document.getElementById("mainCountry4")
    const qtyCountry = country.length
}

const country = ["Afghanistan", "Africa De Sud"]
countryListRender(country)