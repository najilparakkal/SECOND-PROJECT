import { Request, Response } from "express";

import postIterator from "../../domain/usecases/vendor/post/post";
import requesIterator from "../../domain/usecases/vendor/request/request";
import { multipartFormSubmission } from "../../domain/helpers/formidable";
import {
  IPostDetails,
  IVendorRequestDetails,
} from "../../domain/entities/vendor/vendor";

export default {
  request: async (req: Request, res: Response) => {
    try {
      const { files, fields } = await multipartFormSubmission(req);
      const response = await requesIterator.request(
        fields as unknown as IVendorRequestDetails,
        files
      );
      if (response?.success) {
        res.status(200).json({
          status: 200,
          message: "Request submitted successfully",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Invalid request",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getCategories: async (req: Request, res: Response) => {
    try {
      const response = await postIterator.categories();

      res.status(200).json({ status: 200, response });
    } catch (error) {
      console.log(error);
    }
  },
  uploadPost: async (req: Request, res: Response) => {
    try {
      const { files, fields } = await multipartFormSubmission(req);
      const postDetails: IPostDetails = fields as unknown as IPostDetails;

      await postIterator.uploadPost(postDetails, files);
      res.status(200).json({ status: 200 });
    } catch (error) {
      console.log(error);
    }
  },
  listRequests: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.listRequests(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  acceptRequest: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.acceptRequest(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  rejectRequest: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.rejectRequest(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  fetchUsers:async (req: Request, res: Response) => {
    try {
      
      const response = await requesIterator.fetchUsers(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  },
  messages:async(req: Request, res: Response) => {
    try {
      const response = await requesIterator.fetchMessages(req.params.chatId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  },
  storeMessage:async(req: Request, res: Response) => {
    try {
      const response = await requesIterator.storeMessage(req.body)
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  },
  chatId:async(req:Request, res: Response) =>{
    try {
      const response = await requesIterator.fetchChatId(req.params.vendorId, req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  }
};
