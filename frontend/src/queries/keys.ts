export const enum QueryKeyPrefix {
  // Existing prefixes...
  getConversionRate = "getConversionRate",
}

export const SimpleQueryKey = {
  // Existing keys...
  getConversionRate: [QueryKeyPrefix.getConversionRate],
} as const;

// If you need to create factory functions for dynamic keys (not needed here)
export const QueryKeyFactory = {
  // Existing factory functions...
};
