export function record_template(type, name, value, ttl) {
    return `
        <div class="grid grid-cols-subgrid col-span-full gap-2 p-2 border-b">
            <span class="grid grid-cols-subgrid sm:col-span-2">
                <span>
                ${type}
                </span>
                <span class="font-mono break-all">
                ${name}
                </span>
            </span>
            <span class="font-mono break-all">
                ${value}
            </span>
            ${ ttl === undefined 
                ? '<span class="text-right text-slate-400 max-md:hidden">(zone default)</span>'
                : '<span class="text-right max-md:hidden">' + ttl + '</span>'
            }
        </div>
    `
}

export function zone_template(name, id, records) {
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
        <a href="/zone?id=${id}" class="bg-slate-100 transition shadow-md shadow-slate-300 hover:shadow-slate-400 grid grid-cols-[1fr_auto] w-full max-w-sm">
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
