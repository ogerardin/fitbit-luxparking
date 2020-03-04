import { me } from "companion";
import * as messaging from "messaging";

import { TfLuxOccupancy } from "./tflux.js"
import { TILES_COUNT } from "../common/globals.js";

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  sendAllParkings();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

function sendAllParkings() {
  let api = new TfLuxOccupancy();
  api.allParkings().then(function(parkings) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Limit results to the number of tiles available in firmware
      parkings.splice(TILES_COUNT, parkings.length);
      // send each parking individually
      parkings.forEach(parking => {
        messaging.peerSocket.send(parking)
        //console.log("Sending " + JSON.stringify(parking))
      });
    }
  }).catch(function (e) {
    console.log("error: " + e);
  });
}
