"use strict";

const React = require("react");

var AddASongElement = React.createClass({

    propTypes: {
      socket: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {youtubeUrl: '', playOnce: false};
    },

    addNewSong: function() {
      this.props.socket.emit('addSong', {
        url: this.state.youtubeUrl,
        playonce: this.state.playOnce
      });
      this.setState(getInitialState());
    },

    playOnceChanged: function(e) {
      this.setState({playOnce: !this.state.playOnce});
    },

    youtubeUrlChanged: function(e) {
      this.setState({youtubeUrl: e.target.value});
    },

    render: function() {
      return (
        <form action="#">
          Youtube url: 
          <input id="url" value={this.state.youtubeUrl} onChange={this.youtubeUrlChanged} /> 
          <br />
          Play only once ? 
          <input id="playonce" type="checkbox" checked={this.state.playOnce} onClick={this.playOnceChanged} />
          <br />
          <button onClick={this.addNewSong}>Send</button>
        </form>
      );
    }
});


module.exports = AddASongElement;