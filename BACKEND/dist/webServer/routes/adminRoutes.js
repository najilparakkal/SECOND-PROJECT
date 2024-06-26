"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../adaptors/admin/authController"));
const dashBoardController_1 = __importDefault(require("../../adaptors/admin/dashBoardController"));
const adminRouter = express_1.default.Router();
adminRouter.post("/api/admin/login", authController_1.default.adminChecking);
adminRouter.post("/api/admin/Users", dashBoardController_1.default.usersListing);
adminRouter.post("/api/admin/Vendors", dashBoardController_1.default.vendorsListing);
adminRouter.put("/api/admin/block", dashBoardController_1.default.blockorUnblock);
adminRouter.patch("/api/admin/blockUser", dashBoardController_1.default.blockorUnblockUser);
adminRouter.post("/api/admin/addCategory", dashBoardController_1.default.addCategory);
adminRouter.get("/api/admin/getCategory", dashBoardController_1.default.getCategory);
adminRouter.patch("/api/admin/removeCategory", dashBoardController_1.default.removeCategory);
adminRouter.get("/api/admin/request", dashBoardController_1.default.listRequest);
adminRouter.post("/api/admin/rejectVendor", dashBoardController_1.default.reject);
adminRouter.post("/api/admin/acceptVendor", dashBoardController_1.default.accept);
exports.default = adminRouter;
