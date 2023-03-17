const { Sequelize ,DataTypes } = require('sequelize');
// Import Sequelize and the database connection
const sequelize = require('../db/db_connexion');
// const express = require("express");
// const app = express() ;

// Annonce Model
const Annonce = sequelize.define('Annonces', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prestation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urgence: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false
  },
  secteur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  }

});

Annonce.sync()
.then(() => {
  console.log('Annonces table created successfully.');
})
.catch((error) => {
  console.error('Error creating Annonces table:', error);
});


module.exports = Annonce;
