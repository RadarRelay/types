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
    timestamp: number;
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
    price24Hour: BigNumber[];
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
    senderAddress: 'SET';
    makerAddress: 'SET';
    takerAddress: string;
    makerFee: BigNumber;
    takerFee: BigNumber;
    makerAssetAmount: BigNumber;
    takerAssetAmount: BigNumber;
    makerAssetData: string;
    takerAssetData: string;
    salt: BigNumber;
    exchangeAddress: 'SET';
    feeRecipientAddress: string;
    expirationTimeSeconds: BigNumber;
    signature: 'SET';
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
    feeRecipientAddress: string;
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
/**
 * Radar candle chart ohlc information
 */
export interface RadarCandle extends Ohlc {
    startBlock: number;
    startBlockTimestamp: number;
    endBlock: number;
    endBlockTimestamp: number;
    baseTokenVolume: BigNumber;
    quoteTokenVolume: BigNumber;
}
/**
 * A fill without the RadarSignedOrder information
 */
export interface RadarFill extends MarketEvent, OnChainEvent {
    type: UserOrderType;
    blockNumber: number;
    makerAddress: string;
    takerAddress: string;
    feeRecipientAddress: string;
    makerFeePaid: BigNumber;
    takerFeePaid: BigNumber;
    filledBaseTokenAmount: BigNumber;
    filledQuoteTokenAmount: BigNumber;
    orderHash: string;
    timestamp: number;
    outlier: boolean;
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
 * Canceled Order Event
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
