import document from "document";
import {DetailsScreen} from "./details-screen";


export class ListScreen {
    constructor(el) {
        this.el = el;
        this.details = document.getElementById("details");
        this.tiles = this.el.getElementsByClassName("item");
    }

    load(parking) {
        //console.log("received " + JSON.stringify(parking))
        let i = parking["index"]
        console.log("received #" + i)
        if (i >= this.tiles.length) {
            console.log("  ignoring #" + i)
            return;
        }
        let tile = this.tiles[i];

/*
            if (!parking) {
                tile.style.display = "none";
                continue;
            }
*/

        tile.style.display = "inline";
        tile.getElementById("name").text = parking.name;
        let occupancy;
        if (!parking.o) {
            occupancy = "closed";
        } else {
            let free = parking.free != null && parking.free >= 0 ? parking.free : "unknown";
            let total = parking.total != null && parking.total >= 0 ? parking.total : "unknown";
            occupancy = free + "/" + total;
        }
        tile.getElementById("occupancy").text = occupancy;

        if (parking.trend === 'up') {
            tile.getElementById("trend").image = "arrow_down.png";
        } else if (parking.trend === 'down') {
            tile.getElementById("trend").image = "arrow_up.png";
        } else if (parking.trend === 'stable') {
            tile.getElementById("trend").image = "arrow_flat.png";
        } else {
            tile.getElementById("trend").image = null;
        }

        this.touchArea = tile.getElementById("touch-area");
        this.touchArea.onclick = () => this.showDetails(parking)
    }

    show() {
        //this.el.animate("enable");
        this.el.style.display = "inline";
    }

    hide() {
        //this.el.animate("disable");
        this.el.style.display = "none";
    }

    showDetails(parking) {
        this.detailsScreen = new DetailsScreen(this.details);
        this.detailsScreen.onclose = () => {
            this.detailsScreen.hide();
            this.detailsScreen = null;
            this.show()
        };
        this.detailsScreen.load(parking);
        this.hide();
        this.detailsScreen.show();
    }
}