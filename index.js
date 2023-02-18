const mongoose = require('mongoose');
require("./connect/db");
const express = require('express');
const app = express();
const cors = require('cors');
const User = require("./models/usermodel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const session = require('express-session');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {

    console.log(req.body);
    try {

        const newPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        });
        res.json({ status: 'ok' });

    } catch (error) {
        res.json({ status: 'error', error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {

        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, 'SecretkeyHere')

        res.json({ status: 'ok', user: token });
    } else {
        res.json({ status: 'error', user: false });
    }
});

app.listen(port, () => {
    console.log('Server started on port 3000');
});