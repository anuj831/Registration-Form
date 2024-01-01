const express = require("express");
const app = express();
require('./db/db'); // Require the database connection file

const port = 3200;
const path = require('path');
const empCollection = require('./models/model');
const template_path = path.join(__dirname, "../template/views/");

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', template_path);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/empdata', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const { name, email, phone } = req.body;

            // Ensure the email field is present and not empty
            if (!email) {
                return res.status(400).send("Email is required");
            }

            const existingUser = await empCollection.findOne({ email });

            if (existingUser) {
                // Redirect to the login page if the email already exists
                return res.redirect('/login');
            }

            const empData = new empCollection({
                name,
                email,
                phone,
                Password: password,
                cPassword: cpassword,
            });

            const postData = await empData.save();
            res.send(postData);
        } else {
            res.send("Passwords do not match");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    console.log(`listening to the port: ${port}`);
});
