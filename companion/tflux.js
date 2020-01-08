export function TfLuxOccupancy() {
};

TfLuxOccupancy.prototype.allParkings = function() {
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://api.tfl.lu/v1/Occupancy/CarPark";
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log("Got JSON response from server:" + JSON.stringify(json));

      let features = json["features"];
      let parkings = [];

      features.forEach( (f) => {
          let properties = f["properties"];
          let  open = properties["meta"]["open"];
          let parking = {
            "name": properties["name"],
            "total": properties["total"],
            "free": properties["free"],
            "trend": properties["trend"],
            "o" : open
          };
          parkings.push(parking);
      });

      // Sort departures
      parkings.sort( (a,b) => { return (b["free"] - a["free"]) } );

      resolve(parkings);
    }).catch(function (error) {
      reject(error);
    });
  });
}
