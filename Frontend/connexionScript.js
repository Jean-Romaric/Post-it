 let input = document.querySelector("input");
 let form = document.querySelector("form");
 

const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data) 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json(); 
    return responseData;

  } catch (error) {
    console.error('Error posting data:', error); 
  }
};


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let username = input.value.trim();
    if(username == "" ){
      document.getElementById("output").innerHTML =
       "<div class='alert alert-danger'>Entrer un username svp !</div>";
      setTimeout(() => {
       document.getElementById("output").innerHTML =
       "";
      }, 2000);
      return
    }
    if(username.length > 10 ){
       document.getElementById("output").innerHTML =
       "<div class='alert alert-danger'>Entrer au minimum 10 lettres !</div>";
      setTimeout(() => {
       document.getElementById("output").innerHTML =
       "";
      }, 2000);
      return
    }
    const apiEndpoint = 'http://localhost:3000/api/users'; 
    const myData = {
    username: `${username}`
    };
   postData(apiEndpoint, myData);
   input.value = "";

   setTimeout(() => {
  window.location.replace("accueil.html");
  }, 100);
}) 





