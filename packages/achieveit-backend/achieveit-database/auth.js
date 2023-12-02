const mongoose = require('mongoose');
const { User } = require('./schemas.js');
const service = require('./service.js');
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

async function registerUser(req, res) {
    const { username, pwd } = req.body;

    if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data.");
    } else {
        let result;
        try {
            result = await service.findUser(username);
        } catch (error) {
            //console.log(error);
            res.status(409).send("Username already taken");
        }

        if (result[0].username == username) {
            res.status(409).send("Username already taken");
        } else {
            bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
                generateAccessToken(username).then((token) => {
                    // Add to the db
                    User.create({ username: username, password: hashedPassword });
                    res.status(201).send({ token: token });
                });
            });
        }
    }
}

function generateAccessToken(username) {

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

async function loginUser(req, res) {
    const { username, pwd } = req.body;

    let retrievedUser;
    try {
        const result = await service.findUser(username);
        retrievedUser = result[0];
    } catch (error) {
        console.log(error);
    }

    if (!retrievedUser) {
        // Invalid username
        console.log("INVALID USERNAME");
        res.status(401).send("Unauthorized");
    } else {
        bcrypt
            .compare(pwd, retrievedUser.password)
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
