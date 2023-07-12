"use strict";
const AWS = require("aws-sdk");
var Personaje = require("./models/Personaje.js");
var fn = require('./functions/functions.js')

module.exports.getCharactersFromDB = async (event) => {
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
        const character = await fn.findCharacter(item.characterId);
        const homeworld = await fn.findHomeWorld(character.homeworld);
        const movies = await fn.findMovies(character.films);
        const species = await fn.findSpecies(character.species);
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
          movies,
          species,
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
