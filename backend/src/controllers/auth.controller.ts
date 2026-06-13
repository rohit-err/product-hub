import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import { AuthRequest } from '../middleware/auth';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    const user = await User.create({ name, email, mobile, password });
    const token = generateToken((user._id as object).toString());

    res.status(201).json({
      message: 'Registration successful',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken((user._id as object).toString());

    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  res.json({ user: req.user });
};
