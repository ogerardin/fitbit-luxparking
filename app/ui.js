import { TILES_COUNT } from "../common/globals.js";
import document from "document";

export function BartUI() {
  this.parkingList = document.getElementById("parkingList");
  this.statusText = document.getElementById("status");

  this.tiles = [];
  for (let i = 0; i < TILES_COUNT; i++) {
    let tile = document.getElementById(`parking-${i}`);
    if (tile) {
      this.tiles.push(tile);
    }
  }
}

BartUI.prototype.updateUI = function(state, departures) {
  if (state === "loaded") {
    this.parkingList.style.display = "inline";
    this.statusText.text = "";

    this.updateParkingList(departures);
  }
  else {
    this.parkingList.style.display = "none";

    if (state === "loading") {
      this.statusText.text = "Loading parkings ...";
    }
    else if (state === "disconnected") {
      this.statusText.text = "Please check connection to phone and Fitbit App"
    }
    else if (state === "error") {
      this.statusText.text = "Something terrible happened.";
    }
  }
}

BartUI.prototype.updateParkingList = function(parkings) {
  for (let i = 0; i < TILES_COUNT; i++) {
    let tile = this.tiles[i];
    if (!tile) {
      continue;
    }

    const parking = parkings[i];
    if (!parking) {
      tile.style.display = "none";
      continue;
    }

    tile.style.display = "inline";
    tile.getElementById("name").text = parking.name;
    if (! parking.o) {
      tile.getElementById("occupancy").text = "closed";
    }
    else if (parking.free >= 0) {
      tile.getElementById("occupancy").text = "" + parking.free + "/" + parking.total;
    }
    else {
      tile.getElementById("occupancy").text = "---/" + parking.total;
    }
    if (parking.trend === 'up') {
      tile.getElementById("trend").image = "arrow_up.png";
    }
    else if (parking.trend === 'down') {
      tile.getElementById("trend").image = "arrow_down.png";
    }
    else if (parking.trend === 'stable') {
      tile.getElementById("trend").image = "arrow_flat.png";
    }
    else {
      tile.getElementById("trend").image = null;
    }
  }
}
