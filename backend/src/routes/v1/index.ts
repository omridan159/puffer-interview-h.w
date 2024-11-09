import express, { Router } from 'express';
import conversionRate from './conversionRate.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/conversionRate',
    route: conversionRate,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
