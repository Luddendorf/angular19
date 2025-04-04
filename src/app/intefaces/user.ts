import { Address } from "./address";
import { Album } from "./album";
import { Company } from "./company";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  album?: Album;
}