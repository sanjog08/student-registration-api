const mogoose = require("mongoose");

mogoose.connect("mongodb+srv://isanjog:database@cluster3.y8cuj7v.mongodb.net/students-api")
.then(() => {
    console.log("database connected😊");
}).catch((err) => {
    console.log("database not connected 😒");
    console.log(err.message)
});
