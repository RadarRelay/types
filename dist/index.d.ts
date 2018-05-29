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
    id: string;
    baseTokenAddress: string;
    quoteTokenAddress: string;
    baseTokenDecimals: number;
    quoteTokenDecimals: number;
    quoteIncrement: BigNumber;
    displayName: string;
    minOrderSize: BigNumber;
    maxOrderSize: BigNumber;
}
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
export interface RadarLimitOrder {
    type: UserOrderType;
    quantity: BigNumber;
    price: BigNumber;
    expiration: BigNumber;
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
    transactionHash: string;
    price: BigNumber;
    size: BigNumber;
    bid: BigNumber;
    ask: BigNumber;
    volume: BigNumber;
    timestamp: BigNumber;
}
export interface RadarBook {
    baseTokenAddress: string;
    quoteTokenAddress: string;
    bids: RadarSignedOrder[];
    asks: RadarSignedOrder[];
}
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
export interface RadarEvent {
    baseTokenAddress: string;
    quoteTokenAddress: string;
    order: RadarSignedOrder;
}
export interface RadarNewOrder extends RadarEvent {
}
export interface RadarCancelOrder extends RadarEvent {
}
export interface RadarRemoveOrder extends RadarEvent {
    reason: string;
}
export interface WebsocketEvent {
    action: WebsocketAction;
    event: RadarFill | RadarNewOrder | RadarCancelOrder | RadarRemoveOrder;
}
export interface RadarFill extends RadarEvent {
    transactionHash: string;
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
export interface RadarWebsocketRequest {
    type: WebsocketRequestType;
    requestId?: number;
}
export interface RadarSubscribeRequest extends RadarWebsocketRequest {
    type: WebsocketRequestType.SUBSCRIBE;
    topic: WebsocketRequestTopic;
    market: string;
}
export interface RadarUnsubscribeRequest extends RadarWebsocketRequest {
    type: WebsocketRequestType.UNSUBSCRIBE;
    topic: WebsocketRequestTopic;
    market: string;
}
export interface RadarWebsocketResponse {
    type: WebsocketRequestType | 'ERROR';
    requestId?: number;
}
