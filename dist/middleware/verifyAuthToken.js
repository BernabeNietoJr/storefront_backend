"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var TokenSecret = TOKEN_SECRET || '';
var verifyAuthToken = function (req, res, next) {
    try {
        //let authHeader = req.headers.authorization || '5gtrertetg'
        //const token = authHeader.split(' ')[1]
        var token = req.body.token;
        var decoded = jsonwebtoken_1["default"].verify(token, TokenSecret);
        next();
    }
    catch (err) {
        res.status(401).json("Access Denied: Invalid Token " + err);
        return;
    }
};
exports["default"] = verifyAuthToken;
