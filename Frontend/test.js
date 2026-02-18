const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');


imageInput.addEventListener('change', function() {
    //this referent a l'input
    const file = this.files[0]; //accéder au premier fichier sélectionné par l'utilisateur dans un champ de saisie (<input type="file">).
    //console.log(file)
    if (file){
        const reader = new FileReader();
        
        // Lorsque le fichier est lu, mettre à jour la source de l'image
        reader.onload = function(e) { // onload ecouteur d'evenement
            //console.log(e)
            //console.log(e.target)   
            previewImage.src = e.target.result; //e (ou event) est un objet qui contient toutes les informations sur l'événement qui vient de se produire.
            console.log(previewImage.src)
            previewImage.style.display = 'block'; // Afficher l'image
        }
        
        reader.readAsDataURL(file); // Lire le fichier
    }
});
