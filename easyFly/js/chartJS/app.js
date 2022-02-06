

// Option Constant -------------------------------------------------->

const backGroundColor = getComputedStyle(document.documentElement).getPropertyValue("--background-primary"); // background color for chart from the css variables --background-primary, on the file css/chart_style.css or scss/_chart.scss

function actionSearch(arrDaySelected) { // callback function, it runs after click on the search button, in arguments we have array with days selected
    console.log(arrDaySelected)
}

const arrDay = ["Du","Lu","Ma","Mi","Jo","Vi","Sa"] // array of day

const arrMonth = ["IAN", "FEB", "MART", "APR", "MAI", "IUN", "IUL", "AUG", "SEPT", "OCT", "NOV", "DEC"] // array of month

const currencyParameters = [
  {
    currency:"EUR",
    value:"€"
  },
  {
    currency:"USD",
    value:"$"
  },
  {
    currency:"GBP",
    value:"£"
  },
  {
    currency:"RUB",
    value:"₽"
  }
] // array of currency

const departureText = "Plecarea pe" // text for departure section

const travelText = {
  principal: "Călătorie de",
  day: "zi",
  days: "zile"
} // text for travel section

const searchText = "Căutare" // text for search button

const graphZoomText = "Zoom in" // text for zoom section

// <----------------------------------------------------------------- Option Constant

const option = {
  backGroundColor,
  container: "container",
  backButton: "backButton",
  url: "/js/chartJS/data.json",
  actionSearch,
  arrDay,
  arrMonth,
  currencyParameters,
  departureText,
  travelText,
  searchText,
  graphZoomText
};

chartSVG(option);