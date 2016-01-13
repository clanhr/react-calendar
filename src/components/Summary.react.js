'use strict';

var _ = require('underscore');
var React = require('react');

module.exports = React.createClass({
  render: function render() {
    // TODO use data
    var content = "<div class='eventSpan'><div class='content'><p><span class='status approved'></span><strong>Rui Alves</strong> - Type of event <span class='dateRange'>(13/01/2015 a 18/01/2015)</span></p></div></div>";
    return (
      <button type="button" className="popoverButton" data-trigger="hover" data-toggle="popover" data-content={content}>{this.props.data.label}</button>
    );
  }
});
