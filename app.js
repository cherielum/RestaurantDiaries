//=================
//adding CONSTs
//=================


const express = require ('express')
const bodyParser = require ('body-parser')
const Sequelize = require('sequelize');

const app = express(); 


//=================
//RESTAURANT MODEL 
//=================

const restaurant = new Sequelize('postgres://Cherie:@localhost:5432/restaurant');

restaurant.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Restaurant = restaurant.define('restaurant', {
    name: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER
    },
    review: {
      type: Sequelize.STRING
    },
    wouldYouGoBack: {
      type: Sequelize.BOOLEAN
    },
    category: {
      type: Sequelize.STRING
    },
     type: {
      type: Sequelize.STRING
    },
     lastVisted: {
      type: Sequelize.DATE
    },
     cleanBathroom: {
      type: Sequelize.BOOLEAN
    }
  });

  Restaurant.sync().then(() => {
  // Table created
  return Restaurant.create({
    name: 'Chipotle',
    rating: '3',
    review: 'The rice bowl rocks!!! ',
    wouldYouGoBack: true,
    category: 'Fast Casual',
    type: 'Mexican',
    lastVisted: '2017-11-13',
    cleanBathroom: true
  });
});

// Restaurant.findAll().then(restaurants => {
//   console.log(restaurants)
// });

 app.get ('/restaurants', function(request, response){
    Restaurant.findAll().then(restaurants => {
      response.send(restaurants);
    });
 });


app.listen(3000, () => {
  console.log('Hi!! You are on port 3000!')
})