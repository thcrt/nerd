const authEvent = new Event('authenticated');
const deauthEvent = new Event('deauthenticated');

function deauthenticate() {
    localStorage.removeItem('key');
    document.dispatchEvent(deauthEvent);
}

async function authenticate(key) {
    // Check validity by trying to make a request
    // If no key is given, don't bother checking, assume it fails
    let valid = false;
    if (key) {
        valid = await fetch(new Request(
            `https://dns.hetzner.com/api/v1/zones`, 
            {headers: {'Auth-API-Token': key}}
        )).then(res => res.ok);
    }

    
    // Allow the user to see the first 10 characters of the key, same as on the Hetzner page
    document.getElementById('key-hint').innerText = valid ? key.slice(0, 10) : ''
    
    // Some elements should only be visible when auth is either valid or invalid
    // Here we have their IDs, along with whether they should be visible when it's valid
    // Visibility when auth is invalid is assumed to be the opposite
    const validStatusElements = {
        'key-status': true,
        'key-clear': true,
        'refresh': true,
        'key-missing': false,
        'key-set': false
    }
    for (let [id, visible] of Object.entries(validStatusElements)) {
        document.getElementById(id).classList.toggle('hidden', !valid ? visible : !visible)
    }

    if (valid) {
        // Only save the key if it's valid
        localStorage.setItem('key', key);
        // Let the rest of the page know that auth is finished, so the necessary elements can be refreshed
        document.dispatchEvent(authEvent);
    } else {
        deauthenticate();
        // Only complain about invalid key if one was provided
        // i.e. don't complain when we weren't given a key at all
        if (key) alert("That API key isn't valid.");    
    }
    
    return valid;
}


document.getElementById('key-clear').addEventListener('click', () => {
    // Deliberately fail authentication to exit the session
    authenticate(false);
})

document.getElementById('key-set').addEventListener('click', async () => {
    authenticate(prompt("Please enter a Hetzner DNS API key."));
})

document.addEventListener('DOMContentLoaded', () => {
    // Try to get a saved key from storage
    authenticate(localStorage.getItem('key'));
})
