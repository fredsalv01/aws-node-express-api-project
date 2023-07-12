"use strict"
const axios = require("axios").default;

exports.findCharacter = async (id) => {
  const { data } = await axios.get(`https://swapi.py4e.com/api/people/${id}`);
  return data;
};

exports.findHomeWorld = async (url) => {
  const { data } = await axios.get(`${url}`);
  return data;
};

exports.findMovies = async (movies) => {
  const moviesNames = await Promise.all(
    movies.map(async (movie) => {
      const { data } = await axios.get(`${movie}`);
      return data.title;
    })
  );
  return moviesNames;
};

exports.findSpecies = async (species) => {
  const speciesNames = await Promise.all(
    species.map(async (movie) => {
      const { data } = await axios.get(`${movie}`);
      return data.name;
    })
  );
  return speciesNames;
};
