import { BigNumber } from 'bignumber.js';
import { SignedOrder } from '@0xproject/types';
export { SignedOrder } from '@0xproject/types';

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
 *  Top-Level information about the most recent trade and best bid/ask for a given market.
 */
export interface RadarTicker {
  transactionHash: string; // Last trade tx hash
  price: BigNumber; // Last trade price
  size: BigNumber; // Last trade size (in quote)
  timestamp: BigNumber; // Timestamp of last trade
  bestBid: BigNumber; // Best bid on the book
  bestAsk: BigNumber; // Best ask on the book
  spreadPercentage: BigNumber; // The bid-ask spread percentage
}

/**
 * Order book depth information and 24 hour statistics.
 */
export interface RadarStats {
  numBidsWithinRange: number; // Number of bids within a defined range (Example: Within 20% of the best bid)
  numAsksWithinRange: number; // Number of asks within a defined range (Example: Within 20% of the best ask)
  baseTokenAvailable: BigNumber; // Amount of base token available on the book
  quoteTokenAvailable: BigNumber; // Amount of quote token available on the book
  volume24Hour: BigNumber; // 24 hour volume
  percentChange24Hour: BigNumber; // 24 hour price change percentage
}

/**
 * General Market Information
 */
export interface RadarMarketBase {
  displayName: string; // Example: ZRX/WETH
  baseTokenAddress: string;
  quoteTokenAddress: string;
  baseTokenDecimals: number;
  quoteTokenDecimals: number;
  quoteIncrement: number; // Maximum precision allowed for the market. Example: 7 (decimal places)
  minOrderSize: BigNumber; // Calculated min base token size based on last trade price
  maxOrderSize: BigNumber; // Calculated max base token size
  score: number; // A score used to rank most active markets
}

/**
 * Market information for a base/quote token pair.
 */
export interface RadarMarket extends Partial<RadarMarketBase> {
  id: string; // Example: ZRX-WETH. (Mandatory)
  ticker?: RadarTicker; // (Optional)
  stats?: RadarStats; // (Optional)
  priceHistory?: BigNumber[]; // 24 hour price history (Optional)
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
 * An on-chain event (transaction)
 */
export interface OnChainEvent {
  transactionHash: string;
}

/**
 * New Order Event
 */
export interface RadarNewOrder extends RadarEvent {
}

/**
 * Canceled Order Event
 */
export interface RadarCancelOrder extends OnChainEvent {
  orderType: RadarOrderType;
  orderHash: string;
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
export interface RadarFill extends RadarEvent, OnChainEvent {
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
