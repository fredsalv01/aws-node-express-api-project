"use strict";
const AWS = require("aws-sdk");
const axios = require("axios").default;
var Personaje = require("./models/Personaje.js");
var fn = require("./functions/functions.js");

module.exports.getCharactersFromApi = async (event) => {
  const { page } = event.pathParameters;
  const { data } = await axios.get(
    `https://swapi.py4e.com/api/people/?page=${page}`
  );
  const characters = await Promise.all(
    (data?.results).map(async (item) => {
      const id = Number(item.url.split("/", 6)[5]);
      const homeworld = await fn.findHomeWorld(item.homeworld);
      const movies = await fn.findMovies(item.films);
      const species = await fn.findSpecies(item.species);
      const { biography, ...rest } =  new Personaje(
        id,
        item.name,
        item.height,
        item.mass,
        item.hair_color,
        item.skin_color,
        item.eye_color,
        item.birth_year,
        item.gender,
        homeworld.name,
        movies,
        species,
        item.vehicles,
        item.starships
      );
      return rest
    })
  );

  return {
    totalElementos: data?.count,
    siguiente: data?.next,
    anterior: data?.previous,
    personajes: characters,
  };
};
