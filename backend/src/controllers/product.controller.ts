import { Response } from 'express';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const getProducts = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const addProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, price, image, description } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
      createdBy: req.user!._id,
    });

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, image, description } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    await product.save();

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const toggleLike = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const isLiked = product.likedBy.some((uid) => uid.toString() === userId.toString());

    if (isLiked) {
      product.likedBy = product.likedBy.filter((uid) => uid.toString() !== userId.toString());
    } else {
      product.likedBy.push(userId);
    }

    await product.save();
    res.json({ message: isLiked ? 'Product unliked' : 'Product liked', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const getLikedProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const products = await Product.find({ likedBy: userId }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};
