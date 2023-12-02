const mongoose = require('mongoose');
const { User } = require('./schemas.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.set('debug', true);

const serverLocations = require('./server-locations.json');
let serverUrl = serverLocations['database'];
mongoose
    .connect(serverUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

const creds = [];

function registerUser(req, res) {
    console.log("REGISTER");
    const { username, pwd } = req.body;

    console.log(username);
    console.log(pwd);

    if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data.");
    } else if (creds.find((c) => c.username === username)) {
        res.status(409).send("Username already taken");
    } else {
        bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
                generateAccessToken(username).then((token) => {
                    // Add to the db
                    console.log("GENERATED TOKEN");
                    User.create({ username: username, password: hashedPassword });
                    console.log(token);
                    creds.push({username: username, hashedPassword: hashedPassword});
                    res.status(201).send({ token: token });
                });
            });
    }
}

function generateAccessToken(username) {
    console.log("GENERATING TOKEN");
    console.log(process.env.REACT_APP_TOKEN_SECRET);

    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.REACT_APP_TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log(process.env.REACT_APP_TOKEN_SECRET);

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(
            token,
            process.env.REACT_APP_TOKEN_SECRET,
            (error, decoded) => {
                if (decoded) {
                    next();
                } else {
                    console.log("JWT error:", error);
                    res.status(401).end();
                }
            }
        );
    }
}

// async function findUser(username) {
//     let promise = User.find({ username: username });
//     return promise;
// }

function loginUser(req, res) {
    const { username, pwd } = req.body;
    const retrievedUser = creds.find((c) => c.username === username);

    // User.find({ username: username }, (error, data) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log(data);
    //     }
    // });

    // let retrievedUser = await findUser(username);

    console.log("LOGIN: " + username);
    console.log("LOGIN: " + pwd);
    // console.log(retrievedUser);
    // console.log("LOGIN: " + retrievedUser.password);

    if (!retrievedUser) {
        // Invalid username
        console.log("INVALID USERNAME");
        res.status(401).send("Unauthorized");
    } else {
        bcrypt
            .compare(pwd, retrievedUser.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(username).then((token) => {
                        res.status(200).send({ token: token });
                    });
                } else {
                    // Invalid password
                    console.log("INVALID PASSWORD");
                    res.status(401).send("Unauthorized");
                }
            })
            .catch(() => {
                console.log("INVALID ERROR");
                res.status(401).send("Unauthorized");
            });
    }
}

module.exports = {
    registerUser,
    authenticateUser,
    loginUser
};
