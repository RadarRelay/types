# types

Custom type definitions used by the Radar API and SDK

[![npm version](https://badge.fury.io/js/%40radarrelay%2Ftypes.svg)](https://badge.fury.io/js/%40radarrelay%2Ftypes)

## Enums

```javascript
enum UserOrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

enum RadarOrderType {
  BID = 'BID',
  ASK = 'ASK'
}

enum RadarOrderState {
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  UNFUNDED = 'UNFUNDED'
}

enum WebsocketAction {
  FILL = 'FILL',
  NEW = 'NEW',
  CANCEL = 'CANCEL',
  REMOVE = 'REMOVE'
}

enum WebsocketRequestTopic {
  BOOK = 'BOOK',
  TICKER = 'TICKER',
  CANDLE = 'CANDLE'
}

enum WebsocketRequestType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE'
}
```

## Interfaces

### RadarToken
Information specific to a single token.

```javascript
interface RadarToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  zeroex_official: boolean;
  active: boolean;
  createdDate: string;
  quote: boolean;
}
```

### RadarMarket
Market information for a base/quote token pair.

```javascript
interface RadarMarket {
  id: string; // "ZRX-WETH",
  baseTokenAddress: string;
  quoteTokenAddress: string;
  baseTokenDecimals: number;
  quoteTokenDecimals: number;
  quoteIncrement: BigNumber; // analogous to the current "precision"
  displayName: string; // "ZRX/WETH",
  minOrderSize: BigNumber; // calculated min base token size based on last trade price
  maxOrderSize: BigNumber; // calculated max base token size based on last trade price
  lastTradePrice: BigNumber; // last trade price
}
```
### Order
ZeroEx Order

```javascript
interface Order {
    maker: string;
    taker: string;
    makerFee: BigNumber;
    takerFee: BigNumber;
    makerTokenAmount: BigNumber;
    takerTokenAmount: BigNumber;
    makerTokenAddress: string;
    takerTokenAddress: string;
    salt: BigNumber;
    exchangeContractAddress: string;
    feeRecipient: string;
    expirationUnixTimestampSec: BigNumber;
}
```

### SignedOrder
ZeroEx Signed Order

```javascript
interface SignedOrder extends Order {
    ecSignature: ECSignature;
}
```

### RadarSignedOrder
ZRX Signed Order with included order state.

```javascript
interface RadarSignedOrder {
  orderHash: string;
  type: RadarOrderType;
  state: RadarOrderState;
  baseTokenAddress: string;
  quoteTokenAddress: string;
  remainingBaseTokenAmount: BigNumber, // converted amount
  remainingQuoteTokenAmount: BigNumber // converted amount
  price: BigNumber;
  createdDate: BigNumber; // unix
  signedOrder: SignedOrder;
}
```

### RadarLimitOrderRequest
A request for an unsigned order at the specified quantity and price, which can then we signed and POSTed back.

```javascript
interface RadarLimitOrder {
  type: UserOrderType;
  quantity: BigNumber;
  price: BigNumber;
  expiration: BigNumber;
 }
```

### UnsignedOrder

```javascript
/**
 * An unsigned order at the specified quantity and price
 */
interface UnsignedOrder {
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
```

### RadarMarketOrderRequest
A request for fillable orders, up to the specified quantity, at the best price.

```javascript
interface RadarMarketOrder {
  type: UserOrderType;
  quantity : BigNumber;
 }
```

### RadarMarketOrderResponse
A response with price information and fillable orders at the best price.

```javascript
interface RadarMarketOrderResponse {
   averagePrice: BigNumber;
   bestPrice: BigNumber;
   worstPrice: BigNumber;
   spread: BigNumber;
   orders: SignedOrder[];
}
```

### RadarOrderFeeResponse
Fee information for a given market.

```javascript
interface RadarOrderFeeResponse {
  makerFee: BigNumber;
  takerFee: BigNumber;
  feeRecipient: string;
  gasEstimate?: BigNumber;
 }
```

### RadarTicker
Price, volume, and related information for a given market.

```javascript
interface RadarTicker {
  transactionHash: string; // last trade tx hash
  price: BigNumber; // last trade price
  size: BigNumber; // last trade size (in quote)
  bid: BigNumber; // best bid
  ask: BigNumber; // best ask
  volume: BigNumber; // 24hr volume of market in quote
  timestamp: BigNumber // last trade time in unix time (seconds)
}
```

### RadarBook
The orderbook for a given market.

```javascript
interface RadarBook {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  bids: RadarSignedOrder[];
  asks: RadarSignedOrder[];
}
```

### Radar Candle
Open-high-low-close chart data.

```javascript
interface Ohlc {
  open: BigNumber;
  high: BigNumber;
  low: BigNumber;
  close: BigNumber;
}

interface RadarCandle extends Ohlc {
  startBlock: number;
  startBlockTimestamp: number;
  endBlock: number; // the last block included in this candle (inclusive)
  endBlockTimestamp: number;
  baseTokenAddress: string;
  baseTokenVolume: BigNumber;
  quoteTokenAddress: string;
  quoteTokenVolume: BigNumber;
}
```

## Radar Websocket Events
Radar Events utilized by the Websocket Endpoint.

### RadarEvent
```javascript
interface RadarEvent {
  baseTokenAddress: string;
  quoteTokenAddress: string;
  order: RadarSignedOrder;
}
```

### Order Events
```javascript
interface RadarNewOrder extends RadarEvent { }
interface RadarCancelOrder extends RadarEvent { }
interface RadarRemoveOrder extends RadarEvent {
  reason: string;
}
```

### WebsocketEvent
```javascript
interface WebsocketEvent {
  action: WebsocketAction;
  event: RadarFill | RadarNewOrder | RadarCancelOrder | RadarRemoveOrder;
}
```

### RadarFill
```javascript
interface RadarFill extends RadarEvent {
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
```

## Radar Websocket Request Types
Radar Request Types utilized by the Websocket Endpoint.

### RadarWebsocketRequest
```javascript
interface RadarWebsocketRequest {
  type: WebsocketRequestType;
  requestId?: number;
}
```

### RadarSubscribeRequest
```javascript
interface RadarSubscribeRequest extends RadarWebsocketRequest {
  type: WebsocketRequestType.SUBSCRIBE;
  topic: WebsocketRequestTopic;
  market: string;
}
```

### RadarUnsubscribeRequest
```javascript
interface RadarUnsubscribeRequest extends RadarWebsocketRequest {
  type: WebsocketRequestType.UNSUBSCRIBE;
  topic: WebsocketRequestTopic;
  market: string;
}
```

## Radar Websocket Response Types
Radar Response Types utilized by the Websocket Endpoint.

### RadarWebsocketResponse
```javascript
interface RadarWebsocketResponse {
  type: WebsocketRequestType | 'ERROR';
  requestId?: number;
}
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/RadarRelay/types/blob/master/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/RadarRelay/types/blob/master/LICENSE.md) file for details.
