"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//dotenv.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var TokenSecret = TOKEN_SECRET || '';
var verifyAuthToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (authHeader === undefined)
            authHeader = '3642wgsh35653656bghv hrhvh';
        var token = authHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, TokenSecret);
        next();
    }
    catch (err) {
        res.status(401).json('Access Denied: invalid Token');
    }
};
exports["default"] = verifyAuthToken;
