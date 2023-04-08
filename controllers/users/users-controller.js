// Retrieves the list of all users from the server and is mapped to the HTTP endpoint /api/users.

import people from './users.js'
let users = people

const UserController = (app) => {   // use express instance app to declare HTTP GET
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById);   // map path pattern to handler function
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

// Handle requests in query string parameters

const findUsers = (req, res) => {
    const type = req.query.type     // retrieve type parameter from query
    if(type) {                      // if type parameter in query
        const usersOfType = users.filter(u => u.type === type) // find users of that type
        res.json(usersOfType)       // respond with users of that type
        return                      // return so it doesn't continue
    }
    res.json(users)                 // otherwise respond with all users
}

const findUserById = (req, res) => {    // function called if URL matches pattern
    const userId = req.params.uid;      // get uid from request parameter map
    const user = users.find(u => u._id === userId); // find user in users array whose _id matches userId retrieved from params
    res.json(user); //respond to client with user found
}

const createUser = (req, res) => {  // function invoked if URL matches pattern
    const newUser = req.body;   // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + '';  // add an _id property with unique timestamp
    users.push(newUser);    // append new user to users array
    res.json(newUser);      // respond with new user to client
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];   // get user ID from path parameter uid
    users = users.filter(usr => usr._id !== userId);    // find the user based on the id and filter it out
    res.sendStatus(200);     // respond with success code
}

const updateUser = (req, res) => {  // handle PUT /api/users/:uid
    const userId = req.params['uid'];   // get user ID from path
    const updates = req.body;   // BODY includes updated fields
    users = users.map((usr) =>  // create a new array of users
        usr._id === userId ?        // if current user's ID matches ID we want to update
            {...usr, ...updates} :  // merge old usr with new updates
            usr                     // otherwise keep the old user
    );
    res.sendStatus(200);            // return OK
}



export default UserController