import { BigNumber } from "@0x/utils";
import { ZeroEx } from "./zero-ex";

/**
 * A response with price information and fillable orders at the best price.
 */
export interface RadarMarketOrderResponse {
  averagePrice: BigNumber;
  bestPrice: BigNumber;
  worstPrice: BigNumber;
  spread: BigNumber;
  orders: ZeroEx.SignedOrder[];
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
