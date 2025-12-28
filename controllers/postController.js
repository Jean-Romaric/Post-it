const { Post } = require("../models/postModel")
const { db } = require("../bd/connect") // on importe la connexion a la bd du module connect.js,// db  = require("../bd/connect") db.db() 
const { ObjectId } = require("mongodb")//On extrait la classe ObjectId de l’objet mongodb


const addPost = async (req, res)=>{
    try{
        let _post = new Post(
            req.body.title,
            req.body.content,
            req.body.userId,
        );
        let result = await db().collection("posts").insertOne(_post);
        //console.log(req.body.title);
        console.log(_post);
        res.status(201).json({ message: "Post ajouté" });   
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getPosts = async (req, res)=>{
    try{
        let result = await db().collection("posts").find().toArray();
        console.log(result);
        res.status(200).json(result);   
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const getOnePost = async (req, res)=>{
    try{
        let id = new ObjectId( req.params.id);
        let result = await db().collection("posts").find({_id: id}).toArray();
        console.log("jk")
         if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }  

    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const updatePost = async (req, res)=>{
    try{
        let id = new ObjectId( req.params.id);// Conversion de la chaîne de caractères en ObjectId, ex:ObjectId("64f1a8c2e4b9c7")
        let nTitle = req.body.title;
        let nContent= req.body.content;
       
        let result = await db().collection("posts").updateOne(
            { _id: id },//Co ndition
            { $set: { title : nTitle, content: nContent  }}
        );
        if(result.modifiedCount == 1){
            res.status(200).json({ message: "Post mis à jour avec succès" });
        }else{
            res.status(404).json({ message: "Post non trouvé" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deletePost = async (req, res)=>{
    try{
        let id = new ObjectId( req.params.id);// Conversion de la chaîne de caractères en ObjectId, ex:ObjectId("64f1a8c2e4b9c7")
        let result = await db().collection("posts").deleteOne({ _id: id });
        if(result.deletedCount == 1){
            res.status(200).json({ message: "Post supprimé avec succès" });
        }else{
            res.status(404).json({ message: "Post non trouvé" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}   


module.exports = { addPost, getPosts, getOnePost, updatePost, deletePost }