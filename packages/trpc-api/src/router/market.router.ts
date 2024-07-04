import { createTRPCRouter, publicProcedure } from '../trpc';
import { parseMarketDataQuery } from '../utils/parse-market-query';
import { marketQuerySchema } from '../validation-schemas';

export const marketRouter = createTRPCRouter({
  getData: publicProcedure.input(marketQuerySchema).query(({ input }) => {
    const url = new URL(process.env.MARKET_API_BASE_URL!);

    const parsedQueryParams = new URLSearchParams(parseMarketDataQuery(input));

    url.search = parsedQueryParams.toString();

    console.log({ URL: url });
  }),
});
