"use strict";

const React = require("react");

var AddASongElement = React.createClass({

    propTypes: {
      socket: React.PropTypes.object.isRequired
    },

    componentWillMount: function() {
      console.log("component will load");
    },

    getInitialState: function() {
      return {};
    },

    render: function() {
      return (
        <div>HELLO INVENTORY</div>
      );
    }
});


module.exports = AddASongElement;