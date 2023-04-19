const express = require("express");
const axios = require("axios");
const cors = require("cors");
const newsRouter = require('./routes/News');


const app = express();
app.use(cors());
app.use('/api/news/content', newsRouter);


// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});