"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../adaptors/userController/authController"));
const Controller_1 = __importDefault(require("../../adaptors/userController/Controller"));
const UserMiddleware_1 = __importDefault(require("../middlewares/UserMiddleware"));
const userRouter = express_1.default.Router();
userRouter.get("/api/user/OterServices", Controller_1.default.listAll);
userRouter.post("/api/user/signup", authController_1.default.userRegistration);
userRouter.post("/api/user/otp", authController_1.default.otpVerification);
userRouter.post("/api/user/Fotp", authController_1.default.forgotOtpVerification);
userRouter.post("/api/user/resendOtp", authController_1.default.resendOtp);
userRouter.post("/api/user/login", authController_1.default.login);
userRouter.post("/api/user/validEmail", authController_1.default.checkEmail);
userRouter.post("/api/user/Fotp", authController_1.default.checkEmail);
userRouter.post("/api/user/changePassword", authController_1.default.change);
userRouter.post("/api/user/googleUser", authController_1.default.googleRegistration);
userRouter.post("/api/user/googleLogin", authController_1.default.googleLogin);
userRouter.post("/api/user/vendors", UserMiddleware_1.default, Controller_1.default.listVendors);
userRouter.get("/api/user/services", UserMiddleware_1.default, Controller_1.default.listServices);
userRouter.get("/api/user/vendorProfile/:vendorId", UserMiddleware_1.default, Controller_1.default.getVendorProfile);
userRouter.post("/api/user/addRequest", UserMiddleware_1.default, Controller_1.default.addRequest);
userRouter.get("/api/user/request/:userId", UserMiddleware_1.default, Controller_1.default.listRequest);
userRouter.post("/api/user/cancelRequest", UserMiddleware_1.default, Controller_1.default.cancelRequest);
userRouter.get("/api/user/fetchVendors/:userId", UserMiddleware_1.default, Controller_1.default.fetchVendors);
userRouter.get("/api/user/chatId/:userId/:vendorId", UserMiddleware_1.default, Controller_1.default.getChatId);
userRouter.post("/api/user/addBooking", UserMiddleware_1.default, Controller_1.default.addBooking);
userRouter.get("/api/user/bookings/:userId", UserMiddleware_1.default, Controller_1.default.getBooking);
userRouter.post("/api/user/cancelBooking", UserMiddleware_1.default, Controller_1.default.cancelBooking);
userRouter.get('/api/user/profile/:userId', UserMiddleware_1.default, Controller_1.default.getProfile);
userRouter.put('/api/user/updateProfile/:userId', UserMiddleware_1.default, Controller_1.default.updateProfile);
userRouter.get('/api/user/vendorDates/:vendorId', UserMiddleware_1.default, Controller_1.default.getDates);
userRouter.get('/api/user/posts/:userId', UserMiddleware_1.default, Controller_1.default.getPosts);
userRouter.put('/api/user/updateLike/:userId/:postId', UserMiddleware_1.default, Controller_1.default.updateLike);
userRouter.post('/api/user/comments', UserMiddleware_1.default, Controller_1.default.getComments);
userRouter.post('/api/user/newComment/:postId/:userId', UserMiddleware_1.default, Controller_1.default.newComment);
userRouter.post('/api/user/commentReply/:commentId', UserMiddleware_1.default, Controller_1.default.replyComment);
userRouter.put('/api/user/commentLike', UserMiddleware_1.default, Controller_1.default.commentLike);
userRouter.put('/api/user/replyLike', UserMiddleware_1.default, Controller_1.default.replyLike);
userRouter.get('/api/user/ratingreview/:vendorId', UserMiddleware_1.default, Controller_1.default.ratingReview);
userRouter.put('/api/user/addReview/:userId/:vendorId', UserMiddleware_1.default, Controller_1.default.addReview);
userRouter.put('/api/user/vendorLike/:userId/:vendorId', UserMiddleware_1.default, Controller_1.default.vendorLike);
userRouter.get('/api/user/likedPosts/:userId', UserMiddleware_1.default, Controller_1.default.likedPosts);
userRouter.get('/api/user/likedVendors/:userId', UserMiddleware_1.default, Controller_1.default.likedVendors);
userRouter.get('/api/user/userBooked/:userId', UserMiddleware_1.default, Controller_1.default.userBooked);
userRouter.get('/api/user/requestcheck/:userId/:vendorId', UserMiddleware_1.default, Controller_1.default.requestcheck);
userRouter.post('/api/user/submitReport/:userId/:vendorId', UserMiddleware_1.default, Controller_1.default.submitReport);
userRouter.get('/api/user/notifications/:vendorId', UserMiddleware_1.default, Controller_1.default.notification);
userRouter.get("/api/user/roomIds/:userId", UserMiddleware_1.default, Controller_1.default.roomIds);
exports.default = userRouter;
