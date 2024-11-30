import { Schema, model, Model } from 'mongoose';
import { Product } from './product.interface';

const ProductSchema = new Schema<Product>({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      message: '{VALUE} is not a valid category',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a positive number'],
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Pre-save  to set inStock based on the quantity
ProductSchema.pre('save', function (next) {
  this.inStock = this.quantity > 0;
  next();
});
//static methods
ProductSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as { quantity: number; inStock: boolean }; 
  if (update && update.quantity !== undefined) {
    update.inStock = update.quantity > 0;
  }
  next();
});

// static method to find products by category 
ProductSchema.statics.findByCategory = function (category: string) {
  const lowerCaseCategory = category.toLowerCase();
  return this.find({ category: lowerCaseCategory }).exec();
};

// Static method to update product stock after an order
ProductSchema.statics.updateStock = async function (productId: string, quantity: number) {
  const product = await this.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < quantity) {
    throw new Error('Not enough stock available');
  }

  product.quantity -= quantity;
  product.inStock = product.quantity > 0;
  await product.save();
  
  return product;
};

// Custom method to create a new product
ProductSchema.statics.createProduct = async function (data: Product) {
  const product = new this(data);
  await product.save();
  return product;
};

// Post-save hook to log when a product is created
ProductSchema.post('save', function (doc) {
  console.log(`Product "${doc.title}" was created.`);
});

interface ProductModel extends Model<Product> {
  findByCategory(category: string): Promise<Product[]>;
  createProduct(data: Product): Promise<Product>;
  updateStock(productId: string, quantity: number): Promise<Product>;
}

// Create and export the Product model
export const ProductModel = model<Product, ProductModel>('Product', ProductSchema);