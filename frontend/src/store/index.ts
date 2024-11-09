import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { ConversionRate } from "../types";

interface StoreState {
  conversionRates: ConversionRate[];
  setConversionRates: (
    updater: (prevRates: ConversionRate[]) => ConversionRate[]
  ) => void;
}

// Extend PersistOptions to include serialize and deserialize
type CustomPersistOptions = PersistOptions<StoreState> & {
  serialize?: (state: unknown) => string;
  deserialize?: (str: string) => unknown;
};

// Create the store with Zustand's `persist` middleware
const useStore = create<StoreState>()(
  persist<StoreState>(
    (set) => ({
      conversionRates: [],
      setConversionRates: (updater) =>
        set((state) => {
          const updatedRates = updater(state.conversionRates);
          // Optionally limit the array size
          const limitedRates = updatedRates.slice(-100);
          return { conversionRates: limitedRates };
        }),
    }),
    {
      name: "conversion-rate-store",
      serialize: (state) => JSON.stringify(state), // Use JSON.stringify
      deserialize: (str) => JSON.parse(str), // Use JSON.parse
    } as CustomPersistOptions
  )
);

export default useStore;
