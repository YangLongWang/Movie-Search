Key1 = "vJ66865rhP2CnGnuEHAg22qFVMVD26YJ4CcdT11v";
key2 = "cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5";
info(184126)


let btn = document.querySelector(".button");




btn.addEventListener("click", function () {
    let apiKey = '627ce180f6b942d38cd09ef7905db024';
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log((data))
            lat = data.latitude.toString();
            long = data.longitude.toString();
            let location = lat + ";" + long;
        });
})

function info(location) {
    info = document.querySelector("input").value;
    now = getTime();
    console.log(now);
    fetch("https://api-gate2.movieglu.com/filmLiveSearch/?query=" + info + "&n=6", {
        headers: {
            "Api-Version": "v200",
            "Authorization": "Basic U1RVRF8yMjM6Mk9sVEhKMGJjbElO",
            "Client": "STUD_223",
            "location": location,
            "Device-Datetime": "2022-06-16T18:38:24.857Z",
            "Territory": "CA",
            "X-Api-Key": "vJ66865rhP2CnGnuEHAg22qFVMVD26YJ4CcdT11v"
        }
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
    });
}

function info(id) {
    fetch("https://api-gate2.movieglu.com/filmDetails/?film_id=" + id + "", {
        headers: {
            "Api-Version": "v200",
            "Authorization": "Basic U1RVRF8yMjNfWFg6MEM4S3k3UnQ2V0pL",
            "Client": "STUD_223",
            "Device-Datetime": "2022-06-16T18:38:24.857Z",
            "Territory": "XX",
            "X-Api-Key": "PEmYjxkTo66M2GZ8vnyNF6J876smHZ8m3T0jUAfH"
        }
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
    });
}

184126
