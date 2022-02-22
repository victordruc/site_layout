// Add this object for render list of event
const sampleEvents = {
  monthly: [
    {
      id: 1,
      name: "Tur KIV - TLV",
      startdate: "2022-02-21",
      starttime: "12:00",
    },
    {
      id: 2,
      name: "Tur KIV - TLV",
      startdate: "2022-03-16",
      starttime: "01:00",
    },
    {
      id: 3,
      name: "Tur KIV - TLV",
      startdate: "2022-02-21",
      starttime: "12:00",
    },
    {
      id: 4,
      name: "Tur KIV - TLV",
      startdate: "2022-02-28",
      starttime: "12:00",
    },
  ],
};

function renderCalendar(root, sampleEvents) {
  $(root).monthly({
    mode: "event",
    dataType: "json",
    locale: "ro",
    weekStart: "Mon",
    dayNames: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"],
    monthNames: [
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
    ],
    events: sampleEvents,
  });

  //   change Month
  let buttonLocaleNext = document.querySelector(".button-change-month");
  let buttonLocalePrev = document.querySelector(".button-change-month-prev");
  let prevMonth = document.querySelector(".monthly-prev");
  let nextMonth = document.querySelector(".monthly-next");

  let { month, year } = formatData(
    nextMonth.dataset.year,
    nextMonth.dataset.month
  );
  buttonLocaleNext.firstElementChild.innerText = `${month} ${year}`;

  let { month: monthPrev, year: yearPrev } = formatData(
    prevMonth.dataset.year,
    prevMonth.dataset.month - 2
  );
  buttonLocalePrev.firstElementChild.innerText = `${monthPrev} ${yearPrev}`;

  function formatData(year, month) {
    let date = new Date(year, month);
    let formatterYear = new Intl.DateTimeFormat("ro", {
      year: "numeric",
    });
    let formatterMonth = new Intl.DateTimeFormat("ro", {
      month: "short",
    });
    let monthFormat = [...formatterMonth.format(date)]
      .map((item, index, arr) => {
        if (index == 0) {
          return item.toUpperCase();
        } else if (arr.length - 1 == index && item == ".") {
          return;
        }
        return item;
      })
      .filter((item) => item)
      .join("");

    return {
      month: monthFormat,
      year: formatterYear.format(date),
    };
  }

  buttonLocaleNext.onclick = (e) => {
    let clickEvent = new Event("click", { bubbles: true });
    nextMonth.dispatchEvent(clickEvent);
    let { month, year } = formatData(
      nextMonth.dataset.year,
      nextMonth.dataset.month
    );
    buttonLocaleNext.firstElementChild.innerText = `${month} ${year}`;
    let { month: monthPrev, year: yearPrev } = formatData(
      prevMonth.dataset.year,
      prevMonth.dataset.month - 2
    );
    buttonLocalePrev.firstElementChild.innerText = `${monthPrev} ${yearPrev}`;
  };

  buttonLocalePrev.onclick = (e) => {
    let clickEvent = new Event("click", { bubbles: true });
    prevMonth.dispatchEvent(clickEvent);
    let { month, year } = formatData(
      nextMonth.dataset.year,
      nextMonth.dataset.month
    );
    buttonLocaleNext.firstElementChild.innerText = `${month} ${year}`;
    let { month: monthPrev, year: yearPrev } = formatData(
      prevMonth.dataset.year,
      prevMonth.dataset.month - 2
    );
    buttonLocalePrev.firstElementChild.innerText = `${monthPrev} ${yearPrev}`;
  };

  monthChangeInNewElement(root);
  toggleEvents(root);
  inputChangeTypeCalendar();
}

function monthChangeInNewElement(root) {
  const containerMonth = document.querySelector(
    `${root} .monthly-header-title `
  );
  const text = containerMonth.querySelector(
    ".monthly-header-title-date"
  ).innerText;
  const calendarMonth = document.querySelector(`#calendarMonth`);

  calendarMonth.innerText = text;

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };
  const callback = function (mutationsList, observer) {
    const text = containerMonth.querySelector(
      ".monthly-header-title-date"
    ).innerText;
    calendarMonth.innerText = text;
    toggleEvents(root);
  };
  const observer = new MutationObserver(callback);
  observer.observe(containerMonth, config);
}

function toggleEvents(root) {
  const events = document.querySelectorAll(`${root} .monthly-event-indicator`);
  const wrapperBtn = document.querySelector(`.calendar-back-event`);
  const btn = wrapperBtn.querySelector(`.calendar-back-event-btn`);
  events.forEach((item) => {
    item.removeEventListener("click", toggleContainerShow);
    item.addEventListener("click", toggleContainerShow);
  });

  btn.removeEventListener("click", toggleContainerHide);
  btn.addEventListener("click", toggleContainerHide);
}

