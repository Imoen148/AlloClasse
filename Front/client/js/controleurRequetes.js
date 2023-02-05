let UserConnecter; 

const seConnecter = async () => {
    let Courriel = document.getElementById('courrielUser').value;
    let password = document.getElementById('passwordUser').value;
    console.log(navigator.cookieEnabled);
    
fetch('http://127.0.0.1:8080/api/v1/users/login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "Courriel": Courriel,
        "password": password
    }),
    data: {
        Courriel,
        password
    }
})
.then(res => res.json())
.then(res => {
    console.log(res.data.use);
    document.cookie = `JWT=${res.token}; expires=Thu, 01 Jan 2025 00:00:00 UTC;`;
    console.log(document.cookie);
})

}
    
