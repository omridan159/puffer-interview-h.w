export interface ConversionRate {
  timestamp: Date;
  conversionRate: number;
}

export interface IGetConversionRateRes {
  conversionRate: number;
}

export type ServerError = {
  response: {
    data: {
      message: string;
      code: number;
      stack?: string;
    };
  };
};
