import {BigNumber} from 'bignumber.js';
import {SignedOrder} from '@0xproject/types';
export {SignedOrder} from '@0xproject/types';

export type UserOrderType = 'BUY' | 'SELL';
export type RadarOrderType = 'BID' | 'ASK';
export type RadarOrderState = 'OPEN' | 'EXPIRED' | 'CLOSED' | 'UNFUNDED';

export interface RadarToken {
  ID: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  zeroex_official: boolean;
  active: boolean;
  createdDate: string;
  quote: boolean;
}

export interface RadarMarket {
  id: string; // "ZRX-WETH",
  baseTokenAddress: string;
  quoteTokenAddress: string;
  baseTokenDecimals: number;
  quoteTokenDecimals: number;
  quoteIncrement: BigNumber; // analogous to the current "precision"
  displayName: string; // "ZRX/WETH",
  minOrderSize: BigNumber; // calculated min quote size based on current market rate
  maxOrderSize: BigNumber; // calculated max quote size based on current market rate
}

export interface RadarSignedOrder {
  orderHash: string;
  type: RadarOrderType;
  state: RadarOrderState;
  baseTokenAddress: string;
  quoteTokenAddress: string;
  remainingBaseTokenAmount: BigNumber; // Converted amount
  remainingQuoteTokenAmount: BigNumber; // Converted amount
  price: BigNumber;
  createdDate: BigNumber; // Unix timestamp
  signedOrder: SignedOrder;
}

export interface RadarLimitOrder {
  type: UserOrderType;
  quantity: BigNumber;
  price: BigNumber;
  expiration: BigNumber
}

export interface RadarMarketOrder {
  type: UserOrderType;
  quantity: BigNumber;
}

export interface RadarMarketOrderResponse {
  averagePrice: BigNumber;
  bestPrice: BigNumber;
  worstPrice: BigNumber;
  spread: BigNumber;
  orders: SignedOrder[];
}

export interface RadarOrderFeeResponse {
  makerFee: BigNumber;
  takerFee: BigNumber;
  feeRecipient: string;
  gasEstimate?: BigNumber;
}

export interface RadarTicker {
  transactionHash: string; // last trade tx hash
  price: BigNumber; // last trade price
  size: BigNumber; // last trade size (in quote)
  bid: BigNumber; // best bid
  ask: BigNumber; // best ask
  volume: BigNumber; // 24hr volume of market in quote
  timestamp: BigNumber // last trade time in unix time (seconds)
}

export interface RadarBook {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  bids: RadarSignedOrder[];
  asks: RadarSignedOrder[];
}

// Radar Candle
export interface Ohlc {
  open: BigNumber;
  high: BigNumber;
  low: BigNumber;
  close: BigNumber;
}

export interface RadarCandle extends Ohlc {
  startBlock: number;
  startBlockTimestamp: number;
  endBlock: number; // the last block included in this candle (inclusive)
  endBlockTimestamp: number;
  baseTokenAddress: string;
  baseTokenVolume: BigNumber;
  quoteTokenAddress: string;
  quoteTokenVolume: BigNumber;
}

// Radar Events utilized by the Websocket Endpoint
export interface RadarEvent {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  order: RadarSignedOrder;
}

export interface RadarFill extends RadarEvent {
  transactionHash: string;
  blockNumber: number;
  maker: string;
  taker: string;
  feeRecipient: string;
  paidMakerFee: BigNumber; // converted
  paidTakerFee: BigNumber; // converted
  filledBaseTokenAmount: BigNumber; // converted
  filledQuoteTokenAmount: BigNumber; // converted
  orderHash: string;
  timestamp: number;
}

export interface RadarSubscribeMessage {
  type: 'book' | 'ticker' | 'candle';
  market: string;
  requestId?: number;
}

export interface RadarNewOrder extends RadarEvent {
}

export interface RadarCancelOrder extends RadarEvent {
}

export interface RadarRemoveOrder extends RadarEvent {
  reason: string;
}

export interface WebsocketEvent {
  action: 'FILL' | 'NEW' | 'CANCEL' | 'REMOVE'; // TODO 'CANDLE'|'TICKER'|...
  event: RadarFill | RadarNewOrder | RadarCancelOrder | RadarRemoveOrder;
}
