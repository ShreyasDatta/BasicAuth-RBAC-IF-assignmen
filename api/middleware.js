const jwt = require("jsonwebtoken");
const {
    roles
} = require('./roles')

exports.allowifloggedin = async (req, res, next) => {
    //collecting header info for auth
    if (typeof req.headers.authorization !== "undefined") {
        //if we have auth header then return the authHeader token portion
    //else just return the undefined value into token
        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        jwt.verify(
            token,
            process.env.JWT_SECRET, {
                algorithm: "HS256"
            },
            (err, user) => {
                if (err) {
                    console.log(err);
                    //check if error, tell user they dont have access. Telling them token is no longer valid
                    return res.status(401).json({
                        error: "You need to be logged in to access this route"
                    });
                } else {
                    // console.log(user);
                    //transferring user details for futher user
                    req.user = user;
                    next(); //move on from middleware
                }
            }
        );
    } else {
        return res.status(401).json({
            error: "You need to be logged in to access this route"
        });
    }
};


exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        console.log(req.user);
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

// //list to store refreshTokens
// let refreshTokensStoreList = []

// //to check for refresh tokens with previous stored list tokens
// //if not null and found in list then Generate new access token and return it
// app.post('/token', (req, res) => {
//     const refreshTokenRecieved = req.body.token

//     if(refreshTokenRecieved == null) return res.sendStatus(401) //no refreshToken recieved

//     if(!refreshTokensStoreList.includes(refreshTokenRecieved)) return res.sendStatus(403)   //refreshToken not found in store list    
    
//     jwt.verify(refreshTokenRecieved, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
//         if(err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ name: user.name })
//         res.json({ accessToken: accessToken })  //only return name key
//     } )
// }
// )