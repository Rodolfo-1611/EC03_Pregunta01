const express = require('express');
const app = express();
const productsRoute = require('./routes/products');

app.use(express.json());
app.use('/productos', productsRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
