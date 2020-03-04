import * as messaging from "messaging";
import document from "document";
import {ListScreen} from "./list-screen";
import {StatusUI} from "./status.js";


//let ui = new LuxParkingUI();

let listScreen = new ListScreen(document.getElementById("parkingList"))
let status = new StatusUI(document.getElementById("status"))

status.update("disconnected");

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
    status.update("loading");
    messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function (evt) {
    status.hide();
    listScreen.load(evt.data);
    listScreen.show();
}

// Listen for the onerror event
messaging.peerSocket.onerror = function (err) {
    // Handle any errors
    status.update("error");
}
