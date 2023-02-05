const construireVueAdmin = () => {
    connecte = true;
    let vueAdmin = `
    <!-- Navbar Start -->
    <div class="container-fluid bg-light position-relative shadow">
      <nav
        class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5"
      >
        <div class="logo_container">
          <a
          href=""
          class="navbar-brand font-weight-bold text-secondary"
          >
            <img class="logo" src="./img/logo.png"></img>
            <span class="text-primary">AlloClasse</span>
          </a>
        </div>
        <button
          type="button"
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div class="navbar-nav font-weight-bold mx-auto py-0">
            <a href="index.html" class="nav-item nav-link active">Accueil</a>
            <a href="#section-1" class="nav-item nav-link">Notre plateforme</a>
            <a href="#section-2" class="nav-item nav-link">Notre mission</a>
            <a href="#section-3" class="nav-item nav-link">Nos partenaires</a>
            <a href="#section-4" class="nav-item nav-link">Nos utilisateurs</a>
            <a href="#section-5" class="nav-item nav-link">Contact</a>
          </div>
          <div class="nav_btn_container">
            <a href="javascript:toggleVueAdmin();" class="btn btn-primary px-4">Déconnexion</a>
          </div>
        </div>
      </nav>
    </div>
    <!-- Navbar End -->
    `;
    console.log(1);
    document.getElementById('vue').innerHTML = vueAdmin;
}