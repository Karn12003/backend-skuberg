# Crypto Exchange System

โปรเจคนี้เป็นระบบการแลกเปลี่ยน Cryptocurrencies ที่สามารถทำการซื้อ-ขาย Bitcoin, Ethereum, XRP, Dogecoin โดยใช้เงิน Fiat (THB, USD) และสามารถทำการโอนเหรียญภายในระบบหรือนอกระบบได้

## ขั้นตอนการตั้งค่าโปรเจค

1. **โคลนโปรเจค**:
   เปิด Terminal แล้วใช้คำสั่งนี้เพื่อโคลนโปรเจค:
   ```bash
   git clone git@github.com:Karn12003/backend-skuberg.git
   cd crypto-exchange-skuberg
ติดตั้ง Dependencies: ใช้คำสั่งนี้เพื่อติดตั้ง dependencies ที่จำเป็น:

bash
Copy
Edit
npm install
ตั้งค่าฐานข้อมูล MySQL:

สร้างฐานข้อมูล crypto-exchange ใน MySQL

แก้ไขไฟล์ models/index.js เพื่อเชื่อมต่อกับฐานข้อมูลของคุณ (กรณีที่มีการเปลี่ยนแปลง username, password, หรือชื่อฐานข้อมูล)

ซิงค์ฐานข้อมูล: ก่อนที่จะรันโปรเจค, ให้ทำการซิงค์ฐานข้อมูลด้วยคำสั่ง:

bash
Copy
Edit
node app.js
รันโปรเจค: หลังจากซิงค์ฐานข้อมูลเสร็จแล้ว, ใช้คำสั่งนี้เพื่อรันโปรเจค:

bash
Copy
Edit
node app.js
เซิร์ฟเวอร์จะเริ่มทำงานที่ http://localhost:3000

การทดสอบ API
สามารถทดสอบ API ที่คุณสร้างขึ้นได้ด้วยการใช้ Postman หรือ curl:

ตัวอย่างการใช้งาน API:
สร้างผู้ใช้งาน:

bash
Copy
Edit
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username": "john", "email": "john@example.com", "password": "1234"}'
ดึงข้อมูลผู้ใช้งานทั้งหมด:

bash
Copy
Edit
curl http://localhost:3000/api/users
ความสามารถของระบบ
การสร้างผู้ใช้งาน

การสร้าง Wallet

การสร้างและจัดการ Cryptocurrencies

การทำธุรกรรมซื้อ/ขาย Cryptocurrencies

การตรวจสอบข้อมูลผู้ใช้งาน, Wallet และ Transactions

ข้อควรระวัง
โปรดตรวจสอบให้แน่ใจว่า MySQL เซิร์ฟเวอร์ของคุณทำงานอยู่และเชื่อมต่อกับโปรเจคได้สำเร็จ

ในการทดสอบ API ซื้อ/ขาย cryptocurrency, คุณต้องแน่ใจว่าผู้ใช้งานมีเงินใน Wallet เพียงพอ

