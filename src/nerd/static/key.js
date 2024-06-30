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