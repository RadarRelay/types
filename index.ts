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
