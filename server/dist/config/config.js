"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomLink = exports.USER_JWT_SECRET = void 0;
exports.USER_JWT_SECRET = "sdkasdjklcm2378quiowey9827371";
const RandomLink = (len) => {
    let options = "kjdshfjsjdiu81ncjsnkjcs271nsdj";
    let ans = "";
    for (let i = 0; i < options.length; i++) {
        ans += options[Math.floor(Math.random() * options.length)];
    }
    return ans;
};
exports.RandomLink = RandomLink;
