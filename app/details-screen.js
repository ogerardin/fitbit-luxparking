const PAYMENT_METHODS = ['cash', 'vpay', 'visa', 'mastercard', 'amex', 'call2park'];

export class DetailsScreen {
    constructor(el) {
        this.el = el;
        this.onclose = undefined;
        this.detailsName = this.el.getElementById("details-name");
        this.detailsAddress = this.el.getElementById("details-address");
        this.btnClose = this.el.getElementById("button-close");
        this.payment = [];
        for (const p of PAYMENT_METHODS) {
            this.payment[p] = this.el.getElementById(p);
        }
        this.btnClose.onclick = () => this.onclose();
    }

    load(parking) {
        this.detailsName.text = parking.name;
        this.detailsAddress.text = parking.adr;
        for (const p of PAYMENT_METHODS) {
            this.payment[p].style.display = (parking.payment[p]) ? "inline" : "none";
        }

    }

    show() {
        this.el.animate("enable");
    }

    hide() {
        this.el.animate("disable");
    }

}