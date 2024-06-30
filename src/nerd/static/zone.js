let records_container = document.getElementById("records");
let zone_name = document.getElementById("zone-name")

async function show_zone() {
    let zone = await get_zone(new URL(document.location).searchParams.get("id"));
    let records = await get_records(zone['id']);
    records_container.innerHTML = records.map(record => record_template(record['type'], record['name'], record['value'], record['ttl'])).join('');
    zone_name.innerText = zone['name']
}

function record_template(type, name, value, ttl) {
    return `
        <div class="grid grid-cols-subgrid col-span-full gap-2 p-2 border-b">
            <span>
                ${type}
            </span>
            <span>
                ${name}
            </span>
            <span>
                ${value}
            </span>
            <span class="text-right">
                ${ttl}
            </span>
        </div>
    `
}

show_zone();