// let tabMembres = {};
// let membreConnecte = {};
// let courriel = null;
// let pass = null;

// let seConnecter = () => {
//     courriel = document.getElementById('courriel').value;
//     pass = document.getElementById('pass').value;
//     requetesServeurPermis('recupererTableauMembresDeApp');
// }

// let verifierParamsConnexion = () => {
//     let msgErr = "";
//     for(let unMembre of tabMembres){
//         if(unMembre.email == courriel && unMembre.password == pass) {
//             document.getElementById('formConnexion').reset(); //Vider le formulaire
//             basculerVisibiliteModal('modalConnexion','cacher'); //Cacher le modal de id modalConnexion
//             connecte = true;
//             afficherNavbarSelonConnexion();
//             membreConnecte = unMembre;
//             break;
//         }else {
//             msgErr = "Vérifiez vos paramètres de connexion.";
//         }
//     }
//     document.getElementById('formConnexionErr').innerHTML = msgErr;
//     setTimeout(() => {
//         document.getElementById('formConnexionErr').innerHTML="";
//         document.getElementById('formConnexion').reset();
//     }, 5000);
//     document.getElementById('lblApiKey').innerHTML = "Bonjour "+membreConnecte.firstname+", votre clé pour l'API PermisAnimal est: "+membreConnecte.apiKey;
// }

// let seDeconnecter = () => {
//     connecte = false;
//     viderVue();
//     chargerBgdImg(true);
//     afficherNavbarSelonConnexion();
//     membreConnecte = {};
//     document.getElementById('lblApiKey').innerHTML = "";
//  }