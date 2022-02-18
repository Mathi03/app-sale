import Product from "../models/product.model";

const checkDuplicateBarcode = async (req, res, next) => {
  try {
    const product= await Product.findOne({ barcode: req.body.barcode});
    if (product)
      return res.status(400).json({ message: "The barcode already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const verifyCreateProduct = {
  checkDuplicateBarcode 
};
module.exports = verifyCreateProduct;
