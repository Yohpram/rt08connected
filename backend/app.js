const express = require('express');
const cors = require("cors");
const app = express();
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const productRoutes = require('./routes/produk');
const orderRoutes = require("./routes/order");
const surketRoutes = require('./routes/surket');
const pesanRoutes = require('./routes/pesan')

app.use(express.json());

app.use(
    cors({
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token",
      methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      optionsSuccessStatus: 200,
    })
  );
  

app.use("/uploads", express.static("uploads"));
app.use('/', userRoutes);
app.use('/', reviewRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', surketRoutes);
app.use('/', pesanRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
