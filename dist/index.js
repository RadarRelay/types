"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserOrderType;
(function (UserOrderType) {
    UserOrderType["BUY"] = "BUY";
    UserOrderType["SELL"] = "SELL";
})(UserOrderType = exports.UserOrderType || (exports.UserOrderType = {}));
var RadarOrderType;
(function (RadarOrderType) {
    RadarOrderType["BID"] = "BID";
    RadarOrderType["ASK"] = "ASK";
})(RadarOrderType = exports.RadarOrderType || (exports.RadarOrderType = {}));
var RadarOrderState;
(function (RadarOrderState) {
    RadarOrderState["OPEN"] = "OPEN";
    RadarOrderState["EXPIRED"] = "EXPIRED";
    RadarOrderState["CLOSED"] = "CLOSED";
    RadarOrderState["UNFUNDED"] = "UNFUNDED";
})(RadarOrderState = exports.RadarOrderState || (exports.RadarOrderState = {}));