function toggleContainerShow(e) {
  const wrapperBtn = document.querySelector(`.calendar-back-event`);
  const eventList = document.querySelector(
    `#calendarContent .monthly-event-list`
  );
  const calendarBtn = document.querySelector(".calendar-btn");
  const id = e.currentTarget.dataset.eventid;
  const selectedElement = eventList.querySelector(`[data-eventid="${id}"]`);

  document
    .querySelector(".listed-event.selected-event")
    ?.classList.remove("selected-event");
  selectedElement.classList.add("selected-event");

  eventList.style.display = "block";
  wrapperBtn.style.display = "block";
  calendarBtn.style.display = "none";
}

function toggleContainerHide() {
  const wrapperBtn = document.querySelector(`.calendar-back-event`);
  const eventList = document.querySelector(
    `#calendarContent .monthly-event-list`
  );
  const calendarBtn = document.querySelector(".calendar-btn");
  eventList.style.display = "none";
  wrapperBtn.style.display = "none";
  if(calendarBtn.dataset.type=="day") {
    return
  }
  calendarBtn.style.display = "block";
}

function changeCalendarPerDay(root, backMonth, nextMonth) {
  const prevBtn = document.querySelector(".calendar-btn .button-change-month-prev")
  const nextBtn = document.querySelector(".calendar-btn .button-change-month")
  const container = document.querySelector("#calendarPerDay");
  const dateMonth = document.querySelector(`${root} .monthly-prev`).dataset.month;
  const dateYear = document.querySelector(`${root} .monthly-prev`).dataset.year;
  let date = document.querySelectorAll(".monthly-week .monthly-day");
  let dateToday =
    document.querySelector(
      ".m-d.monthly-day.monthly-today .monthly-day-number"
    )?.innerText || date[0]?.querySelector(".monthly-day-number")?.innerText;
  if(backMonth) {
    dateToday = date[date.length-1]?.querySelector(".monthly-day-number")?.innerText
  } else if(nextMonth) {
    dateToday = date[0]?.querySelector(".monthly-day-number")?.innerText
  }
  const dayArray = document.querySelector(".monthly-day-title-wrap").children;
  
  function render() {
    const day =
    new Date(dateYear + "-" + dateMonth + "-" + dateToday).getDay() -
    1;
  const actualDay = dayArray[day]?.innerText || dayArray[6].innerText;
  const innerEvent = Array.from(
    document.querySelector(`.monthly-list-item.item-has-event[data-number="${dateToday}"]`)?.querySelectorAll("a") || []
  );

  const htmlEvent = innerEvent
    .map(
      (elem) =>
        `
    <div class="monthly-event-indicator" data-eventid="${elem.dataset.eventid}">
      ${elem.innerHTML}
    </div>
    `
    )
    .join("");

  container.innerHTML = `
                <div class="calendar-date-header">
                  <div class="calendar-date-header-day">
                      <button id="prevDay">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill="#ff6f32" fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                        </svg>
                      </button>
                      <span>${actualDay}</span>
                  </div>
                  <div class="calendar-date-wrapper">
                      <span class="calendar-date">${dateToday}</span>
                      <button id="nextDay">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill="#ff6f32" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                        </svg>
                      </button>
                  </div>
                </div>
                <div class="calendar-date-body">
                  <div class="monthly-indicator-wrap">
                   ${htmlEvent}
                  </div>
                </div>
  `;

  const events = container.querySelectorAll(".monthly-event-indicator")

  events.forEach(item=>{
    item.removeEventListener("click", toggleContainerShow)
    item.addEventListener("click", toggleContainerShow)
  })

  const prevDay = document.getElementById("prevDay");
  const nextDay = document.getElementById("nextDay");
  prevDay.addEventListener(
    "click",
    () => {
      if(dateToday-1<=0) {
        const ev = new Event("click")
        prevBtn.dispatchEvent(ev)
        changeCalendarPerDay("#calendarContent", true);
        return
      }
      dateToday = date[dateToday-2].querySelector(".monthly-day-number").innerText
      render()
    },
    {
      once: true,
    }
  );

  nextDay.addEventListener(
    "click",
    () => {
      if(date.length<=dateToday) {
        const ev = new Event("click")
        nextBtn.dispatchEvent(ev)
        changeCalendarPerDay("#calendarContent", false, true);
        return
      }
      dateToday = date[dateToday].querySelector(".monthly-day-number").innerText
      render()
    },
    {
      once: true,
    }
  );

  }
  render()
}

function inputChangeTypeCalendar() {
  const calendarActionsInput = document.querySelector(
    ".calendar-actions-input"
  );
  const calendarPerDay = document.querySelector("#calendarPerDay")
  const btn = document.querySelector(".calendar-wrapper-change-month .calendar-btn")
  calendarActionsInput.addEventListener("change", ({ target }) => {
    switch (target.value) {
      case "month":
        "";
        calendarPerDay.style.display="none";
        btn.dataset.type = "month"
        btn.style.display="block";
        break;
      case "day":
        changeCalendarPerDay("#calendarContent");
        calendarPerDay.style.display="block";
        btn.dataset.type = "day"
        btn.style.display="none";
        break;
    }
  });
}

renderCalendar("#calendarContent", sampleEvents);