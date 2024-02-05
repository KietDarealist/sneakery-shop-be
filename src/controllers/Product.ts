import {Product} from '../entities/Product'
import express from 'express'


const getProducts = async (req: express.Request, res: express.Response) => {
  try {
    const products = await Product.find();
    res.json(products || [])
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {getProducts}