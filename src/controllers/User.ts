import {User} from '../entities/User'
import express from 'express'


const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {getUser}