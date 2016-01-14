'use strict';

var moment = require('moment');
var React = require('react');
var render = require('react-dom').render;
var Calendar = require('./main.js');

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
        {"2" : {size: 1, label: "+1", type: "summay", events: [{label: "Rui Alves", type: "vacations", status: "pendent", detail: "(13/01/2015 a 18/01/2015)"},
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

render(
  <Calendar weekDaysHeader={true}
            monthNavigationHeader={true}
            month={0}
            year={2016}
            rawData={rawData}/>,
  document.getElementById("react-calendar")
);
