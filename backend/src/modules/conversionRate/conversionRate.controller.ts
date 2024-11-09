import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import * as conversionRateService from './conversionRate.service';

export const getConversionRate = catchAsync(async (_: Request, res: Response) => {
  const conversionRate = await conversionRateService.fetchConversionRate();
  res.status(httpStatus.OK).send({ conversionRate });
});
