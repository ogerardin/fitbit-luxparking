export function TfLuxOccupancy() {
};

TfLuxOccupancy.prototype.allParkings = function () {
    let self = this;
    return new Promise(function (resolve, reject) {
        let url = "https://api.tfl.lu/v1/Occupancy/CarPark";
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            //console.log("Got JSON response from server:" + JSON.stringify(json));

            let features = json["features"];
            console.log("Received " + features.length + " parkings")

            // sort most free spaces first
            features.sort((a,b) => {
                return (b["properties"]["free"] - a["properties"]["free"])
            })
            
            let parkings = [];

            features.forEach((f) => {
                let properties = f["properties"];
                let open = properties["meta"]["open"];
                let adr = properties["meta"]["address"]["street"];
                let name = properties["name"];
                let total = properties["total"];
                let free = properties["free"];
                let trend = properties["trend"];
                let payment = properties["meta"]["payment_methods"];
                let parking = {
                    "index": parkings.length,
                    "name": name,
                    "adr": adr,
                    "total": total,
                    "free": free,
                    "trend": trend,
                    "o": open,
                    "payment": payment,
                };
                //console.log(JSON.stringify(parking))
                parkings.push(parking);
            });

/*
            parkings.sort((a, b) => {
                return (b["free"] - a["free"])
            });
*/

            resolve(parkings);
        }).catch(function (error) {
            reject(error);
        });
    });
}
