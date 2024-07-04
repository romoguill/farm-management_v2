import {
  MarketApiQueryDTO,
  MarketDataQueryDTO,
  currencySchema,
  derivativeSchema,
  grainSchema,
  marketPlaceSchema,
} from 'src/validation-schemas';

export const parseMarketDataQuery = (
  query: MarketDataQueryDTO,
): MarketApiQueryDTO => {
  const parseGrain = {
    [grainSchema.enum.SOY]: 'SOJ',
    [grainSchema.enum.CORN]: 'MAI',
    [grainSchema.enum.WHEAT]: 'TRI',
  } as const;

  const parseCurrency = {
    [currencySchema.enum.PESO]: 'Pesos',
    [currencySchema.enum.DOLAR]: 'Dolar',
  } as const;

  const product = `${parseGrain[query.grain]} ${
    parseCurrency[query.currencyRef]
  } MATba` as const;

  const parseMarketPlace = {
    [marketPlaceSchema.enum.ROSARIO]: 'ROS',
    [marketPlaceSchema.enum.CHICAGO]: 'CME',
  };

  const parseDerivative = {
    [derivativeSchema.enum.FUTURE]: 'FUT',
    [derivativeSchema.enum.OPTION]: 'OPT',
  } as const;

  const getUnderlingToken = () => {
    const date = new Date(query.settlement);

    // Get month in MMM spanish format
    const formatterMonth = new Intl.DateTimeFormat('es', {
      month: 'short',
      timeZone: 'UTC',
    });

    const monthOfSettlement = formatterMonth.format(date);

    const formatterYear = new Intl.DateTimeFormat('es', {
      year: '2-digit',
      timeZone: 'UTC',
    });
    const yearOfSettlement = formatterYear.format(new Date(query.settlement));

    return `${parseGrain[query.grain]}.${
      parseMarketPlace[query.marketPlace]
    }/${monthOfSettlement.toUpperCase()}${yearOfSettlement}`;
  };

  return {
    product,
    underlying: getUnderlingToken(),
    type: parseDerivative[query.derivative],
    segment: 'Agropecuario',
    excludeEmptyVol: 'true',
    from: query.from.toUTCString(),
    to: query.to.toUTCString(),
    sortDir: 'ASC',
    market: 'ROFX',
  };
};
