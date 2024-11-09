import { api } from "../api";
import { IGetConversionRateRes } from "../types";

/**
 * Fetches the conversion rate from the backend API.
 * @returns {Promise<IGetConversionRateRes>}
 */
export async function getConversionRate(): Promise<IGetConversionRateRes> {
  const response = await api.get<{
    conversionRate: number;
  }>("/conversionRate");
  return response.data;
}
