//(2)
const express = require('express');//“Va chercher le framework Express.js dans node_modules”
//Je stocke Express.js dans la variable express pour pouvoir l’utiliser
const app = express(); //express() Initialise une nouvelle application Express.js (je crée une application Express)

const { connecter, db } = require('./bd/connect');
connecter();

const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRouter');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));//parser les données POST de formulaire, permet de lire les données envoyées via un formulaire HTML

app.use(cors());
app.use(express.json());



app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des Post-it');
}); 


 app.listen(3000,console.log("Attente des requetes au port 3000"));

