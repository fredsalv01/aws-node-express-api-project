const serverless = require("serverless-http");
const express = require("express");
const app = express();
const axios = require("axios").default;

// users model
class Personaje {
  constructor(id, nombre, genero, altura, peso, biography = null) {
    this.id = id;
    this.nombre = nombre;
    this.genero = genero;
    this.altura = altura;
    this.peso = peso;
    this.biography = biography;
  }
}

app.get("/", async (req, res, next) => {
  const { search, page = 1 } = req.query;
  try{
    const { data } = await axios.get(
    `https://swapi.py4e.com/api/people/?search=${search}&page=${page}`
    );
    const characters = (data?.results).map((item, index) => {
      const id = Number(item.url.split("/", 6)[5]);
      return new Personaje(id, item.name, item.gender, item.height, item.mass);
    });
    
    const totalItems = characters.length;
    
    return res.status(200).json({pagina: page, totalPorPagina: totalItems, personajes: characters});
  }catch(error){
    return res.status(500).json(error);
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
