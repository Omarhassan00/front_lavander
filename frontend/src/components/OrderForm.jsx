import { motion } from "framer-motion";

const OrderForm = (order) => {

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opatotalAmount: 0, y: 20 }}
      animate={{ opatotalAmount: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-purple-800">
        Order Details
      </h2>

      {order.order.products?.map((product , index) => (
      <form className="space-y-4" key={index}>
        <tr>
          <td>
        <h1>Product Name </h1>
        </td>
          <td>
        <h1>: {product.productname}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Product Image</h1>
        </td>
          <td>
        <img src={product.productimage} alt={product.productname}/>
        </td>
        </tr>
        <tr>
          <td>
        <h1>quantity</h1>
        </td>
          <td>
        <h1>: {product.quantity}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Unit Price</h1>
        </td>
          <td>
        <h1>: {product.price}L.E</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Total Amount</h1>
        </td>
          <td>
        <h1>: {order.order.totalAmount}L.E</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Strip ID</h1>
        </td>
          <td>
        <h1>: {order.order.ordernumber}</h1>
        </td>
        </tr>
        <tr>
          <td>
        <h1>Order Time</h1>
        </td>
          <td>
        <h1>: {order.order.timestamps}</h1>
        </td>
        </tr>
      </form>
      ))}
    </motion.div>
    
  );
};
export default OrderForm;
