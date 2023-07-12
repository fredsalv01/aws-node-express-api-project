const serverless = require("serverless-http");
const express = require("express");
const app = express();
const axios = require("axios");

// users model
class Personaje {
  constructor(id, nombre, genero, altura, peso, biography=null) {
    this.id = id;
    this.nombre = nombre;
    this.genero = genero;
    this.altura = altura;
    this.peso = peso;
    this.biography = biography;
  }
}

app.get("/", async (req, res, next) => {
  const { search, page = 1 } = req.body;
  try {
    axios
      .get(`https://swapi.py4e.com/api/people/?search=${search}&page=${page}`)
      .then((response) => {
        console.log(response)
        return res.status(200).json(response);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
