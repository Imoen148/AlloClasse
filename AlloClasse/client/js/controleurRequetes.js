const seConnecter = async () => {
    let Courriel = document.getElementById('courrielUser').value;
    let password = document.getElementById('passwordUser').value;
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/v1/users/login',
            data: {
                Courriel,
                password
            }
        });
        console.log(res);
    } catch(err){
        console.log(err);
    }
    // const res = await axios({
    //     method: 'POST',
    //     url: 'http://127.0.0.1/8080/api/v1/users/login',
    //     data: {
    //         Courriel,
    //         password
    //     },
    // });
    // console.log(res);
}; 

    // $.ajax({ 
    //     type : "POST",
    //     url : '/api/v1/users/login',
    //     data : {
    //         Courriel,
    //         password
    //     },
    //     dataType : 'json',
    //     success : (reponse) => {
    //         console.log(reponse)
    //     },
    //     fail : function (){
    //     }
    // });
    
