
//=================
//RESTAURANT MODEL 
//=================

const sequelize = new Sequelize('postgres://Cherie:@localhost:5432/sequelize');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    }, 
    lastName: {
      type: Sequelize.STRING
    }
  });

  User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    }, 
    lastName: {
      type: Sequelize.STRING
    }
  });

  User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});





User.findAll().then(users => {
  console.log(users)
});