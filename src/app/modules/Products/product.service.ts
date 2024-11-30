import { ProductModel } from './product.model';
import { Product } from './product.interface';

class ProductServices {
  static async createProductInDB(productData: Product) {
    const product = await ProductModel.createProduct(productData);
    return product;
  }

  static async getAllBooksFromDB(searchTerm: string | undefined) {
    if (searchTerm) {
      return ProductModel.findByCategory(searchTerm);
    }
    return ProductModel.find();
  }

  static async getSingleBookFromDB(productId: string) {
    const singleProduct = await ProductModel.findById(productId);
    return singleProduct;
  }

  static async updateBookInDB(productId: string, updateData: Partial<Product>) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    return updatedProduct;
  }

  static async deleteBookFromDB(productId: string) {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  }
}

export { ProductServices };
