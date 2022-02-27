const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const { PORT } = require("./config");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})