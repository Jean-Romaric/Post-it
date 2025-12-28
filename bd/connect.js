//(1)
const mongodb = require("mongodb");//Charge le module MongoDB officiel depuis node_modules, Ce module retourne un objet, dans lequel se trouveent =>MongoClient: function MongoClient() {},ObjectId: function ObjectId() {}, Db: function Db() {},Collection: function Collection() {}
const _MongoClient = mongodb.MongoClient; //On extrait la classe MongoClient de l’objet mongodb
require('dotenv').config();

const client = new _MongoClient(process.env.MONGO_URI);//new MongoClient() = instance de la classe MongoClient
let conn;

async function connecter() {
    try {
        conn = await client.connect();
        console.log("Connexion à MongoDB réussie");
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error);
        process.exit(1); //Arrête immédiatement le programme Node.js, 1 = arrêt à cause d’une erreur
    }
}
// db  = require("../bd/connect") db.db() 
function db() {
    if (!conn) {
        throw new Error("La base de données n'est pas connectée"); //Si quelqu’un essaie d’accéder à la DB sans connexion → STOP
    }
    return conn.db("post-it");//accès à la base post-it, Cette ligne retourne un objet Database, Database {name: databaseName: 'post-it'}
}
 
async function fermerConnexion() {
    if (conn) {
        await conn.close();
        console.log("Connexion MongoDB fermée");
    }
}

module.exports = { connecter, db, fermerConnexion };
