let zone_container = document.getElementById("zones");

function zone_template(name, records) {
    let record_types = {
        "A": 0,
        "AAAA": 0,
        "MX": 0,
        "TXT": 0,
        "other": 0
    }
    for (let record of records) {
        if (Object.keys(record_types).includes(record['type'])) {
            record_types[record['type']] += 1;
        } else {
            record_types['other'] += 1;
        }
    }
    return `
        <a href="/record" class="bg-slate-100 transition shadow-md shadow-slate-300 hover:shadow-slate-400 grid grid-cols-[1fr_auto] w-full max-w-sm">
            <h2 class="text-xl bg-red-600 text-white font-mono p-4 col-span-full">
                ${name}
            </h2>
            <div class="grid grid-cols-subgrid p-2 col-span-2 gap-2">
                <div class="w-full my-auto border-r border-slate-400">
                    <span class="block text-center text-5xl">
                        ${records.length}
                    </span>
                    <span class="block text-center text-xl">
                        records
                    </span>
                </div>
                <table class="ml-4">
                    ${
                        Object.entries(record_types).map(entry => `
                        <tr class="gap-2">
                            <td class="pr-3">${entry[1]}</td>
                            <td class="text-right">${entry[0]}</td>
                        </tr>
                        `).join('')
                    }
                </table>
            </div>
        </a>
    `;
}

function get_zones() {
    return api_request("https://dns.hetzner.com/api/v1/zones").then(res => res['zones']);
}

function get_records(zone_id) {
    return api_request(`https://dns.hetzner.com/api/v1/records?zone_id=${zone_id}`).then(res => res['records']);
}

async function update_zones() {
    let zones = await get_zones();
    for (let zone of zones) {
        zone['records'] = await get_records(zone['id']);
    }
    zone_container.innerHTML = zones.map(zone => zone_template(zone['name'], zone['records'])).join('');
}

update_zones();

key_submit.addEventListener("click", () => {
    localStorage.setItem("key", key_field.value);
    update_zones();
})