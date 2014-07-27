// connect to our DB
Sequelize = require("sequelize");

var sequelize = new Sequelize("test", "eschoppik", "", {
      dialect: "postgres", 
      port:    5432, 
      logging: console.log
    });
 
sequelize.authenticate().complete(function(err) {
    if (err) {
      console.log('Unable to connect to the database:' + err);
    } else {
      console.log('Connection has been established successfully.');
    }
  });

module.exports = sequelize;
