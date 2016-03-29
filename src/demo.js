'use strict';

var moment = require('moment');
var React = require('react');
var render = require('react-dom').render;
var Calendar = require('./main.js').Calendar;

var data = [{eventId: 1,
             viewer: true,
             startDate: "2016-01-19",
             endDate: "2016-01-21",
             label: "summary test bubu",
             type: "vacations",
             status: "approved"},
            {eventId: 2,
             startDate: "2016-01-27",
             endDate: "2016-01-31",
             label: "summary bubu",
             type: "vacations",
             status: "pendent"},
            {eventId: 3,
             startDate: "2016-01-20",
             endDate: "2016-01-20",
             label: "summary example",
             type: "vacations",
             status: "pendent"},
            {eventId: 7,
             startDate: "2016-01-27",
             endDate: "2016-01-28",
             label: "summary example",
             type: "vacations",
             status: "pendent"},
            {eventId: 6,
             startDate: "2016-01-27",
             endDate: "2016-01-28",
             label: "summary example",
             type: "vacations",
             status: "pendent"},
            {eventId: 4,
             startDate: "2016-01-28",
             endDate: "2016-01-29",
             label: "summary example",
             type: "vacations",
             status: "pendent"},
            {eventId: 5,
             startDate: "2016-01-01",
             endDate: "2016-01-01",
             label: "New Year",
             type: "specialDay",
             category: "calendar"}];

var rawData = {
  weeks: [
    {
      days: [moment("2015-12-28"),
             moment("2015-12-29"),
             moment("2015-12-30"),
             moment("2015-12-31"),
             moment("2016-01-01"),
             moment("2016-01-02"),
             moment("2016-01-03")],

      eventRows: [
        {"1" : {eventId: "1", size: 3, label: "Pedro Santos", type: "vacations", status: "enjoyed"},
         "4" : {eventId: "2", size: 3, label: "Bruna Nezello", type: "family", status: "enjoyed"}},
        {},
        {},
        {}
      ]
    },
    {
      days: [moment("2016-01-04"),
             moment("2016-01-05"),
             moment("2016-01-06"),
             moment("2016-01-07"),
             moment("2016-01-08"),
             moment("2016-01-09"),
             moment("2016-01-10")],

      eventRows: [
        {"0" : {eventId: "2", size: 2, label: "Bruna Nezello", type: "family", status: "enjoyed"}},
        {},
        {},
        {}
      ]
    },
    {
      days: [moment("2016-01-11"),
             moment("2016-01-12"),
             moment("2016-01-13"),
             moment("2016-01-14"),
             moment("2016-01-15"),
             moment("2016-01-16"),
             moment("2016-01-17")],

      eventRows: [
        {"0" : {size: 1, label: "Pedro Nogueira", type: "specialDay", category: "birthday"},
         "1" : {size: 1, label: "Feriado", type: "specialDay", category: "holiday"},
         "2" : {size: 1, label: "Liliana Veríssimo", type: "vacations", status: "enjoyed"}},
        {"0" : {size: 5, label: "Marcos Lamúria", type: "vacations", status: "enjoyed"}},
        {"1" : {size: 4, viewer: true, label: "Eu", type: "vacations", status: "pendent"}},
        {"2" : {size: 1, label: "+1", type: "summary", events: [{label: "Rui Alves", type: "vacations", status: "pendent", detail: "(13/01/2015 a 18/01/2015)"},
                                                               {label: "Pedro Aníbal", type: "vacations", status: "enjoyed", detail: "(13/01/2015 a 18/01/2015)"}]}}
      ]
    },
    {
      days: [moment("2016-01-18"),
             moment("2016-01-19"),
             moment("2016-01-20"),
             moment("2016-01-21"),
             moment("2016-01-22"),
             moment("2016-01-23"),
             moment("2016-01-24")],

      eventRows: [
        {},
        {},
        {},
        {},
      ]
    },
    {
      days: [moment("2016-01-25"),
             moment("2016-01-26"),
             moment("2016-01-27"),
             moment("2016-01-28"),
             moment("2016-01-29"),
             moment("2016-01-30"),
             moment("2016-01-31")],

      eventRows: [
        {},
        {},
        {},
        {},
      ]
    }

  ],
};

var config = {expandLabel: "Expand",
              collapseLabel: "Collapse",
              numberOfRowsToShow: 4};

function eventClicked(browserEvent, entry) {
  alert(JSON.stringify(entry));
}

function dayInfo(day) {
  if(day.isoWeekday() == 6 || day.isoWeekday() == 7) {
    return {classes:"dayOff"};
  }
}

var DetailComponent = React.createClass({

  render: function render(){
    var event = this.props.event;
    return (
      <div>
        {event.eventId}
        {event.label}
        {event.status}
        {event.type}
        {event.startDate}
        {event.endDate}
      </div>
    );
  }
});

render(
  <Calendar weekDaysHeader={true}
            monthNavigationHeader={true}
            onEventClick={DetailComponent}
            month={0}
            year={2016}
            dayInfo={dayInfo}
            data={data}
            config={config}/>,
  document.getElementById("react-calendar")
);
