import React, { Component } from "react";
import "./App.css";
import { ReactMic } from "react-mic";

class Recorder extends Component {
  //Sample URL
  //https://p.scdn.co/mp3-preview/d7624ec5f93b6d92c1836a95c40ecce463584f6e?cid=774b29d4f13844c495f206cafdad9c86
  sendReq = () => {
    fetch("http://localhost:8888/login");
    // let formData = new FormData();
    // formData.append('file', this.state.file.blobURL);
    // // const file = URL.createObjectURL(this.state.file.blob);
    // fetch(`https://api.audd.io/?return=timecode%2Citunes%2Cdeezer%2Clyrics&itunes_country=us`, {
    //     method: 'POST',
    //     'Access-Control-Allow-Origin' : '*',
    //     mode: 'cors', // no-cors, cors, *same-origin
    //     headers:{
    //         'Accept': 'Application/json, */*',
    //         'Content-Type': ' application/x-www-form-urlencoded'
    //     },
    //     body: formData,
    // })
    // .then(data => data.json())
    // .then(result => console.log(result))
    // .catch(err => console.log(err))
  };

  state = {
    record: false,
    file: {}
  };
  startRecording = () => {
    this.setState({ record: true });
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onData = recordedBlob => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  };

  onStop = recordedBlob => {
    this.setState({ file: recordedBlob });
    this.sendReq();
  };
  render() {
    return (
      <div className="bg-dark">
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <button onClick={this.stopRecording} type="button">
          Stop
        </button>
        <button onClick={this.sendReq}>Here</button>

        <audio controls src={this.state.file.blobURL}></audio>
      </div>
    );
  }
}

export default Recorder;
