"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const AddASongElement = require("./addASong.jsx");

var ApplicationIndex = React.createClass({
	socket: window.io(),
    render: function() {
      return (
        <div>
         <AddASongElement socket={this.socket} />
        </div>
      );
    }
});

ReactDOM.render(
  <ApplicationIndex />,
  document.getElementById("main")
);