import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { __prod__ } from './constants';
// import express from 'express';
// import User from './models/User/User';
import ormconfig from './ormconfig';
import { UsersResolver } from './resolvers/users';
// import { resolvers } from './schema/resolvers';
// import { typeDefs } from './schema/type-defs';

const main = async () => {
  dotenv.config();
  const orm = await new DataSource(ormconfig).initialize();
  // const user: Repository<User> = orm.getRepository(User);

  // console.log({ user });
  // console.log({ orm });
  // orm.destroy();

  // Express REST API
  /*
    const app = express();
  
    app.get('/', (_req, res) => {
      res.send({ message: 'You made it!' });
    });
  
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Listening on port ${process.env.PORT || 8080}`);
    });
  */

  // GraphQL type API

  // Every query we define on our root Query type will exist within this typeDefs var we have here
  // All the functions that 'resolve' those queries and do actual work (deal with the data) will exist within our resolvers object
  // const server = new ApolloServer({ typeDefs, resolvers });

  // Alternative method, utilizing the type-graphql syntax with decorators
  // We will need to "build" our schema using the buildSchema() method provided by type-graphql
  // which will interpret the type-graphql decorators we used in our resolver class(es) provided
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UsersResolver],
      validate: false,
    }),
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`GraphQL API running on ${url}`);
  });
};

main().catch((e) => console.error(e));
