import { User } from './user';

export interface UserRepository {
  findOne: (query: { email: string }) => Promise<User | null>;
}
