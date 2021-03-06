'use strict';

var _ = require('underscore');
var React = require('react');
var DaysRow = require('./DaysRow.react.js');
var EventRow = require('./EventRow.react.js');
var Expand = require('./Expand.react.js');

module.exports = React.createClass({
  getInitialState: function(){
    return {expand: false};
  },

  expandCallback: function(){
    this.setState({expand: !this.state.expand});
  },

  expandLabel: function(){
    if(this.state.expand){
      return this.props.data.collapseLabel || "Collapse expanded events";
    }
    return this.props.data.expandLabel || "Expand week's hidden events";
  },

  render: function render() {
    var component = this;
    var data = this.props.data;

    var eventRows = this.state.expand ?
                          data.eventRows : _.first(data.eventRows, data.numberOfRowsToShow);
    var eventRowsToShow = _.map(eventRows, function eventRowsToComponent(eventRow, key) {
              return <EventRow key={key} data={component.props.data} eventRow={eventRow} calendar={component.props.calendar} />
            });

    var expand;

    if(this.props.data.shouldExpand){
      expand = <Expand shouldExpand={this.props.data.shouldExpand}
                       expandLabel={this.expandLabel()}
                       expandCallback={this.expandCallback}/>
    }
    return (
      <div className="week">
        <table className="table eventsWrapper">
          <tbody>
            <DaysRow calendar={this.props.calendar} data={this.props.data}/>
            {eventRowsToShow}
            {expand}
          </tbody>
        </table>
      </div>
    );
  }
});
