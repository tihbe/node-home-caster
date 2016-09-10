"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const AddASongElement = require("./addASong.jsx");
const Store = require("./store.jsx");

var ApplicationIndex = React.createClass({
	socket: window.io(),

  componentWillMount: function() {
    socket.on('storeInventory', function(inventory) {
      console.log(inventory);
    });
  },

    render: function() {
      return (
        <div>
         <AddASongElement socket={this.socket} />
         <Store socket={this.socket} />
        </div>
      );
    }
});

ReactDOM.render(
  <ApplicationIndex />,
  document.getElementById("main")
);