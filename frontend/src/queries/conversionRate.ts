import { useQuery } from "@tanstack/react-query";
import { getConversionRate } from "../services/conversionRate";
import { IGetConversionRateRes, ServerError } from "../types";
import { SimpleQueryKey } from "./keys";

export function useGetConversionRate() {
  return useQuery<IGetConversionRateRes, ServerError>({
    queryKey: SimpleQueryKey.getConversionRate,
    queryFn: getConversionRate,
    staleTime: 0, // Data is considered stale immediately
    refetchInterval: 5000, // Refetch every 5000 milliseconds (5 seconds)
    refetchOnWindowFocus: true, // Refetch when window gains focus
    notifyOnChangeProps: "all",
  });
}
