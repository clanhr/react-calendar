'use strict';

var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
  render: function render() {
    var shouldExpand = this.props.shouldExpand;
    var expandLabel = this.props.expandLabel;

    if(!shouldExpand){
      return <tr/>;
    }

    return (
      <tr className="expandEvents">
        <td colSpan="7">
          <a onClick={this.props.expandCallback}>{expandLabel}</a>
        </td>
      </tr>
    );
  }
});
