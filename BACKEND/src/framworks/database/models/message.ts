import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: { 
      type: Schema.Types.ObjectId, 
      refPath: 'senderModel', // Dynamically reference User or Vendor model
      required: true 
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['User', 'Vendor']
    },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: "ChatModel" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;