require('dotenv').config();

const express = require('express');
const carRoute =  require('./app/routes/carRoute')

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(carRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});