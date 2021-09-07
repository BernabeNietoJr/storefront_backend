"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var product_routes_1 = __importDefault(require("./handlers/product_routes"));
var user_routes_1 = __importDefault(require("./handlers/user_routes"));
var app = express_1["default"]();
var address = "0.0.0.0:3000";
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
product_routes_1["default"](app);
user_routes_1["default"](app);
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports["default"] = app;
