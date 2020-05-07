import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initalizeDb from '../db';
import user from '../controller/user';
import account from '../controller/account';
import rating from '../controller/rating';

let router = express();

//connect to db
initalizeDb(db => {

  //internal middleware
  router.use(middleware({ config, db }));

  router.use('/account', account({ config, db }))
  router.use('/user', user({ config, db }))
  router.use('/rating', rating({ config, db }))
});

export default router;
