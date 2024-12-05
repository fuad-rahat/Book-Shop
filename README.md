
# **Book Shop B4A2V1**


## **Project Overview**

Book Shop B4A2V1 is a RESTful API application built with **Express.js** and **TypeScript**, designed to manage a book store. The application integrates **MongoDB** with **Mongoose** to perform database operations. The API allows users to manage books and orders efficiently, ensuring robust validation and smooth inventory management.

---

## **Features**

- **CRUD Operations**: Create, Read, Update, and Delete books and orders.
- **Inventory Management**: Automatically updates stock availability when books are ordered.
- **Order Management**: Create orders with proper validation.
- **Revenue Calculation**: Aggregate revenue generated from all orders.
- **Error Handling**: Provides detailed and structured error responses.
- **Search Functionality**: Search books by title, author, or category.

---

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB, Mongoose
- **Validation**: Mongoose schema validation

---

## **Setup Instructions**



### **Steps to Set Up the Project Locally**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/fuad-rahat/Book-Shop.git
   cd Book-Shop
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

5. **Test the Application**
   Use tools like **Postman** or **cURL** to interact with the API.

---

## **API Endpoints**

### **Books**

| Endpoint                  | Method | Description                              |
|---------------------------|--------|------------------------------------------|
| `/api/products`           | POST   | Create a new book                        |
| `/api/products`           | GET    | Retrieve all books or search by query    |
| `/api/products/:productId`| GET    | Retrieve details of a specific book      |
| `/api/products/:productId`| PUT    | Update a book's details                  |
| `/api/products/:productId`| DELETE | Delete a specific book                   |

### **Orders**

| Endpoint            | Method | Description                               |
|---------------------|--------|-------------------------------------------|
| `/api/orders`       | POST   | Place a new order                         |
| `/api/orders/revenue`| GET   | Calculate total revenue from all orders   |

---

## **Error Handling**

The API provides structured error responses for validation failures, missing resources, or insufficient stock.

### Example Response:
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError"
      }
    }
  },
  "stack": "Error stack trace"
}
```
