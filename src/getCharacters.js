"use strict";
const AWS = require("aws-sdk");
const axios = require("axios").default;

// users model
class Personaje {
  constructor(
    id,
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    fecha_nacimiento,
    genero,
    planetaNatal,
    peliculas,
    especies,
    vehiculos,
    navesEspaciales,
    biography = null
  ) {
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.color_cabello = color_cabello;
    this.color_piel = color_piel;
    this.color_ojos = color_ojos;
    this.fecha_nacimiento = fecha_nacimiento;
    this.genero = genero;
    this.planetaNatal = planetaNatal;
    this.peliculas = peliculas;
    this.especies = especies;
    this.vehiculos = vehiculos;
    this.navesEspaciales = navesEspaciales;
    this.biography = biography;
  }
}

module.exports.getCharacters = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_BIOGRAPHY_TABLE,
  };
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const result = await dynamodb.scan(scanParams).promise();

    if (result.Count === 0) {
      return {
        statusCode: 404,
      };
    }

    const items = await Promise.all(
      result.Items.map(async (item) => {
        const character = await findCharacter(item.characterId);
        const homeworld = await findHomeWorld(character.homeworld);
        return new Personaje(
          item.characterId,
          character.name,
          character.height,
          character.mass,
          character.hair_color,
          character.skin_color,
          character.eye_color,
          character.birth_year,
          character.gender,
          homeworld.name,
          character.films,
          character.species,
          character.vehicles,
          character.starships,
          item.description
        );
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findCharacter = async (id) => {
  const { data } = await axios.get(`https://swapi.py4e.com/api/people/${id}`);
  return data;
};

const findHomeWorld = async (url) => {
  const { data } = await axios.get(`${url}`);
  return data;
};
