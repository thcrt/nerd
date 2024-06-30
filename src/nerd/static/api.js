export async function request(path, target=undefined, method='GET') {
    let request = new Request(`https://dns.hetzner.com/api/v1${path}`, {
        'method': method,
        headers: {
            'Auth-API-Token': localStorage.getItem('key')
        }
    })

    let response = await fetch(request);
    let json = await response.json();
    if (!response.ok) {
        alert(`API error ${response.status}: ${json['message']}`);
        throw new Error(`API error ${response.status}: ${json['message']}`);
    } else {
        return target ? json[target] : json;
    }
}
