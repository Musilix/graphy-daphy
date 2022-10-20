import { MyContext } from 'src/types';
import { Ctx, Query, Resolver } from 'type-graphql';
import User from '../entities/User/User';
import * as UserService from '../services/user';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() ctx: MyContext) {
    return UserService.getUsers(ctx);
    // return 'dummy guy';
  }
}
