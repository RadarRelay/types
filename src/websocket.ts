import { RadarSignedOrder, UserOrderType, RadarOrderType } from "./objects";
import { BigNumber } from "@0x/utils";

// --- Enums ---------------------------------------------------------------- //

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

// --- Interfaces ----------------------------------------------------------- //

/**
 * A fill without the RadarSignedOrder information
 */
export interface RadarFill extends MarketEvent, OnChainEvent {
  type: UserOrderType;
  blockNumber: number;
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  makerFeePaid: BigNumber; // converted
  takerFeePaid: BigNumber; // converted
  filledBaseTokenAmount: BigNumber; // converted
  filledQuoteTokenAmount: BigNumber; // converted
  orderHash: string;
  timestamp: number;
  outlier: boolean; // Whether or not the fill is an outlier
}

/**
 * An event tied to a market (base/quote)
 */
export interface MarketEvent {
  baseTokenAddress: string;
  quoteTokenAddress: string;
}

/**
 * An event containing a RadarSignedOrder.
 */
export interface OrderEvent {
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
export interface RadarNewOrder extends MarketEvent, OrderEvent {
}

/**
 * Cancelled Order Event
 */
export interface RadarCancelOrder extends MarketEvent, OnChainEvent {
  orderType: RadarOrderType;
  orderHash: string;
}

/**
 * Remove Order Event
 */
export interface RadarRemoveOrder extends MarketEvent {
  reason: string;
  orderType: RadarOrderType;
  orderHash: string;
}

/**
 * Fill Order Event
 */
export interface RadarFillOrder extends RadarFill, OrderEvent {
}

/**
 * WebSocket Event
 */
export interface WebsocketEvent {
  action: WebsocketAction;
  event: RadarFillOrder | RadarNewOrder | RadarCancelOrder | RadarRemoveOrder;
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
