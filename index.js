const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  const agora = new Date().toLocaleString();
  console.log(`[${agora}] New request has been made: ${req.method} ${req.url}`);
  next();
});


const authMiddleware = require("./middleware/authMiddleware.j s");
const User = require("./Models/user.js");


const pratos = require('./Controllers/menu_do_dia');

const PORT = 4000;



mongoose.connect("mongodb+srv://pv33485:12345@ficha5.vaghoam.mongodb.net/restaurante?retryWrites=true&w=majority&appName=ficha5")
  .then(() => {
    console.log("Ligado ao MongoDB Atlas com Mongoose!");

    app.post("/register", async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.json(user);
      } catch (err) {
        res.status(400).json({ erro: "Erro ao criar utilizador: " + err.message });
      }
    });

    app.get("/private", authMiddleware, (req, res) => {
      res.send("Acesso autorizado! Bem-vindo, " + req.user.username);
    });

  
    app.use("/pratos", pratos);

    app.use((err, req, res, next) => {
      res.status(400).json({ erro: "Erro inesperado: " + err.message });
    });

    app.listen(PORT, () => {
      console.log("Restaurante QuintaDosCabrais a correr na porta", PORT);
    });
  })
  .catch(err => console.error("Erro ao ligar ao MongoDB:", err));
