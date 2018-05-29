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
    RadarOrderState["FILLED"] = "FILLED";
    RadarOrderState["CANCELED"] = "CANCELED";
    RadarOrderState["EXPIRED"] = "EXPIRED";
    RadarOrderState["UNFUNDED"] = "UNFUNDED";
})(RadarOrderState = exports.RadarOrderState || (exports.RadarOrderState = {}));
var WebsocketAction;
(function (WebsocketAction) {
    WebsocketAction["FILL"] = "FILL";
    WebsocketAction["NEW"] = "NEW";
    WebsocketAction["CANCEL"] = "CANCEL";
    WebsocketAction["REMOVE"] = "REMOVE";
})(WebsocketAction = exports.WebsocketAction || (exports.WebsocketAction = {}));
var WebsocketRequestTopic;
(function (WebsocketRequestTopic) {
    WebsocketRequestTopic["BOOK"] = "BOOK";
    WebsocketRequestTopic["TICKER"] = "TICKER";
    WebsocketRequestTopic["CANDLE"] = "CANDLE";
})(WebsocketRequestTopic = exports.WebsocketRequestTopic || (exports.WebsocketRequestTopic = {}));
var WebsocketRequestType;
(function (WebsocketRequestType) {
    WebsocketRequestType["SUBSCRIBE"] = "SUBSCRIBE";
    WebsocketRequestType["UNSUBSCRIBE"] = "UNSUBSCRIBE";
})(WebsocketRequestType = exports.WebsocketRequestType || (exports.WebsocketRequestType = {}));
