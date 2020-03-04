import {TILES_COUNT} from "../common/globals.js";
import document from "document";
import {DetailsScreen} from "./details-screen";

export class StatusUI {
    constructor(el) {
        this.el = el;
    }

    update(state) {
        if (state === "loading") {
            this.el.text = "Loading parkings ...";
        } else if (state === "disconnected") {
            this.el.text = "Please check connection to phone and Fitbit App";
        } else if (state === "error") {
            this.el.text = "Something terrible happened.";
        }
    }

  hide() {
    this.el.style.display = "none";
  }

}
