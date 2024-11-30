import { Request, Response } from 'express';
import { ProductServices } from '../Products/product.service';
import productValidationSchema from '../Products/product.validation';

const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { product: productData } = req.body;
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductInDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = req.query.searchTerm?.toString();
    const result = await ProductServices.getAllBooksFromDB(query);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;

    if (!productId || productId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID',
      });
    }

    const result = await ProductServices.getSingleBookFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const updateBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;
    const { price, quantity } = req.body;
    const result = await ProductServices.updateBookInDB(productId, {
      price,
      quantity,
    });

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(500).json({
        success: false,
        message: 'There is no book available to delete',
      });
    }
    const result = await ProductServices.deleteBookFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
