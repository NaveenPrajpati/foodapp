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
