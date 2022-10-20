import * as dotenv from 'dotenv';
import tls, { PeerCertificate } from 'node:tls';
// import path from 'path';
import { DataSourceOptions } from 'typeorm';
import { __prod__ } from './constants';

dotenv.config();

export default {
  type: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: !__prod__,
  synchronize: !__prod__,
  ssl: getSSLConfig(),
  migrationsRun: __prod__,

  // Maybe adding some clarification, in the case of keeping sync: true for local dev, having entities point to he dist folder will work more smoothly, as we build our app, then run it, and hope for our db migrations to be propogated automatically (ONLY IN LOCAL)
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
} as DataSourceOptions;

function getSSLConfig() {
  if (process.env.SSL_CA && process.env.SSL_CERT && process.env.SSL_KEY) {
    return {
      checkServerIdentity: (nohost: string, cert: PeerCertificate) => {
        if (process.env.DB_CN) {
          return tls.checkServerIdentity(process.env.DB_CN!, cert);
        }

        return tls.checkServerIdentity(nohost, cert);
      },
      sslmode: 'verify-full',
      ca: process.env.SSL_CA.replace(/\\n/g, '\n'),
      cert: process.env.SSL_CERT.replace(/\\n/g, '\n'),
      key: process.env.SSL_KEY.replace(/\\n/g, '\n'),
    };
  }

  // no ssl on local dev
  return false;
}
