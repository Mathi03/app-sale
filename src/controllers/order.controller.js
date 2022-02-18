import Order from '../models/order.model';
import Product from '../models/product.model';

export const createOrder = async (req, res) => {
  const { user, products } = req.body;

  try {
    const productsFound = await Product.find({ _id: { $in: products } });
    const newOrder = new Order({
      user,
      products: productsFound
    });
    newOrder.total = productsFound
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr, 0);

    const orderSaved = await newOrder.save();

    res.status(201).json(orderSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  res.status(200).json(order);
};

export const getOrders = async (req, res) => {
  let orders = await Order.find().populate('user').populate('products');
  const { searchId } = req.query;
  if (req.query.searchId) {
    orders = await Order.findById(searchId);
    return res.status(200).json(orders);
  }
  return res.status(200).json(orders);
};

export const updateOrderById = async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.orderId,
    req.body,
    {
      new: true
    }
  );
  res.status(200).json(updatedOrder);
};

export const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;

  await Order.findByIdAndDelete(orderId);

  res.status(204).json();
};
