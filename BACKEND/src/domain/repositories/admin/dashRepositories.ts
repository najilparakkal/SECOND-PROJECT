import { uploadImage } from "../../../config/awsConfig";
import { Categories } from "../../../framworks/database/models/categorie";
import { Licence } from "../../../framworks/database/models/licence";
import { Users } from "../../../framworks/database/models/user";
import { Vendors } from "../../../framworks/database/models/vendor";
import {
  listUsers,
  listVendors,
  vendorBlock,
} from "../../entities/admin/admin";

export default {
  listUsers: async (data: listUsers) => {
    try {
      let users;
      switch (data.list) {
        case "ascending":
          users = await Users.find().sort({ userName: 1 });
          break;
        case "descending":
          users = await Users.find().sort({ userName: -1 });
          break;
        case "notVerified":
          users = await Users.find({ blocked: false });
          break;
        case "verified":
          users = await Users.find({ blocked: true });
          break;
        case "date":
          users = await Users.find().sort({ registered: 1 });
          break;
        default:
          users = await Users.find();
          break;
      }
      return users;
    } catch (error) {
      console.log(error);
    }
  },

  listVendors: async (data: listVendors) => {
    try {
      let vendors;
      switch (data.list) {
        case "ascending":
          vendors = await Vendors.find().sort({ vendorName: 1 });
          break;
        case "descending":
          vendors = await Vendors.find().sort({ vendorName: -1 });
          break;
        case "notVerified":
          vendors = await Vendors.find({ blocked: false });
          break;
        case "verified":
          vendors = await Vendors.find({ blocked: true });
          break;
        case "date":
          vendors = await Vendors.find().sort({ registered: 1 });
          break;
        default:
          vendors = await Vendors.find();
          break;
      }
      return vendors;
    } catch (error) {
      console.log(error);
    }
  },
  updateBlock: async (data: vendorBlock) => {
    try {
      const vendor = await Vendors.findById(data.id);
      if (vendor) {
        return await Vendors.findByIdAndUpdate(
          data.id,
          { $set: { blocked: !vendor.blocked } },
          { new: true }
        );
      } else {
        console.log("Vendor not found");
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (data: vendorBlock) => {
    try {
      const user = await Users.findById(data.id);
      if (user) {
        return await Users.findByIdAndUpdate(
          data.id,
          { $set: { blocked: !user.blocked } },
          { new: true }
        );
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  },

  categoryAdding: async (data:any) => {
    try {
      const checkCategory = await Categories.findOne({ name: data.name });
      if (checkCategory) {
        return { success: false, message: "Category not found" };
      } else {
        
        const url = await uploadImage(data.image.filepath);
        const newCategory = await Categories.create({
          name: data.name,
          image: url,
        });
        return {
          success: false,
          message: "Category Created successfully",
          newCategory,
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
  listCategory: async () => {
    try {
      const categories = await Categories.find(); 

      return { success: true, data: categories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Failed to fetch categories", error };
    }
  },
  updateCategory: async (_id: string) => {
    try {
      const update = await Categories.findByIdAndDelete(_id);
      if (update) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error in dashRepositories.updateCategory:", error);
      throw error;
    }
  },
  

  listRequest: async () => {
    try {
      const getAll = await Licence.find({ verified: false });
      console.log(getAll);

      return getAll;
    } catch (error) {
      console.log(error);
    }
  },
  rejectVendor: async (_id: string) => {
    try {
      const deleteRequest = await Licence.findByIdAndDelete({ _id });

      if (deleteRequest) {
        return { success: true, email: deleteRequest.emailAddress };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
    }
  },
  acceptVendor: async (_id: string) => {
    try {
      const acceptRequest = await Licence.findByIdAndUpdate(
        { _id },
        { $set: { verified: true } }
      );
      if (acceptRequest) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
    }
  },
};
