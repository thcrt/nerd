import { request } from "./api.js";
import { record_template } from "./templates.js"

const records_container = document.getElementById("records");
const zone_name_container = document.getElementById("zone-name");
const hetzner_button = document.getElementById('hetzner-button');
const id = new URL(document.location).searchParams.get('id');

async function show_zone() {
    records_container.innerHTML = '';
    zone_name_container.innerHTML = '';

    let zone = await request(`/zones/${id}`, 'zone');
    let records = await request(`/records?zone_id=${id}`, 'records');
    
    records_container.innerHTML = records.map(record => record_template(record['type'], record['name'], record['value'], record['ttl'])).join('');
    zone_name_container.innerText = zone['name'];
    hetzner_button.setAttribute('href', `https://dns.hetzner.com/zone/${id}`)
}

document.addEventListener('deauthenticated', () => {
    window.location.assign('/')
})

document.addEventListener('authenticated', () => {
    show_zone();
})

document.getElementById('refresh').addEventListener('click', () => {
    show_zone();
})


