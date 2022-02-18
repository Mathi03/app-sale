import Product from '../models/product.model';

export const createProduct = async (req, res) => {
  const { name, barcode, price, imgURL } = req.body;

  try {
    const newProduct = new Product({
      name,
      barcode,
      price,
      imgURL
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json(product);
};

export const getProducts = async (req, res) => {
  let products = await Product.find();
  const { searchBarcode } = req.query;
  if (req.query.searchBarcode) {
    products = await Product.find({ barcode: searchBarcode });
    return res.status(200).json(products);
  }
  return res.status(200).json(products);
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    // Devuelve los datos con los nuevos cambios
    {
      new: true
    }
  );
  res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  res.status(204).json();
};
