const express = require('express');
const db = require('./config/db');

const app = express();

db.authenticate()
  .then(() => console.log('Database connected....'))
  .catch(err => console.log('Error' + err))

app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => res.send('API running'));

app.use('/api/user', require('./routes/api/user.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
app.use('/api/profile', require('./routes/api/profile.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));