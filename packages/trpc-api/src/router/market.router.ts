import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { parseMarketDataQuery } from '../utils/parse-market-query';
import { MarketData, marketQuerySchema } from '../validation-schemas';

interface MarketDataApiResponse {
  data: MarketData;
  error?: { message: string };
}

export const marketRouter = createTRPCRouter({
  getData: publicProcedure.input(marketQuerySchema).query(async ({ input }) => {
    const url = new URL(process.env.MARKET_API_BASE_URL!);

    const parsedQueryParams = new URLSearchParams(parseMarketDataQuery(input));

    url.search = parsedQueryParams.toString();

    try {
      const response = await fetch(url);

      const { data, error }: MarketDataApiResponse = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(`API failed with error: ${error?.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({ message: error.message, code: 'BAD_REQUEST' });
      }

      throw new TRPCError({
        message: 'Server Error',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
});
