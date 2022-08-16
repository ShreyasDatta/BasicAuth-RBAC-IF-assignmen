const {
    serverCheck,
    signup,
    signin,
    getusers,
    getuser,
    updateuser,
    studentCreate
} = require("./controller");
const {
    allowifloggedin,
    grantAccess
} = require("./middleware");

const router = require("express").Router();

router.get("/check", serverCheck);

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/getuser/:userId", allowifloggedin, getuser);

router.get("/getusers", allowifloggedin, grantAccess('readAny', 'profile'), getusers);

router.put("/updateuser/:userId", allowifloggedin, grantAccess('updateAny', 'profile'), updateuser);

router.post("/student", allowifloggedin, grantAccess('createOwn', 'profile'), studentCreate);


module.exports = router;