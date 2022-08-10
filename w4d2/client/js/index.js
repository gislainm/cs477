

    document.getElementById('signinBtn').onclick = signIn;





async function signIn(){
    
    const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById('usrname').value,
            password: document.getElementById('pssword').value
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    console.log(result);
    if(result.error){
        document.getElementById('error').innerHTML = result.message;

    }else{
        sessionStorage.setItem('accessToken', result.data.accessToken);
        window.location = 'welcome.html'
    }
}