// Require sequelize and link config file.
var Sequelize = require('sequelize');
var config = require('../config/config.json');
var sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test connection to database
sequelize.authenticate()
         .then(() => {
           console.log('Connection has been established successfully.');
         })
         .catch(err => {
           console.error('Unable to connect to the database:', err);
         });
       
var burger = sequelize.define("burgers", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  burger_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  devoured: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

burger.sync({ force: true }).then(function() {
  console.log('Table synced');
  burger.bulkCreate([
    { burger_name: 'Bacon Cheeseburger' },
    { burger_name: 'Southwest Chili Burger' },
    { burger_name: 'Breakfast Burger' },
    { burger_name: 'Swiss and Mushroom Burger' },
    { burger_name: 'Triple Cheese Burger' }
  ]) 
});


module.exports = burger;