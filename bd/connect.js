//(1)
const { MongoClient } = require("mongodb");
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let conn;

async function connecter() {
    try {
        conn = await client.connect();
        console.log("Connexion à MongoDB réussie");
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error);
        process.exit(1);
    }
}

function db() {
    if (!conn) {
        throw new Error("La base de données n'est pas connectée");
    }
    return conn.db("post-it");
}

async function fermerConnexion() {
    if (conn) {
        await conn.close();
        console.log("Connexion MongoDB fermée");
    }
}

module.exports = { connecter, db, fermerConnexion };
