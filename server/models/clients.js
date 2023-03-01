const { Sequelize ,DataTypes } = require('sequelize');
// Import Sequelize and the database connection
const sequelize = require('../db/db_connexion');
// const express = require("express");
// const app = express() ;

// Client Model
const Client = sequelize.define('Clients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    selectedOption: {
      type: DataTypes.STRING,
      allowNull: false

    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  // Create the Table in psql

  Client.sync()
  .then(() => {
    console.log('Client table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

//



  module.exports = Client


