const { body, validationResult } = require('express-validator');

const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;
app.use(cors());

//available routes

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});