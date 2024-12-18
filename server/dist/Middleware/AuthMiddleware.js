"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config/config");
const User_1 = __importDefault(require("../Model/User"));
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Retrieve the token from cookies
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized access. Token not provided.",
            });
            return;
        }
        // Verify the token and extract payload
        const decodedData = jwt.verify(token, config_1.USER_JWT_SECRET);
        // Fetch user details and attach them to the request object
        const user = yield User_1.default.findById(decodedData.id).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found.",
            });
            return;
        }
        // Attach user information to the request object
        //@ts-ignore
        req.user = user;
        // Proceed to the next middleware
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        // Handle token-related errors
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).json({
                success: false,
                message: "Invalid or expired token.",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
});
exports.default = AuthMiddleware;
