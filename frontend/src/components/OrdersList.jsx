import { motion } from "framer-motion";
import { LucidePackageCheck, LucideShoppingBag, UserCircle2} from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import OrderForm from "./OrderForm";
import { useState } from "react";

const OrdersList = () => {
  const {toggleFeaturedOrder, orders } = useProductStore();
  const [selectedOrder, setSelectedUser] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleEditClick = (auser) => {
    setSelectedUser(auser);
    setShowOrderForm(true);
  };
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Address
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Total Price
            </th>
            
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Featured
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {orders?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <UserCircle2 className="h-10 w-10" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {order.user.Frist_Name} {order.user.Last_Name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order.user.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.user.address}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.totalAmount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedOrder(order._id)}
                  className={`p-1 rounded-full ${
                    order.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <LucidePackageCheck className="h-5 w-5" />
                </button>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditClick(order)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <LucideShoppingBag className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showOrderForm && <OrderForm order={selectedOrder} />}
    </motion.div>
  );
};
export default OrdersList;
