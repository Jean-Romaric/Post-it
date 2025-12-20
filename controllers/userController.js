//(4)
const { User } = require("../models/userModel")
const { db } = require("../bd/connect") // on importe la connexion a la bd du module connect.js
const { ObjectId } = require("mongodb")

const addUser = async (req, res)=>{
    try{
        let _user = new User(
            req.body.nom, 
            req.body.prenoms
        ) //ici db() Retourne la base de données MongoDB "post-it"
        let result = await db().collection("users").insertOne(_user)
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getUsers = async (req, res)=>{
    try{
        let users = await db().collection("users").find().toArray(); //toArray() Transforme le résultat en tableau JavaScript
        //console.log(users);
        // users est un tableau d'objets représentant tous les utilisateurs
        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(204).json({ message: "Aucun utilisateur trouvé" });
        }      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getOneUser = async (req, res)=>{
    try{
        let id =new ObjectId( req.params.id);// Conversion de la chaîne de caractères en ObjectId
        let users = await db().collection("users").find({_id : id}).toArray(); //toArray() Transforme le résultat en tableau JavaScript
        //console.log(users);
        // users est un tableau d'objets représentant tous les utilisateurs
        if (users.length > 0) {
            return res.status(200).json(users[0]);
        } else {
            return res.status(204).json({ message: "Aucun utilisateur trouvé" });
        }      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}





module.exports = { addUser, getUsers, getOneUser }; 