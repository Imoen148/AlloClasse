let idUserConnected; 
let roleUserConnected; 

const seConnecter = async () => {
    let Courriel = document.getElementById('courrielUser').value;
    let password = document.getElementById('passwordUser').value;
    
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
        if(res.status !== 'success'){
            document.getElementById('errMssConn').innerHTML = res.message
        } else {
            idUserConnected = res.data.user._id;
            roleUserConnected = res.data.user.Role;
            document.cookie = `JWT=${res.token}; expires=Thu, 01 Jan 2025 00:00:00 UTC;`;
            console.log(document.cookie);
            console.log(res.status);
        }        
    })

}

const enregistrer = async () => {
    let Nom = document.getElementById('nomUser').value;
    let Prenom = document.getElementById('prenomUser').value;
    let Groupe = document.getElementById('groupeUser').value;
    let Courriel = document.getElementById('courrielUser').value;
    let password = document.getElementById('passwordUser').value;
    let passwordConfirm = document.getElementById('cpassUser').value;

    fetch('http://127.0.0.1:8080/api/v1/users/signup', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Nom": Nom,
            "Prenom": Prenom,
            "Groupe": Groupe,
            "Courriel": Courriel,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "passwordChangedAt": "01-01-2021"
        }),
        data: {
            Courriel,
            password
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status !== 'success'){
            document.getElementById('errMssEnr').innerHTML = res.message
        } else {
            idUserConnected = res.data.user._id;
            roleUserConnected = res.data.user.Role;
            document.cookie = `JWT=${res.token}; expires=Thu, 01 Jan 2025 00:00:00 UTC;`;
            console.log(document.cookie);
            console.log(res.status);
        }
    })

}


const test = async () => {
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
    idUserConnected = res.data.user._id;
    roleUserConnected = res.data.user.Role;
    document.cookie = `JWT=${res.token}; expires=Thu, 01 Jan 2025 00:00:00 UTC;`;
    console.log(document.cookie);
})

}



    
