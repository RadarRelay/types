import {BigNumber} from 'bignumber.js';
import {SignedOrder, Order} from '@0xproject/types';
export {SignedOrder} from '@0xproject/types';

export enum UserOrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum RadarOrderType {
  BID = 'BID',
  ASK = 'ASK'
}

export enum RadarOrderState {
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  UNFUNDED = 'UNFUNDED'
}

export enum WebsocketAction {
  FILL = 'FILL',
  NEW = 'NEW',
  CANCEL = 'CANCEL',
  REMOVE = 'REMOVE'
}

export enum WebsocketRequestTopic {
  BOOK = 'BOOK',
  TICKER = 'TICKER',
  CANDLE = 'CANDLE'
}

export enum WebsocketRequestType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE'
}

/**
 * Information specific to a single token.
 */
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

/**
 * Market information for a base/quote token pair.
 */
export interface RadarMarket {
  id: string; // "ZRX-WETH",
  baseTokenAddress: string;
  quoteTokenAddress: string;
  baseTokenDecimals: number;
  quoteTokenDecimals: number;
  quoteIncrement: BigNumber; // analogous to the current "precision"
  displayName: string; // "ZRX/WETH",
  minOrderSize: BigNumber; // calculated min base token size based on last trade price
  maxOrderSize: BigNumber; // calculated max base token based on last trade price
  lastTradePrice: BigNumber; // last trade price
}

/**
 * ZRX Signed Order with included order state.
 */
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

/**
 * A request for an unsigned order at the specified quantity and price, which can then we signed and POSTed back.
 */
export interface RadarLimitOrder {
  type: UserOrderType;
  quantity: BigNumber;
  price: BigNumber;
  expiration: BigNumber;
}

/**
 * An unsigned order at the specified quantity and price
 */
export interface UnsignedOrder {
  maker: 'SET';
  taker: string;
  makerFee: BigNumber;
  takerFee: BigNumber;
  makerTokenAmount: BigNumber;
  takerTokenAmount: BigNumber;
  makerTokenAddress: string;
  takerTokenAddress: string;
  salt: BigNumber;
  exchangeContractAddress: 'SET';
  feeRecipient: string;
  expirationUnixTimestampSec: 'SET';
}

/**
 * A request for fillable orders, up to the specified quantity, at the best price.
 */
export interface RadarMarketOrder {
  type: UserOrderType;
  quantity: BigNumber;
}

/**
 * A response with price information and fillable orders at the best price.
 */
export interface RadarMarketOrderResponse {
  averagePrice: BigNumber;
  bestPrice: BigNumber;
  worstPrice: BigNumber;
  spread: BigNumber;
  orders: SignedOrder[];
}

/**
 * Fee information for a given market.
 */
export interface RadarOrderFeeResponse {
  makerFee: BigNumber;
  takerFee: BigNumber;
  feeRecipient: string;
  gasEstimate?: BigNumber;
}

/**
 * Price, volume, and related information for a given market.
 */
export interface RadarTicker {
  transactionHash: string; // last trade tx hash
  price: BigNumber; // last trade price
  size: BigNumber; // last trade size (in quote)
  bid: BigNumber; // best bid
  ask: BigNumber; // best ask
  volume: BigNumber; // 24hr volume of market in quote
  timestamp: BigNumber; // last trade time in unix time (seconds)
}

/**
 * The orderbook for a given market.
 */
export interface RadarBook {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  bids: RadarSignedOrder[];
  asks: RadarSignedOrder[];
}

/**
 * Open-high-low-close chart data.
 */
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

/**
 * Radar Events utilized by the Websocket Endpoint.
 */
export interface RadarEvent {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  order: RadarSignedOrder;
}

/**
 * New Order Event
 */
export interface RadarNewOrder extends RadarEvent {
}

/**
 * Canceled Order Event
 */
export interface RadarCancelOrder extends RadarEvent {
}

/**
 * Remove Order Event
 */
export interface RadarRemoveOrder extends RadarEvent {
  reason: string;
}

/**
 * WebSocket Event
 */
export interface WebsocketEvent {
  action: WebsocketAction; 
  event: RadarFill | RadarNewOrder | RadarCancelOrder | RadarRemoveOrder;
}

/**
 * Fill Event
 */
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

/**
 * WebSocket Request
 */
export interface RadarWebsocketRequest {
  type: WebsocketRequestType;
  requestId?: number;
}

/**
 * WebSocket Subscribe Request
 */
export interface RadarSubscribeRequest extends RadarWebsocketRequest {
  type: WebsocketRequestType.SUBSCRIBE;
  topic: WebsocketRequestTopic;
  market: string;
}

/**
 * WebSocket Unsubscribe Request
 */
export interface RadarUnsubscribeRequest extends RadarWebsocketRequest {
  type: WebsocketRequestType.UNSUBSCRIBE;
  topic: WebsocketRequestTopic;
  market: string;
}

/**
 * WebSocket Response
 */
export interface RadarWebsocketResponse {
  type: WebsocketRequestType | 'ERROR';
  requestId?: number;
}
