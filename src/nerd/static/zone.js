import { request } from "./api.js";
import { record_template } from "./templates.js"


async function show_zone() {
    const records_container = document.getElementById("records");
    const zone_name_container = document.getElementById("zone-name");
    const hetzner_button = document.getElementById('hetzner-button');
    const id = new URL(document.location).searchParams.get('id');

    records_container.innerHTML = '';
    zone_name_container.innerHTML = '';

    let [zone, records] = await Promise.all([
        request(`/zones/${id}`, 'zone'),
        request(`/records?zone_id=${id}`, 'records')
    ])
    
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

document.getElementById('delete-button').addEventListener('click', () => {
    alert(`Hey!
        
This webapp is made for a uni assignment, and it's probably buggy in a million ways. Using it to delete anything is a VERY BAD IDEA!

Also, you're probably my examiner, in which case I gave you my own API key to test this thing out. Not cool, man!`);
})