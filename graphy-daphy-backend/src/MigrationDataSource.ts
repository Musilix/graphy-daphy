import { DataSource } from 'typeorm';
import ormconfig from './ormconfig';

export const MigrationDataSource = new DataSource(ormconfig);
