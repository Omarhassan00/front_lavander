import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

const History = () => {
    const { orders , fetchuserOrders} = useProductStore();
    useEffect(() => {
        fetchuserOrders()
    }, [fetchuserOrders, orders]);
  // console.log(orders);
    return (
      
      <motion.div
      className="flex flex-col items-center justify-center space-y-4 bg-gray-800 mt-32 shadow-lg rounded-lg p-5 mb-36 max-w-xl mx-auto "
      initial={{ opatotalAmount: 0, y: 20 }}
      animate={{ opatotalAmount: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
    <h2  className="text-2xl font-semibold mb-6 text-purple-800">
      Order History
    </h2>
        {orders.map((allorders) => allorders.map((order) => (
          <form key={order.id} className="space-y-4">
            <tr>
              <td>
                <h1>Total Amount</h1>
              </td>
              <td>
                <h1>: {order.totalAmount}L.E</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Strip ID</h1>
              </td>
              <td>
                <h1>: {order.ordernumber}</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Order Time</h1>
              </td>
              <td>
                <h1>: {order.createdAt}</h1>
              </td>
            </tr>
            {order.products.map((product, index) => (
      <form key={index}>
      <tr>
            <td>
              <h1>Product Name </h1>
            </td>
            <td>
              <h1>: {product.productname}</h1>
            </td>
          </tr><tr>
              <td>
                <h1>Product Image</h1>
              </td>
              <td>
                <img src={product.productimage} alt={product.productname} />
              </td>
            </tr><tr>
              <td>
                <h1>quantity</h1>
              </td>
              <td>
                <h1>: {product.quantity}</h1>
              </td>
            </tr><tr>
              <td>
                <h1>Unit Price</h1>
              </td>
              <td>
                <h1>: {product.price}L.E</h1>
              </td>
            </tr></form>
          ))}
          </form>
        )))}

  </motion.div>
  )
}

export default History;