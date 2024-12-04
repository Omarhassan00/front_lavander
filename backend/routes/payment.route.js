import express from "express";
import Order from "../models/order.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import SibApiV3Sdk from "sib-api-v3-sdk";
// import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";


// router.post("/create-checkout-session", protectRoute, createCheckoutSession);
// router.post("/checkout-success", protectRoute, checkoutSuccess);
import axios from 'axios';

const router = express.Router();
const paymobApiUrl = 'https://accept.paymobsolutions.com/api';
const apiKey = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBd056ZzRNQ3dpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5jZmMwQVN3bVFDM3RxaktGaGctWlRTeEhraDlsTkM5Qlo1MGVXbU9taTJwQ2F2ZnB1MC15RXF2SEVFd09VRXFLQ19WMjh0RUF2TXZLX0JjdWNCQm5hdw=='; // ضع مفتاح API الخاص بك هنا
const integrationId = '4884490'; // استبدل بـ Integration ID الخاص بك
// const iframeId = '883109'; // استبدل بـ Iframe ID الخاص بك

// 1. بدء عملية الدفع
router.post('/start-payment', protectRoute, async (req, res) => {
    try {
        const { products } = req.body;
        const user = req.user


        if (!user.isverify) {
            return res.status(400).json({ message: "Please verify your account" });
        }

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0;

        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100);
            totalAmount += amount * product.quantity;

            return {
                product_data: {
                    name: product.name,
                    image: product.main_image,
                    quantity: product.quantity,
                    price: product.price
                }
            };
        }
        );
        // 1.1: الحصول على Auth Token
        const authResponse = await axios.post(`${paymobApiUrl}/auth/tokens`, { api_key: apiKey });
        const authToken = authResponse.data.token;

        // 1.2: إنشاء Order
        const orderResponse = await axios.post(`${paymobApiUrl}/ecommerce/orders`, {
            auth_token: authToken,
            delivery_needed: false,
            amount_cents: totalAmount, // المبلغ (بالقرش، 100 جنيه = 10000 قرش)
            currency: 'EGP',
            items: lineItems.product_data,
        });
        const orderId = orderResponse.data.id;
        console.log(`orderId : ${orderId}`);

        // 1.3: إنشاء Payment Token
        const paymentKeyResponse = await axios.post(`${paymobApiUrl}/acceptance/payment_keys`, {
            auth_token: authToken,
            amount_cents: totalAmount,
            order_id: orderId,
            billing_data: {
                first_name: user.Frist_Name,
                last_name: user.Last_Name,
                email: user.email,
                phone_number: user.number,
                city: user.city,
                country: 'EG',
                street: user.address,
                building: '1',
                floor: '1',
                apartment: '1'

            },
            currency: 'EGP',
            integration_id: integrationId,
        });
        const paymentToken = paymentKeyResponse.data.token;
        console.log(`paymentToken : ${paymentToken}`);

        // const { order } = req.query;
        // const user = req.user;
        // // create a new Order
        // const products = user.cartItems;
        
        const newOrder = await Order.create({
            user: user.id,
            products: [...products.map((oneproduct) => ({
                product: oneproduct._id,
                productname: oneproduct.name,
                productimage: oneproduct.main_image,
                quantity: oneproduct.quantity,
                price: oneproduct.price,
            }))],
            totalAmount: totalAmount,
            stripeSessionId: orderId
        });

        await newOrder.save()

console.log("order created");

user.cartItems = [];
await user.save();
console.log("user cart items cleared");

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

await tranEmailApi.sendTransacEmail({
    sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
    to: [{ "name": `${user.Frist_Name} ${user.Last_Name}`, "email": `${user.email}` }],
    subject: "order confirmetion",
    htmlContent: ` <h2>your order confermed</h2>
                    <p>Dear ${user.Frist_Name},</p>
                    </br>
                    <p>Thank you for chosen our brand.</p>
                    <p>your order confermed succesfully with order number : ${orderId}</p>
                    <p>If you had any proplem please let us know.</p>
                    <p>Best regards,</p>
                    <p>Lavander website</p>`
})

await tranEmailApi.sendTransacEmail({
    sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
    to: [{ "name": `loay ashraf`, "email": `loayoffice80@gmail.com` }],
    subject: "verify your account",
    htmlContent: ` <h2>Verify Your Account</h2>
                    <p>Dear Loay,</p>
                    </br>
                    <p>there is a new order created from : ${user.email}</p>
                    <p>with order number : 646549</p>
                    <p>the order is :</p>
                    <pre>${newOrder}</pre>
                    </br>
                    <p>Best regards,</p>
                    <p>Lavander website IT</p>`
})



