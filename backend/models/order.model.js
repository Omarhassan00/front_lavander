import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				productname: {
					type: String,
				},
				productimage: {
					type: String,
				},
				quantity: {
					type: Number,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			}
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		ordernumber: {
			type: String,
			unique: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
