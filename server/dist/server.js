"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./Route/UserRoute"));
const ContentRoute_1 = __importDefault(require("./Route/ContentRoute"));
const MONGODB_URL = "mongodb+srv://abdulbasitkhan8669:cJvKAQk1d80AeJ1f@second-brain-cluster.iszs7.mongodb.net/thirdbrain";
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
app.use("/api/v1/users", UserRoute_1.default);
app.use("/api/v1/contents", ContentRoute_1.default);
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(MONGODB_URL);
            console.log("MongoDB database is connected");
            // Start the server
            app.listen(PORT, () => {
                console.log(`App is running on http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error("Error occurred while connecting to MongoDB:", error);
        }
    });
}
// Start the application
Main();
