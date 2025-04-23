module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ลบ foreign key constraint จาก UserId
    await queryInterface.removeConstraint(
      'Transactions',
      'transactions_ibfk_1'
    ); // ถ้า constraint ชื่อว่า 'transactions_ibfk_1'
  },

  down: async (queryInterface, Sequelize) => {
    // เพิ่ม foreign key constraint กลับ
    await queryInterface.addConstraint('Transactions', {
      fields: ['UserId'], // แก้ไขให้ตรงกับคอลัมน์ที่เป็น foreign key
      type: 'foreign key',
      name: 'transactions_ibfk_1', // ถ้าชื่อ constraint คือ 'transactions_ibfk_1'
      references: {
        table: 'Users',
        field: 'id', // อ้างอิงกับ 'id' ของตาราง Users
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};
