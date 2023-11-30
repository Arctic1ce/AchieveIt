const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./achieveit-database/schemas').User;

function registerUser(req, res) {
    const {username, pwd} = req.body; // from form

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
                    console.log("Token:", token);
                    res.status(201).send({token: token});
                    // add to the db
                    User.create({username: username, password: hashedPassword});
                });
            });
    }
}

/* Generate a JWT with the username, encoded with the TOKEN_SECRET environment variable */
function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.TOKEN_SECRET,
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

/*
* Authenticate a user
* Return the username if authentication succeeds
* Otherwise, return an error
* Use this for API access in server.js to find the user
 */
function authenticateUser(token) {

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            (error, decoded) => {
                if (decoded) {
                    return decoded.username
                } else {
                    console.log("JWT error:", error);
                    res.status(401).end();
                }
            }
        );
    }
}

/* Login a user
*  Generate a JWT if authentication succeeds
*  Send the JWT as a cookie
*  Send the JWT as a response body (for testing purposes, delete this in production)
*  */
function loginUser(req, res) {
    const {username, pwd} = req.body; // from form
    const retrievedUser = creds.find(
        (c) => c.username === username
    );

    if (!retrievedUser) {
        // invalid username
        res.status(401).send("Unauthorized");
    } else {
        bcrypt
            .compare(pwd, retrievedUser.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(username).then((token) => {
                        // send the token as a cookie
                        res.cookie("token", token, {httpOnly: true, maxAge: 86400000});
                        res.status(200).send({token: token});
                    });
                } else {
                    // invalid password
                    res.status(401).send("Unauthorized");
                }
            })
            .catch(() => {
                res.status(401).send("Unauthorized");
            });
    }
}
