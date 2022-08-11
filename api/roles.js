const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("supervisor")
        .extend("basic")
        .readAny("profile")

    ac.grant("admin")
        .extend("basic")
        .extend("supervisor")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
})();

// User

//     User / Sign up (no scope needed)
//     User / Sign in (no scope needed)
//     User / Get All (user-get)
//     User / Get Single (user-get)

// Role

//     Role / Create (no scope needed)
//     Role / Get All (role-get)

// Student

//     Student / Create (student-create)
//     Student / Get All (student-get)

// School

//     School / Create (school-create)
//     School / Get All (school-get)
//     School / Get Students (school-students)