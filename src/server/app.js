import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import db from './config/db_old';
import excursions from './routes/excursions';

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ', err));

const publicPath = path.resolve(__dirname, '..', '..', 'dist');
const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.send('INDEX'));

// app.use(express.static(publicPath));
app.use('/excursions', excursions);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `MERN Boilerplate listening on port 3000 and looking in folder ${publicPath}`,
  );
});
