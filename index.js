const express = require('express');
const {connection} = require('./db');
const app = express();
const cors = require('cors')
app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Digital Catalog !!');
});

const {userRoute} = require("./routes/userRoute");
const {productRoute} = require("./routes/productRoute");
const {supplierRoute} = require("./routes/supplierRoute");


app.use('/user', userRoute);
app.use('/supplier', supplierRoute);
app.use('/product', productRoute);


const port = process.env.PORT || 5000; 

app.listen(port, async () => {
  try {
    await connection;
    console.log('Connected to Database !!');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is live on port ${port}`);
});

