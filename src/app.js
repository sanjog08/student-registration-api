const express = require("express");
require("./db/conn");
const Student  = require("./models/students");
const app = express();
const port = process.env.PORT  || 8000;

// to get data from the postman in our terminal
app.use(express.json());

// homepage
app.get('/', (req, res) => {
    res.send("API is running.....<br>24/7 API form Sanjog Singh, <br>You can do registration with this API.");
});

// create a new student
app.post("/student", async (req, res) => {

    console.log(req.body);
    let user;
    try{
        user = new Student(req.body);
        await user.save();
    }catch(err){
        console.log(err);
        res.status(404).send(err.message);
        return 
    }
    res.status(201).send(user);
});


// get method to display all data 
app.get("/students", async (req, res) => {

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch (err) {
        res.send(err);
    }

});


// to get a particular student data
app.get("/student/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);

        if (!studentData) {
            return res.status(404).send();
        }
        else {
            res.send(studentData);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


// to delete a student by id
app.delete("/delstudents/:id", async (req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(deleteStudent);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`server is listening at port number --> ${port} <--`);
});
