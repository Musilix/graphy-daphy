// import User from 'src/entities/User/User';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  users() {
    return 'dummy guy';
  }
}
