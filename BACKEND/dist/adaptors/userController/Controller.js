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
const home_1 = __importDefault(require("../../domain/usecases/user/home/home"));
exports.default = {
    listVendors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listVendors(req.body.data);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    listServices: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listServices();
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getVendorProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getVendorProfile(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    addRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.addRequest(req.body);
            res.status(200).json({ message: "Request sent successfully" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    listRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listRequest(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    cancelRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.cancelRequest(req.body);
            res.status(200).json({ message: "Request cancelled successfully" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    fetchVendors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.fetchVendors(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChatId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getChatId(req.params);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    })
};
