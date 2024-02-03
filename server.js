const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Utilisez la méthode MongoClient pour créer un client MongoDB
const client = new MongoClient("mongodb+srv://nicolasbabybrawl:PsnIkWGzkXsrdnL5@babybrawl.aod6irz.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware pour analyser le corps des requêtes en JSON
app.use(bodyParser.json());

// Route pour servir la page HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route pour ajouter un nouveau film ou une série
app.post('/addMovie', async (req, res) => {
  try {
    // Connectez-vous avec le client MongoDB
    await client.connect();

    const database = client.db("Films_dataBase");
    const collection = database.collection("Films");

    // Récupérer les données du corps de la requête
    const { title, image, link, tag, description, type, episode } = req.body;

    // Créer un nouvel objet film
    const newMovie = {
      title: title,
      image: image,
      link: link,
      tag: tag,
      description: description,
      type: type,
      episode: type === 'serie' ? episode : undefined, // Ajoutez l'épisode uniquement si le type est une série
    };

    // Ajouter le nouveau film ou série à la base de données
    const result = await collection.insertOne(newMovie);

    res.status(201).json({ message: "Film ou série ajouté avec succès", movie: result.ops[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout du film ou de la série" });
  } finally {
    // Fermez la connexion après l'opération
    await client.close();
  }
});

// Serveur écoute sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
