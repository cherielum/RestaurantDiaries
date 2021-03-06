//=================
//Modules
//=================


const express = require ('express');
const bodyParser = require ('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'))

//=================
//RESTAURANT MODEL
//=================

// const restaurant = new Sequelize('postgres://@localhost:5432/restaurant');
// const restaurant = new Sequelize('http://localhost:3000/restaurants');
const restaurant = new Sequelize("postgres://Cherie:@localhost:5432/restaurant");

// restaurant.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

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
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zipcode: {
      type: Sequelize.STRING
    }
  });

  // const Restaurant = restaurant.define('restaurant', {
  //   name: {
  //     type: Sequelize.STRING
  //   },
  //   rating: {
  //     type: Sequelize.INTEGER
  //   }
  // });

  // force: true will drop the table if it already exists
  Restaurant.sync({force: false}).then(() => {
  // Table created
  /* return Restaurant.create({
    name: 'Chipotle',
    rating: '3',
    review: 'The rice bowl rocks!!! ',
    wouldYouGoBack: true,
    category: 'Fast Casual',
    type: 'Mexican',
    lastVisted: '2017-11-13',
    cleanBathroom: true,
    city: 'Atlanta',
    state: 'GA',
    zipcode: '30326',
  }); */
});

//=================
//ROUTES
//=================

app.get ('/restaurants', function(request, response){
  Restaurant.findAll({order: [['createdAt', 'DESC']]}).then(restaurants => {
    console.log(restaurants);
    response.send(restaurants);
  });
});

app.post('/restaurants', function(request, response){
 let newRestaurant = request.body;

 Restaurant.create ({
  name: newRestaurant.name,
  rating: newRestaurant.rating,
  review: newRestaurant.review,
  wouldYouGoBack: newRestaurant.wouldYouGoBack,
  category: newRestaurant.category,
  type: newRestaurant.type,
  lastVisited: newRestaurant.lastVisited,
  cleanBathroom: newRestaurant.cleanBathroom,
  city: newRestaurant.city,
  state: newRestaurant.state,
  zipcode: newRestaurant.zipcode
  }).then(restaurant => {
  response.json(restaurant.toJSON())
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
        where: {}
      })
      .then(success => [
        Restaurant.findAll().then(restaurant => {
            res.send(restaurant);
        })

      ])

})

app.delete('/restaurants/:uid', function(req, res) {
    let requestID = req.params.uid;
    if (isNaN(requestID)) {
      throw ("NaN!");

    }
    return Restaurant.destroy({
        where: {id: requestID}
      })
      .then(success => [
        Restaurant.findAll().then(restaurant => {
            res.send(restaurant);
        })

      ])

})

app.listen(3000, () => {
  console.log('Hi!! You are on port 3000!')
})
