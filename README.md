1. Clone โปรเจคลงในเครื่องของคุณ:

   ```bash
   git clone https://github.com/Karn12003/backend-skuberg.git
   cd backend-skuberg

2. install:
    ```bash
    npm install

3. run:
    ```bash
    node app.js


4.ER diagram
<img width="528" alt="image" src="https://github.com/user-attachments/assets/9b53e8da-2879-4341-ae41-08f19bee3354" />



# Crypto Exchange API Documentation

## 1. Get All Users
- **Endpoint:** `GET /api/users`
- **Description:** Fetch a list of all users.

### Response:
- **200 OK** - List of users (if available).

### Example cURL Request:
```bash
curl -X GET http://localhost:3000/api/users
```

---

## 2. Create User
- **Endpoint:** `POST /api/users`
- **Description:** Create a new user.

### Request Body:
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```

### Response:
- **201 Created** - User successfully created.

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username": "testuser", "email": "testuser@example.com", "password": "password123"}'
```

---

## 3. Get User by ID
- **Endpoint:** `GET /api/users/{id}`
- **Description:** Fetch a specific user by their ID.

### Response:
- **200 OK** - User found.
- **404 Not Found** - User does not exist.

### Example cURL Request:
```bash
curl -X GET http://localhost:3000/api/users/1
```

---

## 4. Update User Info
- **Endpoint:** `PUT /api/users/{id}`
- **Description:** Update user information.

### Request Body:
```json
{
  "username": "updateduser",
  "email": "updateduser@example.com",
  "password": "newpassword123"
}
```

### Response:
- **200 OK** - User information successfully updated.

### Example cURL Request:
```bash
curl -X PUT http://localhost:3000/api/users/1 -H "Content-Type: application/json" -d '{"username": "updateduser", "email": "updateduser@example.com", "password": "newpassword123"}'
```

---

## 5. Delete User
- **Endpoint:** `DELETE /api/users/{id}`
- **Description:** Delete a user by their ID.

### Response:
- **200 OK** - User successfully deleted.
- **404 Not Found** - User does not exist.

### Example cURL Request:
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

---

## 6. Create Wallet
- **Endpoint:** `POST /api/wallets`
- **Description:** Create a new wallet for a user.

### Request Body:
```json
{
  "userId": 1,
  "balance": 1000.00
}
```

### Response:
- **201 Created** - Wallet successfully created.

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/api/wallets -H "Content-Type: application/json" -d '{"userId": 1, "balance": 1000.00}'
```

---

## 7. Get Wallet Info
- **Endpoint:** `GET /api/wallets/{id}`
- **Description:** Fetch a wallet by its ID.

### Response:
- **200 OK** - Wallet information.
- **404 Not Found** - Wallet not found.

### Example cURL Request:
```bash
curl -X GET http://localhost:3000/api/wallets/1
```

---

## 8. Create Cryptocurrency
- **Endpoint:** `POST /api/cryptocurrencies`
- **Description:** Create a new cryptocurrency.

### Request Body:
```json
{
  "name": "Bitcoin",
  "symbol": "BTC"
}
```

### Response:
- **201 Created** - Cryptocurrency successfully created.

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/api/cryptocurrencies -H "Content-Type: application/json" -d '{"name": "Bitcoin", "symbol": "BTC"}'
```

---

## 9. Create Transaction
- **Endpoint:** `POST /api/transactions`
- **Description:** Create a new transaction.

### Request Body:
```json
{
  "userId": 1,
  "cryptocurrencyId": 1,
  "amount": 0.5,
  "type": "buy",
  "status": "completed"
}
```

### Response:
- **201 Created** - Transaction successfully created.

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/api/transactions -H "Content-Type: application/json" -d '{"userId": 1, "cryptocurrencyId": 1, "amount": 0.5, "type": "buy", "status": "completed"}'
```

---

## 10. Buy Cryptocurrency
- **Endpoint:** `POST /api/cryptocurrencies/buy`
- **Description:** Buy cryptocurrency for a user.

### Request Body:
```json
{
  "userId": 1,
  "cryptocurrencyId": 1,
  "amount": 0.5,
  "fiatCurrency": "USD",
  "paymentMethod": "credit_card"
}
```

### Response:
- **201 Created** - Purchase successfully completed.

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/api/cryptocurrencies/buy -H "Content-Type: application/json" -d '{ "userId": 1, "cryptocurrencyId": 1, "amount": 0.5, "fiatCurrency": "USD", "paymentMethod": "credit_card" }'
```

---

This document covers all the necessary API endpoints for creating, updating, deleting, and interacting with users, wallets, cryptocurrencies, and transactions in the crypto exchange system.

