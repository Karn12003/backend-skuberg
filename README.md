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


# Create the combined API documentation in markdown format and save it to a file

api_documentation = """
# Crypto Exchange API Documentation

## 1. Get All Users
- **Endpoint:** `GET /api/users`
- **Description:** Fetch a list of all users.

### Response:
- **200 OK** - List of users (if available).

### Example cURL Request:
```bash
curl -X GET http://localhost:3000/api/users
