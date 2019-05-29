const express = require('express');

const app = express();

app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => res.send('API running'));

app.use('/api/user', require('./routes/api/user.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
app.use('/api/desk', require('./routes/api/desk.route'));
app.use('/api/food', require('./routes/api/food.route'));
app.use('/api/order', require('./routes/api/order.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
