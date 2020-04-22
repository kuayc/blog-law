const bcrypt = require("bcryptjs");

module.exports = {
  //async and await allow for a function to run asynchronously. Without this, the variables 'user' and 'newUser' would always be undefined because the code would not wait for the response from the database queries.
  register: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");

    //checks if a user exists with the given email in the database, and if one does, returns that to the user letting them know that email is already in the database.
    let user = await db.check_user(email);
    //console.log(user)
    if (user[0]) {
      return res.status(400).send("User already exists");
    }

    //salt is a random set of characters that will be added to a password before the password is hashed. This adds extra security to the password. genSaltSync takes an argument for how many characters long you would like the salt to be. The larger the number, the less performant the app; 10 is plenty secure.
    let salt = bcrypt.genSaltSync(10);

    //hashSync will combine the given password and salt(hashSyncs' two arguments), and then hash them. This hash is what will be put into the password column of the users table.
    let hash = bcrypt.hashSync(password, salt);

    //This query will insert the new user into the database, and will return the users id and email to be placed on a session.
    let newUser = await db.register_user({ email, password: hash });
    //console.log(newUser)

    //This code creates a 'user' property on the session object, and sets it equal to the newly created user.
    req.session.user = newUser[0];

    //The user on session gets sent client-side, to be used for increased functionality on the front end.
    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");

    //This query will check if a user exists in the database. If a user does not exist, a response is sent to the client-side, letting the user know that the given email does not exist in the database.
    let user = await db.check_user(email);
    if (!user[0]) {
      //return is REQUIRED here for both login and register to kill the function so it doesn't continue running.
      return res.status(400).send("User does not exist");
    }

    //If the user exists in the database, use compareSync to compare the given password with the hashed password recieved from the database. This is done by passing both into compareSync. compareSync will return a boolean(true or false).
    const authenticated = bcrypt.compareSync(password, user[0].password);

    //If compareSync returns false, then a response needs to be sent to the user to let them know the password is incorrect. This is done below.
    if (!authenticated) {
      return res.status(400).send("Password is incorrect");
    }

    //If the user has been authenticated, you will need to delete the password from the user object recieved from the database. Passwords should NEVER be sent to the client-side.
    delete user[0].password;

    //Place the users object on the session
    req.session.user = user[0];

    //Send the users session to the client-side
    res.status(202).send(req.session.user);
  },
  logout: (req, res) => {
    //Logout just needs to remove the users object from the session. This is done with the built-in destroy method.
    req.session.destroy();

    //Send a status letting the client-side know the request was done successfully.
    res.sendStatus(200);
  },
};
