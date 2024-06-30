let key_submit = document.getElementById("key-submit");
let key_field = document.getElementById("key-field");

key_field.value = localStorage.getItem("key");

async function api_request(url, method="GET") {
    let request = new Request(url, {
        "method": method,
        headers: {
            "Auth-API-Token": localStorage.getItem("key")
        }
    })

    let response = await fetch(request);
    let json = await response.json();
    if (!response.ok) {
        alert(`API error ${response.status}: ${json['message']}`);
        throw new Error(`API error ${response.status}: ${json['message']}`);
    } else {
        return json;
    }
}

key_submit.addEventListener("click", () => {
    localStorage.setItem("key", key_field.value);
})

function get_zones() {
    return api_request("https://dns.hetzner.com/api/v1/zones").then(res => res['zones']);
}

function get_zone(id) {
    return api_request(`https://dns.hetzner.com/api/v1/zones/${id}`).then(res => res['zone']);
}

function get_records(zone_id) {
    return api_request(`https://dns.hetzner.com/api/v1/records?zone_id=${zone_id}`).then(res => res['records']);
}
