﻿var stopRandomizer = false;
var windowList = [];

function createRandomGUMStream() {
  var constraints = {
    'video': Math.floor(Math.random() * 2),
    'audio': Math.floor(Math.random() * 2)
  };

  console.log('video: ' + constraints['video']);
  console.log('audio: ' + constraints['audio']);

  createGUMStream(constraints);
}

function runMediaRecorderOp() {
  mediaRecorderOperations = ['start', 'stop', 'pause', 'resume', 'requestData'];

  var mediaRecorderIndex = Math.floor(Math.random() * mediaRecorderList.length);
  var mediaRecorder = mediaRecorderList[mediaRecorderIndex];

  if(mediaRecorder) {
    var command = mediaRecorderOperations[Math.floor(Math.random() * mediaRecorderOperations.length)];

    if(command === 'start') {
      var useTimeSlice = Math.floor(Math.random() * 2);
      console.log('media recorder index: ' + mediaRecorderIndex);
      console.log('operation: ' + command);

      if(useTimeSlice) {
        var timeSlice = Math.floor(Math.random() * 10) * 1000;
        console.log('timeslice: ' + timeSlice);
        mediaRecorder.start(timeSlice);
      } else {
        mediaRecorder.start();
      }

    } else {
      console.log('media recorder index: ' + mediaRecorderIndex);
      console.log('operation: ' + command);
      mediaRecorder[command]();
    }
  }
}

function newTab() {
  var newWindow = window.open('http://mozilla-b2g.github.io/qa-testcase-data/webapi/mediarecorder/random.html', '_blank');
  windowList.push(newWindow);
}

function closeWindow() {
  var index = Math.floor(Math.random() * windowList.length);
  var selectedWindow = windowList[index];
  selectedWindow.close();
  windowList.splice(index, 1);
}

function runRandomMediaOpCommand() {
  function runRandomCommand() {
    try {
      runMediaRecorderOp();
    } catch(err) {
      console.log(err);
    }

    if(!stopRandomizer) {
      runRandomMediaOpCommand();
    }
  }

  var timeout = Math.floor(Math.random() * 1000);
  setTimeout(runRandomCommand, timeout);
}

function runRandomCreationStreamOp() {
  function runRandomCommand() {
    try {
      createRandomGUMStream();
    } catch(err) {
      console.log(err);
    }

    if(!stopRandomizer) {
      runRandomCreationStreamOp();
    }
  }

  var timeout = Math.floor(Math.random() * 1000);
  setTimeout(runRandomCommand, timeout);
}

function runWindowModificationCommand() {
  randomCommands = [
    'newTab',
    'closeWindow'
  ];

  function runRandomCommand() {
    try {
      var command = randomCommands[Math.floor(Math.random() * randomCommands.length)];
      console.log(command);
      window[command]();
    } catch(err) {
      console.log(err);
    }

    if(!stopRandomizer) {
      runWindowModificationCommand();
    }
  }

  var timeout = Math.floor(Math.random() * 1000) * 10;
  setTimeout(runRandomCommand, timeout);
}

function runRandomizer() {
  setTimeout(runRandomCreationStreamOp, 1);
  setTimeout(runRandomMediaOpCommand, 1);
  setTimeout(runWindowModificationCommand, 1);
}

window.addEventListener("DOMContentLoaded", runRandomizer);
