import {BigNumber} from 'bignumber.js';
import {SignedOrder} from '@0xproject/types';
export {SignedOrder} from '@0xproject/types';

export interface RelaySignedOrder {
    orderHash: string;
    state: 'OPEN' | 'EXPIRED' | 'CLOSED' | 'UNFUNDED';
    baseTokenAddress: string;
    quoteTokenAddress: string;
    remainingBaseTokenAmount: BigNumber; // Converted amount
    remainingQuoteTokenAmount: BigNumber; // Converted amount
    price: BigNumber;
    createdDate: BigNumber; // Unix timestamp
    signedOrder: SignedOrder;
}

export interface RelayMarket {
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


export interface RelayTicker {
    transactionHash: string; // last trade tx hash
    price: BigNumber; // last trade price
    size: BigNumber; // last trade size (in quote)
    bid: BigNumber; // best bid
    ask: BigNumber; // best ask
    volume: BigNumber; // 24hr volume of market in quote
    timestamp: BigNumber // last trade time in unix time (seconds)
}

export interface RelayBook {
    baseTokenAddress: string;
    quoteTokenAddress: string;
    bids: RelaySignedOrder[];
    asks: RelaySignedOrder[];
}

export interface RelayLimitOrder {
    type: string; // "bid"|"ask",
    signedOrder: RelaySignedOrder;
}


export interface RelayFill extends RelayEvent {
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

export interface RelayCandle extends Ohlc {
    startBlock: number;
    startBlockTimestamp: number;
    endBlock: number; // the last block included in this candle (inclusive)
    endBlockTimestamp: number;
    baseTokenAddress: string;
    baseTokenVolume: BigNumber;
    quoteTokenAddress: string;
    quoteTokenVolume: BigNumber;
}






export interface RelayMarketOrder {
    type: string; // "bid"|"ask",
    quantity: BigNumber;
}


export interface RelayMarketOrderResponse {
    averagePrice: BigNumber;
    bestPrice: BigNumber;
    worstPrice: BigNumber;
    spread: BigNumber;
    orders: SignedOrder[];
}


export interface RelayOrderFeeResponse {
    makerFee: BigNumber;
    takerFee: BigNumber;
    feeRecipient: string;
    gasEstimate?: BigNumber;
}


// Relay Events

// Relay Events utilized by the Websocket Endpoint.
export interface RelayEvent {
    baseTokenAddress: string;
    quoteTokenAddress: string;
    order: RelaySignedOrder;
}

export interface RelayNewOrder extends RelayEvent {
}

export interface RelayCancelOrder extends RelayEvent {
}

export interface RelayRemoveOrder extends RelayEvent {
    reason: string;
}



export interface WebsocketEvent {
    action: 'FILL' | 'NEW' | 'CANCEL' | 'REMOVE'; // TODO 'CANDLE'|'TICKER'|...
    event: RelayFill | RelayNewOrder | RelayCancelOrder | RelayRemoveOrder;
}


// Relay Candle
export interface Ohlc {
    open: BigNumber;
    high: BigNumber;
    low: BigNumber;
    close: BigNumber;
}
