"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorRouter = express_1.default.Router();
const authController_1 = __importDefault(require("../../adaptors/vendorController/authController"));
const Controller_1 = __importDefault(require("../../adaptors/vendorController/Controller"));
vendorRouter.post("/api/vendor/signup", authController_1.default.signUp);
vendorRouter.post("/api/vendor/otp", authController_1.default.verifyOtp);
vendorRouter.post("/api/vendor/resendOtp", authController_1.default.resendOtp);
vendorRouter.post("/api/vendor/login", authController_1.default.login);
vendorRouter.put("/api/vendor/validEmail", authController_1.default.verifyEmail);
vendorRouter.post("/api/vendor/verifyFotp", authController_1.default.verifyFotp);
vendorRouter.put("/api/vendor/forgotPassword", authController_1.default.updatePassword);
vendorRouter.post("/api/vendor/googlesignup", authController_1.default.googleRegistration);
vendorRouter.post("/api/vendor/googleLogin", authController_1.default.googleLogin);
vendorRouter.put("/api/vendor/addRequest", Controller_1.default.request);
vendorRouter.get("/api/vendor/getCategories", Controller_1.default.getCategories);
vendorRouter.post("/api/vendor/uploadPost/:id", Controller_1.default.uploadPost);
exports.default = vendorRouter;
