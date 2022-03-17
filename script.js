(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 100);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            /*if (h < 10) {
                h = "0" + h;
            }*/

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h < 12) {
                c.innerHTML = h + ":" + m + ":" + s + " EL";
            }

            if (h == 12) {
                c.innerHTML = h + ":" + m + ":" + s + " PL";
            }

            if (h > 12) {
                h = h - 12;
                c.innerHTML = h + ":" + m + ":" + s + " PL";
            }

            //c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");

    var summa = 0;
    e.innerHTML = "x,xx &euro;";
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1").checked;
        let kontakt = document.getElementById("v2").checked;
        
        if (linn.value == "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            e.innerHTML = "x,xx &euro;";
            return;
        } else if (linn.value == "tln") {
            summa = 0;
        } else if (linn.value == "trt" || linn.value === "nrv") {
            summa = 2.5;
        } else if (linn.value == "prn") {
            summa = 3;
        } 
        if (kingitus == true) {
            summa += 5;
        } 
        if (kontakt == true) {
            summa += 1;
        }
        let numCurrency = new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(summa);
        e.innerHTML = numCurrency;

        console.log("Tarne hind on arvutatud");
        
        //eesnime kontroll
        let fname = document.getElementById("fname").value;
        if (fname == "") {
            alert("Palun sisestage eesnimi");
            fname.focus();
            return;
        }
        if (typeof fname !== "string" || /[0-9]+/g.test(fname)) {
            alert("Eesnimes ei ole numbrid lubatud");
            fname.focus();
            return;
        }
        //perekonnanime kontroll
        let lname = document.getElementById("lname").value;
        if (lname == "") {
            alert("Palun sisestage perekonnanimi");
            lname.focus();
            return;
        }
        if (typeof lname !== "string" || /[0-9]+/g.test(lname)) {
            alert("Perekonnanimes ei ole numbrid lubatud");
            lname.focus();
            return;
        }

        let suguM = document.getElementById("m");
        let suguN = document.getElementById("n");
        var radioButtons = document.getElementsByName("sex");

        if (suguM.checked == false && suguN.checked == false ) {
            alert("Palun sisestage sugu");
            //lname.focus();
            return;
        } else if (suguM.checked == true) {
            alert(suguM.value + " " + fname + " " + lname + 
                  "\n\nTehtud valikute korral on tarne hind: " + numCurrency);
        } else if (suguN.checked == true) {
            alert(suguN.value + " " + fname + " " + lname + 
                  "\n\nTehtud valikute korral on tarne hind: " + numCurrency);
        } 
    }
})();

// map

let mapAPIKey = "AmwNquApr6K2P9sU-jl0tqsxXperq67oICNGbuJ4akn4QQf2AJCD4nDwhwHUw3CT";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.653813, 25.974251),
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu',
            subTitle: 'HEADE MÕTETE LINN',
            text: 'TA',
            color: 'red'
        });

        map.entities.push(pushpin);

//teine aadress
    let centerPoint2 = new Microsoft.Maps.Location(
            58.882698, 
            25.543887
        );

    let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
            title: 'Paide',
            subTitle: 'EESTIMAA SÜDA',
            text: 'PA',
            color: 'red'
        });
    
    map.entities.push(pushpin2);

//infoboxid
    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    //Create a pushpin at a random location in the map bounds.
    var randomLocation = Microsoft.Maps.TestDataGenerator.getLocations(1, map.getBounds());
    var pin = new Microsoft.Maps.Pushpin(58.882698, 25.543887);

    //Store some metadata with the pushpin.
    pin.metadata = {
        title: 'Pin Title',
        description: 'Pin discription'
    };

    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

    //Add pushpin to the map.
    map.entities.push(pin);
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}



// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

