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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../Model/User"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config/config");
const AuthMiddleware_1 = __importDefault(require("../Middleware/AuthMiddleware"));
const router = express_1.default.Router();
router.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyData = req.body;
        const userValidationSchema = zod_1.z.object({
            username: zod_1.z
                .string()
                .min(4, { message: "Username must be greater than 4 characters" }),
            password: zod_1.z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must include at least one uppercase letter")
                .regex(/[a-z]/, "Password must include at least one lowercase letter")
                .regex(/[0-9]/, "Password must include at least one number")
                .regex(/[@$!%*?&]/, "Password must include at least one special character"),
        });
        const result = userValidationSchema.safeParse(bodyData);
        if (!result.success) {
            const errorMessages = result.error.errors.map((err) => err.message);
            res.status(400).json({
                success: false,
                message: errorMessages,
            });
        }
        const user = yield User_1.default.findOne({ username: bodyData.username });
        if (user) {
            res.status(300).json({
                success: false,
                message: "Username already registered !",
            });
        }
        const salt = bcrypt_1.default.genSaltSync(12);
        const hash = bcrypt_1.default.hashSync(bodyData.password, salt);
        const newUser = yield User_1.default.create({
            username: bodyData.username,
            password: hash,
        });
        res.status(200).json({
            success: true,
            message: "Registered Successfully !",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyData = req.body;
        const user = yield User_1.default.findOne({
            username: bodyData.username,
        });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Username Or Password Is Inccorect",
            });
        }
        else {
            const isMatchedPassword = yield bcrypt_1.default.compare(bodyData.password, user.password);
            if (!isMatchedPassword) {
                res.status(400).json({
                    success: false,
                    message: "Username or password is incorrect",
                });
                return;
            }
            const token = jwt.sign({
                id: user._id,
            }, config_1.USER_JWT_SECRET, { expiresIn: "1d" });
            res
                .status(200)
                .cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                // sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
                // secure: process.env.NODE_ENV === "development" ? false : true,
            })
                .json({
                success: true,
                message: "LoggedIn Successfully",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.post("/auth/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).clearCookie("token").json({
        success: true,
        message: "Logout Successfully",
    });
}));
router.get("/auth/check-auth", AuthMiddleware_1.default, (req, res) => {
    //@ts-ignore
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated Successfully",
        username: user.username,
    });
});
exports.default = router;
