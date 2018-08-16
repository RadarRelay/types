import { BigNumber } from 'bignumber.js';
import { SignedOrder } from '@0xproject/types';
export { SignedOrder } from '@0xproject/types';
export declare enum UserOrderType {
    BUY = "BUY",
    SELL = "SELL",
}
export declare enum RadarOrderType {
    BID = "BID",
    ASK = "ASK",
}
export declare enum RadarOrderState {
    OPEN = "OPEN",
    FILLED = "FILLED",
    CANCELED = "CANCELED",
    EXPIRED = "EXPIRED",
    UNFUNDED = "UNFUNDED",
}
export declare enum WebsocketAction {
    FILL = "FILL",
    NEW = "NEW",
    CANCEL = "CANCEL",
    REMOVE = "REMOVE",
}
export declare enum WebsocketRequestTopic {
    BOOK = "BOOK",
    TICKER = "TICKER",
    CANDLE = "CANDLE",
}
export declare enum WebsocketRequestType {
    SUBSCRIBE = "SUBSCRIBE",
    UNSUBSCRIBE = "UNSUBSCRIBE",
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
    transactionHash: string;
    price: BigNumber;
    size: BigNumber;
    timestamp: BigNumber;
    bestBid: BigNumber;
    bestAsk: BigNumber;
    spreadPercentage: BigNumber;
}
/**
 * Order book depth information and 24 hour volume statistics for a given market.
 */
export interface RadarStats {
    numBidsWithinRange: number;
    numAsksWithinRange: number;
    baseTokenAvailable: BigNumber;
    quoteTokenAvailable: BigNumber;
    volume24Hour: BigNumber;
    percentChange24Hour: BigNumber;
}
/**
 * Historial information for a given market.
 */
export interface RadarHistory {
    price: BigNumber[];
}
/**
 * General Market Information
 */
export interface RadarMarketBase {
    displayName: string;
    baseTokenAddress: string;
    quoteTokenAddress: string;
    baseTokenDecimals: number;
    quoteTokenDecimals: number;
    quoteIncrement: number;
    minOrderSize: BigNumber;
    maxOrderSize: BigNumber;
    score: number;
}
/**
 * Market information for a base/quote token pair.
 */
export interface RadarMarket extends Partial<RadarMarketBase> {
    id: string;
    ticker?: RadarTicker;
    stats?: RadarStats;
    history?: RadarHistory;
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
    remainingBaseTokenAmount: BigNumber;
    remainingQuoteTokenAmount: BigNumber;
    price: BigNumber;
    createdDate: BigNumber;
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
    endBlock: number;
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
    paidMakerFee: BigNumber;
    paidTakerFee: BigNumber;
    filledBaseTokenAmount: BigNumber;
    filledQuoteTokenAmount: BigNumber;
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
