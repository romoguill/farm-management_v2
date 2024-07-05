import { z } from 'zod';

// ++++++ EXTERNAL API SCHEMAS ++++++

export type MarketData = {
  dateTime: string;
  symbol: string;
  settlement: number;
  high: number;
  low: number;
  open: number;
  close: number;
  openInterest: number;
  openInterestChange: number;
  change: number;
  changePercent: number;
  volume: number;
  tradeCount: number;
  impliedRate: number | null;
  previousClose: number;
  unitsOpenInterest: number;
  unitsOpenInterestChange: number;
  unitsVolume: number;
  optionType: string | null;
  strikePrice: number | null;
  underlying: string | null;
  product: string;
};

const symbolAPISchema = z.union([
  z.literal('SOJ Dolar MATba'),
  z.literal('MAI Dolar MATba'),
  z.literal('TRI Dolar MATba'),
  z.literal('SOJ Pesos MATba'),
  z.literal('MAI Pesos MATba'),
  z.literal('TRI Pesos MATba'),
]);
export type SymbolAPI = z.infer<typeof symbolAPISchema>;

export const marketApiQueryDTO = z.object({
  product: symbolAPISchema,
  underlying: z.string().optional(),
  symbol: z.string().optional(),
  type: z.union([z.literal('FUT'), z.literal('OPT')]),
  segment: z.literal('Agropecuario'),
  excludeEmptyVol: z.coerce
    .string()
    .refine((val) => val === 'true' || val === 'false'),
  from: z.string().date(),
  to: z.string().date(),
  sortDir: z.union([z.literal('ASC'), z.literal('DESC')]),
  market: z.literal('ROFX'),
});
export type MarketApiQueryDTO = z.infer<typeof marketApiQueryDTO>;

// ++++++ INTERNAL API SCHEMAS ++++++

export const grainSchema = z.enum(['SOY', 'CORN', 'WHEAT']);
export type Grain = z.infer<typeof grainSchema>;

export const marketPlaceSchema = z.enum(['ROSARIO', 'CHICAGO']);
export type MarketPlace = z.infer<typeof marketPlaceSchema>;

export const derivativeSchema = z.enum(['FUTURE', 'OPTION']);
export type Derivative = z.infer<typeof derivativeSchema>;

export const currencySchema = z.enum(['PESO', 'DOLAR']);
export type Currency = z.infer<typeof currencySchema>;

export const marketQuerySchema = z
  .object({
    grain: grainSchema,
    marketPlace: marketPlaceSchema,
    settlement: z.date(),
    derivative: derivativeSchema,
    currencyRef: currencySchema,
    from: z.date(),
    to: z.date(),
  })
  .refine((data) => data.from <= data.to);

export type MarketDataQueryDTO = z.infer<typeof marketQuerySchema>;
