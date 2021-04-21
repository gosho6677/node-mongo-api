const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const app = express();

let corsOptions = {
  origin: 'http://localhost:8081'
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to the db.`);
  })
  .catch(err => {
    console.log(`Can't connect to the db!`, err);
    process.exit();
  })

// initializing the routes with app
require('./app/routes/tutorial.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));