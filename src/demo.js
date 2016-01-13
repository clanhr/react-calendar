'use strict';

var moment = require('moment');
var React = require('react');
var render = require('react-dom').render;
var Calendar = require('./main.js');

var rawData = {
  weeks: [
    {
      days: [moment("2015-12-27"),
             moment("2015-12-28"),
             moment("2015-12-29"),
             moment("2015-12-30"),
             moment("2015-12-31"),
             moment("2016-01-01"),
             moment("2016-01-02")]
    }

  ],
};

render(
  <Calendar weekDaysHeader={true}
            rawData={rawData}/>,
  document.getElementById("react-calendar")
);
