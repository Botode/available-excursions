export default async (app, opts, next) => {
  const { Excursion } = opts.models;
  Excursion.sync();

  app.get('/', async (request, reply) => {
    Excursion.findAll()
      .then((excursions) => {
        console.log(excursions);
        reply.code(200).send('OK');
      })
      .catch((err) => console.log(err));
  });

  app.get('/add', (request, reply) => {
    const data = {
      title: 'Экскурсия по загородным болотам',
      company: 'ООО Трынь-трава',
      picname: null,
      route: 'Остановка №2',
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

    Excursion.create(data)
      .then((excursion) => reply.redirect('/excursions'))
      .catch((err) => console.log(err));
  });

  next();
};

// export const autoPrefix = '/excursions';
