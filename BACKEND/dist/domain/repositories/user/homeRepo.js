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
exports.chatId = exports.listVendorsInUserChat = exports.cancelRequest = exports.listRequest = exports.addRequest = exports.getVendorProfile = exports.listServices = exports.listVendors = void 0;
const chatModal_1 = __importDefault(require("../../../framworks/database/models/chatModal"));
const requests_1 = require("../../../framworks/database/models/requests");
const services_1 = require("../../../framworks/database/models/services");
const user_1 = require("../../../framworks/database/models/user");
const vendor_1 = require("../../../framworks/database/models/vendor");
const listVendors = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_1.Vendors.find({ vendor: true })
            .populate("licence")
            .exec();
        const filteredVendors = vendors.filter((vendor) => vendor.licence.some((licence) => {
            const services = licence.services
                .split(",")
                .map((service) => service.trim().toLowerCase());
            return services.includes(data.toLowerCase());
        }));
        const vendorsWithDetails = filteredVendors.map((vendor) => {
            var _a;
            return ({
                _id: vendor._id,
                vendorName: vendor.vendorName,
                email: vendor.email,
                phoneNum: vendor.phoneNum,
                profilePicture: (_a = vendor.licence[0]) === null || _a === void 0 ? void 0 : _a.profilePicture,
            });
        });
        return vendorsWithDetails;
    }
    catch (error) {
        console.error("Error listing vendors:", error);
        return [];
    }
});
exports.listVendors = listVendors;
const listServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_1.Services.find();
        return services;
    }
    catch (error) {
        console.log(error);
    }
});
exports.listServices = listServices;
const getVendorProfile = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const vendor = (yield vendor_1.Vendors.findById(vendorId)
            .populate("licence")
            .exec());
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        const { vendorName, phoneNum, licence, coverPicture } = vendor;
        const profilePicture = ((_a = licence[0]) === null || _a === void 0 ? void 0 : _a.profilePicture) || "";
        const businessName = ((_b = licence[0]) === null || _b === void 0 ? void 0 : _b.businessName) || "";
        const location = ((_c = licence[0]) === null || _c === void 0 ? void 0 : _c.location) || "";
        const response = {
            vendorName,
            phoneNum,
            profilePicture,
            businessName,
            location,
            coverPicture
        };
        return response;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
});
exports.getVendorProfile = getVendorProfile;
const addRequest = (userId, message, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield user_1.Users.findById(userId);
        console.log(userId, vendorId, "iuffhiuw");
        const addRequest = yield requests_1.Request.create({
            name: getUser === null || getUser === void 0 ? void 0 : getUser.userName,
            message: message,
            userId: getUser === null || getUser === void 0 ? void 0 : getUser._id,
            vendorId: vendorId,
        });
        return { success: true };
    }
    catch (error) {
        console.log(error);
    }
});
exports.addRequest = addRequest;
const listRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield requests_1.Request.find({ userId });
        const vendorIds = requests.map((request) => request.vendorId);
        const vendors = yield vendor_1.Vendors.find({
            _id: { $in: vendorIds },
        });
        const vendorMap = vendors.reduce((acc, vendor) => {
            acc[vendor._id] = vendor;
            return acc;
        }, {});
        const combinedData = requests.map((request) => {
            const vendor = vendorMap[request.vendorId];
            return Object.assign(Object.assign({}, request), { vendorName: vendor.vendorName, vendorProfilePicture: vendor.profilePicture, vendorId: request.vendorId, requested: request.requested });
        });
        return combinedData;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.listRequest = listRequest;
const cancelRequest = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield requests_1.Request.findOneAndDelete({ userId, vendorId });
        if (!request) {
            throw new Error("Request not found");
        }
        return { success: true };
    }
    catch (error) {
        console.log(error);
    }
});
exports.cancelRequest = cancelRequest;
const listVendorsInUserChat = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chatModal_1.default.find({ users: userId });
        const vendorIds = chats.map((chat) => chat.users.find((user) => user.toString() !== userId));
        const vendors = yield vendor_1.Vendors.find({ _id: { $in: vendorIds } });
        return vendors;
    }
    catch (error) {
        console.error("Error fetching vendors:", error);
        throw error;
    }
});
exports.listVendorsInUserChat = listVendorsInUserChat;
const chatId = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatModal_1.default.findOne({
            $and: [
                { users: userId },
                { users: vendorId }
            ]
        });
        if (chat) {
            return chat._id.toString();
        }
        else {
            throw new Error("Chat not found");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.chatId = chatId;
