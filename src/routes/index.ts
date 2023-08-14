import{Router} from 'express';
import usersRouter from './user.routes';

const routes =Router();

routes.use('/users',usersRouter);
routes.use('/users/login',usersRouter);
routes.use('users/register',usersRouter);
routes.use('users/details/:id',usersRouter);

export default routes;