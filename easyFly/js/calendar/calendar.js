function renderBarChart() {
  let container = document.querySelector(".tabel-offers-chart-bar-month");
  let month = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];
  let monthIndex = new Date().getMonth();
  let selected = "selected";
  for (let i = 0; i < 12; i++) {
    let width = Math.floor(Math.random() * 100);
    container.innerHTML += `
            <div class="tabel-offers-chart-line">
                <div class="tabel-offers-chart-action ${
                  selected ? selected : ""
                }" style="width:${width < 36 ? 36 : width}%">
                    <div class="tabel-offers-chart-date">${
                      month[monthIndex]
                    } <span>2022</span></div>
                    <div class="tabel-offers-chart-price">42 €</div>
                </div>
            </div>
        `;
    monthIndex++;
    selected = null;
    if (monthIndex > 11) {
      monthIndex = 0;
    }
  }

  document.querySelectorAll(".tabel-offers-chart-action").forEach((el) => {
    el.onclick = () => {
      document
        .querySelector(".tabel-offers-chart-action.selected")
        ?.classList.remove("selected");
      el.classList.add("selected");
    };
  });
}

renderBarChart();

async function renderCalendar() {
  let resp = await fetch("js/chartJS/data.json");
  let fetchData = await resp.json();
  let monthArr = [];
  for (let key in fetchData.calendar) {
    monthArr.push({
      id: key,
      name: Math.round(fetchData.calendar[key].avgPrice) + " " + "€",
      startdate: key,
    });
  }

  // let sampleEvents = {
  //     "monthly": [
  //         {
  //         "id": 1,
  //         "name": "Whole month event",
  //         "startdate": "2022-01-16",
  //         // "enddate": "2022-02-28",
  //         // "starttime": "12:00",
  //         // "endtime": "2:00",
  //         // "color": "#99CCCC",
  //         // "url": ""
  //         },
  //     ]
  //     };
  let sampleEvents = {
    monthly: monthArr,
  };

  $("#offersCalendarDate").monthly({
    // mode: 'event',
    // mode: 'picker',
    dataType: "json",
    locale: "ro",
    weekStart: "Mon",
    dayNames: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"],
    monthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    events: sampleEvents,
  });

  //   change Month
  let buttonLocaleNext = document.querySelector(".button-change-month")
  let buttonLocalePrev = document.querySelector(".button-change-month-prev")
  let prevMonth = document.querySelector(".monthly-prev")
  let nextMonth = document.querySelector(".monthly-next")

  let {month, year} = formatData(nextMonth.dataset.year,nextMonth.dataset.month)
    buttonLocaleNext.firstElementChild.innerText = `${month} ${year}`

  let {month:monthPrev, year:yearPrev} = formatData(prevMonth.dataset.year,prevMonth.dataset.month-2)
  buttonLocalePrev.firstElementChild.innerText = `${monthPrev} ${yearPrev}`

  function formatData(year,month) {
    let date = new Date(year,month)
    let formatterYear = new Intl.DateTimeFormat("ro", {
        year: "numeric",
      });
    let formatterMonth = new Intl.DateTimeFormat("ro", {
        month: "short",
      });
    let monthFormat = [...formatterMonth.format(date)].map((item,index,arr)=>{
        if(index == 0) {
            return item.toUpperCase()
        } else if (arr.length-1 == index && item == ".") {
            return 
        }
        return item
    }).filter(item=>item).join("")

    return {
        month: monthFormat,
        year: formatterYear.format(date)
    }
  }
  
  buttonLocaleNext.onclick = e => {
    let clickEvent = new Event("click",{bubbles: true})
    nextMonth.dispatchEvent(clickEvent)
    let {month, year} = formatData(nextMonth.dataset.year,nextMonth.dataset.month)
    buttonLocaleNext.firstElementChild.innerText = `${month} ${year}`
    let {month:monthPrev, year:yearPrev} = formatData(prevMonth.dataset.year,prevMonth.dataset.month-2)
    buttonLocalePrev.firstElementChild.innerText = `${monthPrev} ${yearPrev}`
  }

  buttonLocalePrev.onclick = e => {
    let clickEvent = new Event("click",{bubbles: true})
    prevMonth.dispatchEvent(clickEvent)
    let {month, year} = formatData(nextMonth.dataset.year,nextMonth.dataset.month)
    buttonLocaleNext.firstElementChild.innerText = `${month} ${year}`
    let {month:monthPrev, year:yearPrev} = formatData(prevMonth.dataset.year,prevMonth.dataset.month-2)
    buttonLocalePrev.firstElementChild.innerText = `${monthPrev} ${yearPrev}`
  }
}

renderCalendar();
