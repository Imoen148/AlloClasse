

const toggleVueAdmin = () => {
    if(!connecte){
        connecte = !connecte;
        construireVueAdmin(); 
    }else{
        console.log(1);
        document.getElementById('vue').innerHTML = vueAccueil;
    }
}