// 1.4: إعادة التوجيه إلى صفحة الدفع
// const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/883110?payment_token=${paymentToken}`;
res.status(200).json(`https://accept.paymob.com/api/acceptance/iframes/883109?payment_token=${paymentToken}`);
    } catch (error) {
    console.error('Error in payment process:', error.response?.data || error.message);
    res.status(500).send('Failed to start payment process');
}
});

// 2. استقبال إشعار Webhook لتأكيد الدفع
router.post('/webhook', (req, res) => {
    try {
        const webhookData = req.body;

        if (webhookData.obj === 'transaction' && webhookData.type === 'TRANSACTION') {
            const paymentStatus = webhookData.success; // True لو الدفع ناجح
            const orderId = webhookData.order.id;
            const transactionId = webhookData.id;

            if (paymentStatus) {
                console.log(`Payment Successful: Order ID=${orderId}, Transaction ID=${transactionId}`);

                // هنا يمكنك تحديث الداتابيز بحالة "تم الدفع"
            } else {
                console.log(`Payment Failed: Order ID=${orderId}`);
                // هنا يمكنك تسجيل حالة الدفع الفاشل
            }

            res.status(200).send('Webhook received');
        } else {
            console.log('Invalid Webhook Data');
            res.status(400).send('Invalid Webhook Data');
        }
    } catch (error) {
        console.error('Error handling webhook:', error.message);
        res.status(500).send('Server error');
    }
});

// 3. عرض صفحة النجاح أو الفشل بناءً على حالة الدفع
router.get('/payment-status', async (req, res) => {
    const { success } = req.query; // قراءة حالة الدفع من الـ URL
    const success_url = `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = `${process.env.CLIENT_URL}/purchase-cancel`
    if (success === 'true') {
        console.log(`${success} is true`);
        //     console.log('success');
        //     try {
        //         const { order } = req.query;
        //         const user = req.user;
        //         // create a new Order
        //         const products = user.cartItems;
        //         const newOrder = new Order({
        //             user: user._id,
        //             products: products.map((product) => ({
        //                 product: product.id,
        //                 productname: product.name,
        //                 productimage: product.image,
        //                 quantity: product.quantity,
        //                 price: product.price,
        //             })),
        //             totalAmount: totalAmount / 100, // convert from cents to dollars,
        //         });

        //         await newOrder.save();


        //         const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

        //         await tranEmailApi.sendTransacEmail({
        //             sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
        //             to: [{ "name": `${user.Frist_Name} ${user.Last_Name}`, "email": `${user.email}` }],
        //             subject: "order confirmetion",
        //             htmlContent: ` <h2>your order confermed</h2>
        //         <p>Dear ${user.Frist_Name},</p>
        //         </br>
        //         <p>Thank you for chosen our brand.</p>
        //         <p>your order confermed succesfully with order number : ${sessionId}</p>
        //         <p>If you had any proplem please let us know.</p>
        //         <p>Best regards,</p>
        //         <p>Lavander website</p>`
        //         })

        //         await tranEmailApi.sendTransacEmail({
        //             sender: { "name": "Lavander Website", "email": "omarhassan00123@gmail.com" },
        //             to: [{ "name": `loay ashraf`, "email": `loayoffice80@gmail.com` }],
        //             subject: "verify your account",
        //             htmlContent: ` <h2>Verify Your Account</h2>
        //         <p>Dear Loay,</p>
        //         </br>
        //         <p>there is a new order created from : ${user.email}</p>
        //         <p>with order number : ${order}</p>
        //         <p>the order is :</p>
        //         <pre>${newOrder}</pre>
        //         </br>
        //         <p>Best regards,</p>
        //         <p>Lavander website IT</p>`
        //         })

        //         user.cartItems = [];
        //         await user.save();


        // res.redirect(success_url);
        //  } catch (error) {
        // console.error("Error processing successful checkout:");
        // res.status(500).json({ message: "Error processing successful checkout" });
    }
    if (success === 'false') {
        console.log(`${success} is false`);

    }

    // res.sendFile(__dirname + '/success.html'); // صفحة الدفع الناجح
    else {
        console.log(`${success} is failed`);

        // console.log('failed');
        // res.sendFile(__dirname + '/failure.html'); // صفحة الدفع الفاشل
        // res.redirect(cancel_url);
    }
});



export default router;
