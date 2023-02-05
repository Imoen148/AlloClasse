let connecte = false;

let afficherNavbarSelonConnexion = () => {
    let navbar = "";
    if(connecte){
        navbar = `
            <nav class="navbar navbar-expand-lg id="bgnavbarperso">
                <div class="container-fluid">
                    <a class="navbar-brand" href="javascript:viderVue();chargerBgdImg(true);"><img src="client/ressources/images/montreal.png" alt=""></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="javascript:viderVue();chargerBgdImg(true);">Accueil</a></li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Opérations</a>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><a class="dropdown-item" href="javascript:requetesServeurPermis('listerTous');">Tous les Permis</a></li>
                                    <li><a class="dropdown-item" href="javascript:formEnregistrer();">Créer un Permis</a></li>
                                    <li><a class="dropdown-item" href="javascript:formObtenir('modifier');">Modifier un Permis</a></li>
                                    <li><a class="dropdown-item" href="javascript:formObtenir('supprimer');">Supprimer un Permis</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="javascript:seDeconnecter();">Déconnexion</a></li>
                        </ul>
                        <span class="navbar-text" id="lblApiKey"></span>
                    </div>
                </div>
            </nav>`
        document.getElementsByClassName("navbar")[0].innerHTML = navbar;
    }else{
        navbar = `
            <nav class="navbar navbar-expand-lg" id="bgnavbarperso">
                <div class="container-fluid">
                    <a class="navbar-brand" href="javascript:viderVue();chargerBgdImg(true);"><img src="client/ressources/images/montreal.png" alt=""></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="#">Accueil</a></li>
                            <li class="nav-item"><a class="nav-link" href="javascript:basculerVisibiliteModal('modalEnreg','montrer');">Devenir Membre</a></li>
                            <li class="nav-item"><a class="nav-link" href="javascript:basculerVisibiliteModal('modalConnexion','montrer');">Connexion</a></li>
                        </ul>
                    </div>
                </div>
            </nav>`
        document.getElementById("bgnavbarperso").innerHTML = navbar;
    }
}