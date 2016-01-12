'use strict';

var moment = require('moment');
var React = require('react');
var render = require('react-dom').render;
var Calendar = require('./main.js');

var rawData = {
  weeks: [
    {
      startDay: moment("2015-12-27"),
      endDay: moment("2016-01-02")
    }

  ],
};

render(
  <Calendar weekDaysHeader={true}
            rawData={rawData}/>,
  document.getElementById("react-calendar")
);
