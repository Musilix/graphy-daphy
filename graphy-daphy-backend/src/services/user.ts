import { DataSource } from 'typeorm';
import User from '../entities/User/User';

export const getUsers = async (ctx: DataSource) => {
  return await ctx.getRepository(User).find();
};
