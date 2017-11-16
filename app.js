//=================
//Modules
//=================


const express = require ('express')
const bodyParser = require ('body-parser')
const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.json());

//=================
//RESTAURANT MODEL
//=================

const restaurant = new Sequelize('postgres://@localhost:5432/restaurant');

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

//=================
//ROUTES
//=================

app.get ('/restaurants', function(request, response){
  Restaurant.findAll().then(restaurants => {
    response.send(restaurants);
  });
});

app.put ('/restaurants/:id', function(request, response){
  let restaurantId = Number(request.params.id)

  Restaurant.findById(restaurantId)
  .then(restaurant => {
    restaurant.update(request.body, { fields: Object.keys(request.body) })
    .then(() => response.status(202).send(restaurant))
    .catch((error) => response.status(400).send("Looks like there was an error updating the restaurant! + " + error))
  })
  .catch((error) => response.status(404).send('Sorry! Restaurant not found! ' + error));

});

app.delete('/restaurants', function(req, res) {
    return Restaurant.destroy({
        where: {name: any}
      })
      .then(success => [
        User.Restaurant().then(users => {
            res.send(restaurants);
        })

      ])

})

app.listen(3000, () => {
  console.log('Hi!! You are on port 3000!')
})
