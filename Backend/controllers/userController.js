//(4)
const { User } = require("../models/userModel")
const { db } = require("../bd/connect") // on importe la connexion a la bd du module connect.js,// db  = require("../bd/connect") db.db() 
const { ObjectId } = require("mongodb")//On extrait la classe ObjectId de l’objet mongodb
const e = require("express")
//Il charge le driver officiel MongoDB depuis node_modules

const addUser = async (req, res)=>{
    try{
        let _user = new User(
            req.body.username, 
        ) //ici db() Retourne la base de données MongoDB "post-it"
        let result = await db().collection("users").insertOne(_user);
        console.log(result);
        res.status(201).json({ userId: result.insertedId, username });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}   

const getUsers = async (req, res)=>{
    try{
        let result = await db().collection("users").find().toArray(); //toArray() Transforme le résultat en tableau JavaScript
        //console.log(users);
        // users est un tableau d'objets représentant tous les utilisateurs
        if (result.length > 0) {
            return res.status(200).json(result);
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
        let id = new ObjectId( req.params.id);// Conversion de la chaîne de caractères en ObjectId, ex:ObjectId("64f1a8c2e4b9c7")
        let result = await db().collection("users").find({_id : id}).toArray(); //toArray() Transforme le résultat en tableau JavaScript
        //console.log(users);
        // users est un tableau d'objets représentant tous les utilisateurs
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const updateUser = async (req, res)=>{
    try{
        let id = new ObjectId( req.params.id);// Conversion de la chaîne de caractères en ObjectId, ex:ObjectId("64f1a8c2e4b9c7")
        let nNom = req.body.nom;
        let nPrenoms= req.body.prenoms;
       
        let result = await db().collection("users").updateOne(
            { _id: id },//Co ndition
            { $set: { nom : nNom, prenoms: nPrenoms  }}
        );
        if(result.modifiedCount == 1){
            res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
        }else{
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteUser = async (req, res)=>{
    try{
        let id = new ObjectId( req.params.id);// Conversion de la chaîne de caractères en ObjectId, ex:ObjectId("64f1a8c2e4b9c7")
        
        let result = await db().collection("users").deleteOne({_id: id})
        if(result.deletedCount == 1){
            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        }else{
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


module.exports = { 
    addUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser
 }; 