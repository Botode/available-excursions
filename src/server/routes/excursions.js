// import fastify from 'fastify';
// import db from '../config/db_old';
import Excursion from '../models/Excursion';

// const router = express.Router();

export default async (app) => {
  app.get('/excursions', (req, res) =>
    Excursion.findAll()
      .then((excursions) => {
        console.log(excursions);
        res.sendStatus(200);
      })
      .catch((err) => console.log(err)),
  );

  app.get('/excursions/add', (req, res) => {
    const data = {
      title: 'Экскурсия по загородным болотам',
      company: 'ООО Трынь-трава',
      picname: null,
      route: 'Остановка №1',
      excursionDate: new Date(),
      excursionDuration: 3,
      price: 358.22,
      excursionType: 'Обзорная',
      minVisitors: 6,
      maxVisitors: 66,
      categoryVisitors: 'От 16 и старше',
      template: 'Нету',
      recordVisitors: 33,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi deleniti dolores quos libero. Dolorem quasi ipsa tenetur at. Adipisci.',
      responsible: 'Охранник',
      guide: 'Дворецкий',
    };

    const {
      title,
      company,
      picname,
      route,
      excursionDate,
      excursionDuration,
      price,
      excursionType,
      minVisitors,
      maxVisitors,
      categoryVisitors,
      template,
      recordVisitors,
      description,
      responsible,
      guide,
    } = data;

    Excursion.create({
      title,
      company,
      picname,
      route,
      excursionDate,
      excursionDuration,
      price,
      excursionType,
      minVisitors,
      maxVisitors,
      categoryVisitors,
      template,
      recordVisitors,
      description,
      responsible,
      guide,
    })
      .then((excursion) => res.redirect('/excursions'))
      .catch((err) => console.log(err));
  });
};
