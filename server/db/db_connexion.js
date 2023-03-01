// New sequelize instance
const Sequelize = require('sequelize');
const sequelize = new Sequelize('clients', 'postgres', '123456789', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false,
    freezeTableName: true
  },
  logging:false
});
// synchronise the database
 sequelize.sync().then(() => {
 
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('An error occurred while synchronizing the models:', error);
  }); 
//

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) =>  console.error('Unable to connect to the database:', error));


  module.exports = sequelize;