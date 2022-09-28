const User = require("../models/user-model")

const seedUser = new User({
    name: "Test",
    email: "Test@test.com",
    password: "$2a$12$376goZRkPm8xJHCXcDtIiegKsaK5eM8NrkQ9iK7BfKPOsN.Uoy.8q" // = Test, for bcrypt verify login
})

const seedDB = async () => {
    User.find({ name: "Test" }, (err, results) => {
        if (err)
            console.log("Something went wrong")
        if (!results.length) {
            seedUser.save()
        }
    })
}

module.exports = seedDB