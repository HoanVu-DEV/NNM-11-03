const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
