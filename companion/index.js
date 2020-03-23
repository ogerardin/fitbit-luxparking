import { me } from "companion";
import * as messaging from "messaging";

import { TfLuxOccupancy } from "./tflux.js"

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
      // Limit results to the number of tiles available in firmware
      //parkings.splice(TILES_COUNT, parkings.length);
      // send each parking individually
      parkings.forEach(parking => {
        //FIXME we have throughput issues sometimes... maybe use https://github.com/dillpixel/fitbit-asap ?
        //console.log("Sending #" + parking.index)
        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          messaging.peerSocket.send(parking)
        }
        else {
          console.log("Error: Connection is not open");
        }
      });
  }).catch(function (e) {
    console.log("error: " + e);
  });
}
