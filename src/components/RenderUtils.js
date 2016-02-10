'use strict';

module.exports = {
  isWeekend: function isWeekend(day) {
    var isoWeekday = day.isoWeekday();
    var weekend = isoWeekday === 6 || isoWeekday === 7;
    return weekend;
  },

  getDayClassName: function getDayClassName(day, calendar) {
    if(calendar && calendar.props.dayInfo) {
      var info = calendar.props.dayInfo(day);
      if(info) {
        return info.classes;
      }
    }

    var className = null;
    if(this.isWeekend(day)) {
      className = "weekend";
    }
    return className;
  }
};
