export class DetailsScreen {
    constructor(el) {
        this.el = el;
        this.onclose = undefined;
        this.detailsName = this.el.getElementById("details-name");
        this.detailsAddress = this.el.getElementById("details-address");
        this.btnClose = this.el.getElementById("button-close");
        this.btnClose.onclick = () => this.onclose();
    }

    load(parking) {
        this.detailsName.text = parking.name;
        this.detailsAddress.text = parking.adr;
    }

    show() {
        this.el.animate("enable");
    }

    hide() {
        this.el.animate("disable");
    }

}