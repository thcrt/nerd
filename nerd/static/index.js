import { request } from './api.js';
import { zone_template } from './templates.js'

const zone_container = document.getElementById('zones');

async function update_zones() {
    zone_container.innerHTML = `
        <p class="col-span-3 my-auto text-slate-700">
            Loading...
        </p>
    `;

    let zones = await request('/zones', 'zones')
    let record_promises = []
    for (let [i, zone] of zones.entries()) {
        record_promises[i] = request(`/records?zone_id=${zone['id']}`, 'records');
    }
    await Promise.all(record_promises).then(zone_records => {
        for (let [i, records] of zone_records.entries()) {
            zones[i]['records'] = records;
        }
    })
    
    zone_container.innerHTML = zones.map(zone => zone_template(zone['name'], zone['id'], zone['records'])).join('');
}

document.addEventListener('deauthenticated', () => {
    zone_container.innerHTML = `
        <p class="col-span-3 my-auto text-slate-700">
            Enter a valid Hetzner DNS API key to see your zones.
        </p>
    `;
})

document.addEventListener('authenticated', () => {
    update_zones();
})

document.getElementById('refresh').addEventListener('click', () => {
    update_zones();
})