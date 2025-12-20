//(2)
const express = require('express');
const { connecter, db } = require('./bd/connect');
const app = express();
const userRoutes = require('./routes/userRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connecter();


app.use('/api', userRoutes);


app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des Post-it');
}); 


 app.listen(3000,console.log("Attente des requetes au port 3000"));

