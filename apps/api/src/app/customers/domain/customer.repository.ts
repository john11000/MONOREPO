import { Customer } from './customer';

export interface CustomerRepository {
  exists: (email: string) => Promise<boolean>;
  create: (customer: Customer) => Promise<void>;
  findAll: () => Promise<Customer[]>;
  findById: (id: string) => Promise<Customer | null>;
  update: (customer: Customer) => Promise<void>;
}
