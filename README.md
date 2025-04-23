3. ติดตั้ง dependencies
หลังจากที่คุณมีไฟล์ package.json แล้ว ให้ติดตั้ง dependencies ทั้งหมดที่ต้องการในโปรเจคโดยใช้คำสั่ง:

bash
Copy
Edit
npm install
จะทำการติดตั้ง dotenv, express, mysql2, sequelize, swagger-jsdoc, และ swagger-ui-express

4. สร้างไฟล์ app.js
จากที่ไฟล์ package.json ของคุณตั้ง main เป็น app.js ให้สร้างไฟล์ app.js เพื่อเริ่มต้นแอปพลิเคชันของคุณ:

bash
Copy
Edit
touch app.js
5. กำหนดโครงสร้างใน app.js
ตัวอย่างโครงสร้างของไฟล์ app.js ที่ใช้ express และเชื่อมต่อกับ MySQL และ Sequelize อาจเป็นแบบนี้:

js
Copy
Edit
require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

// Database setup with Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  logging: false, // Disable logging for cleaner output
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
6. สร้าง .env สำหรับการตั้งค่าฐานข้อมูล
ไฟล์ .env จะเก็บข้อมูลการเชื่อมต่อกับฐานข้อมูล เช่น:

env
Copy
Edit
DB_URL=mysql://root:password@localhost:3306/crypto-exchange
7. สร้างฐานข้อมูล (ถ้ายังไม่มี)
ถ้ายังไม่มีฐานข้อมูล crypto-exchange ใน MySQL ให้สร้างมันขึ้นมาก่อน:

bash
Copy
Edit
mysql -u root -p
CREATE DATABASE crypto-exchange;
8. เชื่อมต่อฐานข้อมูล
เมื่อทุกอย่างพร้อมแล้ว คุณสามารถเรียกใช้โปรเจคของคุณโดยใช้คำสั่ง:

bash
Copy
Edit
node app.js
9. เพิ่มคำสั่งสำหรับการพัฒนา
คุณอาจจะเพิ่มคำสั่ง start ใน package.json เพื่อให้สามารถเริ่มต้นโปรเจคได้ง่ายขึ้น:

json
Copy
Edit
"scripts": {
  "start": "node app.js"
}
แล้วคุณสามารถรันโปรเจคได้โดย:

bash
Copy
Edit
npm start
เมื่อทำตามขั้นตอนนี้เรียบร้อยแล้ว ระบบของคุณจะสามารถเริ่มทำงานได้ตามที่กำหนด
