const db = require('../config/db');

class TransactionsRepository {
  async getUserBalanceByMemberId(idMembership, connection = db) {
    const [rows] = await connection.query(
      `SELECT mb.* 
       FROM membership m
       LEFT JOIN membership_balance mb ON m.idMembership = mb.idMembership
       WHERE m.idMembership = ?`,
      [idMembership],
    );
    return rows[0] || null;
  }

  async updateBalance(idMembership, amount, connection) {
    const [result] = await connection.query(
      'UPDATE membership_balance SET balance = balance + ? WHERE idMembership = ?',
      [amount, idMembership],
    );
    return result;
  }

  async deductBalance(idMembership, amount, connection) {
    const [result] = await connection.query(
      'UPDATE membership_balance SET balance = balance - ? WHERE idMembership = ?',
      [amount, idMembership],
    );
    return result;
  }

  async insertTransaction({ idBalance, amount, service_code = null, transaction_type = 'TOPUP', connection }) {
    const invoiceNumber = await this.generateNewInvoiceNumber(connection);
    const [result] = await connection.query(
      'INSERT INTO transactions (idBalance, invoice_number, service_code, transaction_type, total_amount, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [idBalance, invoiceNumber, service_code, transaction_type, amount],
    );
    return { result, invoiceNumber };
  }

  async getLastInvoiceNumber(year, connection = db) {
    const [rows] = await connection.query(
      `SELECT invoice_number FROM transactions
       WHERE invoice_number LIKE ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [`INV${year}/%`],
    );
    return rows[0] || null;
  }

  async generateNewInvoiceNumber(connection = db) {
    const year = new Date().getFullYear();

    const lastInvoice = await this.getLastInvoiceNumber(year, connection);

    let nextSequence = 1;
    if (lastInvoice) {
      // lastInvoice format INV2025/15
      const { invoice_number } = lastInvoice;
      const parts = invoice_number.split('/');
      const lastSequence = parseInt(parts[1], 10);
      nextSequence = lastSequence + 1;
    }

    const newInvoice = `INV${year}/${nextSequence}`;

    return newInvoice;
  }

  async findIdMembershipByEmail(email, connection = db) {
    const [rows] = await connection.query('SELECT idMembership FROM membership WHERE email = ?', [
      email,
    ]);
    return rows.length > 0 ? rows[0].idMembership : null;
  }

  async findServicesByCode(service_code, connection = this.db) {
    const [rows] = await connection.query(
      `SELECT service_code, service_name, service_tariff FROM services WHERE service_code = ?`,
      [service_code],
    );
    return rows[0] || null;
  }

  async getTransactionHistory(idMembership, limit = null, offset = 0) {
    let query = `SELECT t.invoice_number, t.service_code, s.service_name as description, t.transaction_type, t.total_amount, t.created_at as created_on
                  FROM transactions t
                  LEFT JOIN membership_balance mb ON mb.idBalance = t.idBalance
                  LEFT JOIN services s ON s.service_code = t.service_code
                  WHERE mb.idMembership = ?
                  ORDER BY t.created_at DESC`;
    const params = [idMembership];

    if (limit !== null) {
      query += ` LIMIT ? OFFSET ?`;
      params.push(parseInt(limit, 10));
      params.push(parseInt(offset, 10));
    }
    const [rows] = await db.query(query, params);
    return rows;
  }
}

module.exports = TransactionsRepository;
