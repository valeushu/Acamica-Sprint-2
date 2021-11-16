import Product from "../models/product.js";
import client from '../redis.js'

export const createProduct = async (req, res) => {
  const { name, description, price, imgUrl } = req.body;
  const newProduct = new Product({ name,description, price, imgUrl });
  const productSaved = await newProduct.save();

  res.status(201).json({
    productSaved,
  });
};

export const getProducts = async (req, res) => {
  client.get('products', async (error, rep) => {
    if (error) {
      res.json(error)
    }
    if (rep) {
      res.json({products: rep})
    }else{
      const products = await Product.find();
      console.log('consulta a la base de datos'+ products)
      client.set('products', JSON.stringify(products), 'EX', '60')
      res.json({ products: products });
    }
  }) 
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ "update product": updateProduct });
};

export const deleteProductById = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.send("product deleted");
};
