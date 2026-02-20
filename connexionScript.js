 let input = document.getElementById("username");
 let form = document.querySelector("form");
 const imageInput = document.getElementById('imageInput');
 const previewImage = document.getElementById('previewImage');
 const icon = document.querySelector("i");

 //console.log(icon)


 //console.log(imageInput);

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let username = input.value;
  //console.log(username)

  if (username === "") {
    showError("Entrer un username svp !");
    return;
  }

  if (username.length > 10) {
    showError("Entrer au minimum 10 lettres !");
    return;
  }

  const apiEndpoint = "https://apipost-7o2w.onrender.com/api/users";
  const myData = { username : `${username}`};

  const result = await postData(apiEndpoint, myData);
  //console.log(result);
  //  On vérifie si le serveur a répondu
  if (result) { // si le backend retourne une reponse, ici id
    window.location.replace("accueil.html");
  } else {
    showError("Erreur serveur !");
  }
});

function showError(message) {
  const output = document.getElementById("output");
  output.innerHTML = `<div class='alert alert-danger'>${message}</div>`;

  setTimeout(() => {
    output.innerHTML = "";
  }, 2000);
}

imageInput.addEventListener('change', function() {
    //this referent a l'input
    const file = this.files[0]; //accéder au premier fichier sélectionné par l'utilisateur dans un champ de saisie (<input type="file">).
   //  console.log(file)
    if (file){
        const reader = new FileReader();
        
        // Lorsque le fichier est lu, mettre à jour la source de l'image
        reader.onload = function(e) { // onload ecouteur d'evenement
            const newImage = document.createElement("img");
            newImage.src = e.target.result;
            console.log(newImage)
            newImage.style.borderRadius = "50%";
            newImage.style.width= "100px";
            newImage.style.height= "150px";
            console.log(newImage);
            icon.replaceWith(newImage);
            
            //previewImage.src = e.target.result; //e (ou event) est un objet qui contient toutes les informations sur l'événement qui vient de se produire.
            //previewImage.style.display = 'block'; // Afficher l'image
            
        }
        
        reader.readAsDataURL(file); // Lire le fichier
    }
});
