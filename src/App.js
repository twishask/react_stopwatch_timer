import React, { Component } from 'react';
import './App.css';
import Sound from 'react-sound';
import timerSound from './doubleBeep.mp3'

class App extends Component {
    constructor(){
      super();
      
      this.state = {
        ssec: 0,
        smin: 0,
        shr: 0,
        stime: 0,
        isDisabled: false,
        timerInput: 0,
        tsec: 0,
        tmin:0,
        thr:0,
        sound:"STOPPED"
      };
    };
    
    startStopwatch = e => {
      this.setState ({
        isDisabled : true
      });
      this.stopwatchInterval = setInterval(
        function(){
          var shr = Math.floor(this.state.stime / 3600)
          var smin = Math.floor((this.state.stime - 3600*shr) / 60)
          var ssec = this.state.stime % 60
          this.setState({
            stime: this.state.stime+1,
            shr: shr,
            smin: smin,
            ssec: ssec,
          })
        }.bind(this),
      1000);
    }
    
    stopStopwatch = e => {
        clearInterval(this.stopwatchInterval);
        this.setState ({
          isDisabled : false
        });
    }
    
    resetStopwatch = e => {
        this.setState ({
          stime:0,
          ssec: 0,
          smin: 0,
          shr: 0,
        })
    }
    
    handleInput = e => {
      this.setState ({
        timerInput: e.target.value,
      })
    }
    
    startTimer = e => {
      this.setState ({
        isDisabled : true
      });
      if (this.state.timerInput > 0){
        this.timerInterval = setInterval(
          function(){
            var thr = Math.floor(this.state.timerInput / 3600)
            var tmin = Math.floor((this.state.timerInput - 3600*thr) / 60)
            var tsec = this.state.timerInput % 60
            if (this.state.timerInput < 0) {
              this.setState({
                 sound: "PLAYING"
              })
              {this.stopTimer()}
              alert("Time up!")
            }
            else{
              this.setState({
                timerInput: this.state.timerInput-1,
                thr: thr,
                tmin: tmin,
                tsec: tsec,
              })
            }
          }.bind(this),
        1000);
      }
    }
    
    stopSound = e => {
      this.setState ({
        sound: "STOPPED"
      })
    }
    
    stopTimer = e => {
        clearInterval(this.timerInterval);
        this.setState ({
          isDisabled : false
        });
    }
    
    resetTimer = e => {
        this.setState ({
          timerInput:null,
          tsec: 0,
          tmin: 0,
          thr: 0,
        })
    }

    render() {
    return (
      <div className="App">
        <div className="Stopwatch">
          <h2>Stopwatch</h2>
          <br></br>
          <div className="circle">
            {this.state.shr} : {this.state.smin} : {this.state.ssec}
          </div>
          <br></br>
          <br></br>
          <br></br>
          <input type="button" onClick={this.startStopwatch} value="Start" disabled={this.state.isDisabled} />
          <input type="button" onClick={this.stopStopwatch} value="Stop" />
          <input type="button" onClick={this.resetStopwatch} value="Reset" />
        </div>
        <div className="Timer">
          <h2>Timer</h2>
          <br></br>
          <div className="circle">
            {this.state.thr} : {this.state.tmin} : {this.state.tsec} 
          </div>
          <br></br>
          <input type="text" placeholder="Enter time in seconds" onChange={this.handleInput} />
          <br></br>
          <br></br>
          <input type="button" onClick={this.startTimer} disabled={this.state.isDisabled} value="Start"/>
          <input type="button" onClick={this.stopTimer} value="Stop" />
          <input type="button" onClick={this.resetTimer} value="Reset" />
          <Sound url={timerSound} playStatus={this.state.sound} onFinishedPlaying={this.stopSound} />
        </div>
      </div>
    );
  }
}

export default App;
