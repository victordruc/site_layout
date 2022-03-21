$(document).ready(function () {
  $("select").niceSelect();
  $("select").click(function (event) {
    event.stopPropagation();
  });
  $(".list").click(function (e) {
    if ($(e.target).is(".option.disabled")) return;
    $(this).parent().attr("data-enable", "true");
  });
  countryChange();
});

function countryChange() {
  let selectCountry = document.querySelector(".country-select")
  let niceSelectCountry = document.querySelector(".nice-select.country-select")
  if(!selectCountry || !niceSelectCountry) return
  let option = niceSelectCountry.querySelectorAll(".option")
  Array.from(selectCountry.children).forEach((el,index)=>{
      let img = el.dataset.country
      if(!img) return

      let imgElement = document.createElement("img")
      imgElement.src = img
      imgElement.style.marginRight = "8px"
      option[index].prepend(imgElement)
      if(el.selected) {
          niceSelectCountry.querySelector(".current").prepend(imgElement.cloneNode())
      }
  })
  $(selectCountry).change(function(){
      let img = this.selectedOptions[0].dataset.country
      if(!img) return
      let imgElement = document.createElement("img")
      imgElement.src = img
      imgElement.style.marginRight = "8px"
      niceSelectCountry.querySelector(".current").prepend(imgElement)
  })
}