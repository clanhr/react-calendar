'use strict';

var _ = require('underscore');
var React = require('react');

module.exports = React.createClass({
  render: function render() {
    var className = "status " + this.props.data.status;
    var label = this.props.data.label;
    var type = " - " + this.props.data.type;

    var content = null;
    if(this.props.data.viewer) {
      content = <p className={className}><strong>{label}</strong> {type}</p>;
    } else {
      content = <p><span className={className}></span><strong>{label}</strong> {type}</p>;
    }
    return (
      <div className="eventSpan">
        <div className="content">
          {content}
        </div>
      </div>
    );
  }
});
