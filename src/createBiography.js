"use strict";
const AWS = require("aws-sdk");
const { v4 } = require("uuid");

module.exports.createBiography = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { characterId, description } = JSON.parse(event.body);
  const primary_key = v4();
  const newBiography = {
    primary_key,
    characterId,
    description,
  }
  await dynamoDb.put({
    TableName: process.env.DYNAMODB_BIOGRAPHY_TABLE,
    Item: newBiography
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newBiography)
  };
};
