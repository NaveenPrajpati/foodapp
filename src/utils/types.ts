export interface dishType {
  rating: number;
  _id: string; // or a more specific ObjectId type if you have a library for it
  name: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  discount: number;
  imagePath: string[];
  __v: number; // Assuming this is a version number
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  // Add more fields as needed
}

// Interface representing a Customer document
export interface customrType extends Document {
  name: string;
  phone: string;
  email?: string; // Optional email
  password: string;
  address: [string]; // Array of addresses
  orders: string; // References to Order documents
}
