const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Exemple de données (simulation d'une base)
let users = [
  { id: 1, name: "Sara" },
  { id: 2, name: "Malaury" },
  { id: 3, name: "Yann" },
  { id: 4, name: "Océane" }
];

// Route GET
app.get("/users", (req, res) => {
  res.json(users);
});

// Route GET par id
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
});

// Route POST
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route PUT
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  
  user.name = req.body.name || user.name;
  res.json(user);
});

// Route DELETE
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "Utilisateur supprimé" });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
