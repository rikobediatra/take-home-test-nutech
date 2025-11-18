const db = require('../config/db');

class MembershipRepository {
  async insert(data) {
    const { email, first_name, last_name, password } = data;
    const [result] = await db.query(
      `INSERT INTO membership (email, first_name, last_name, password)
       VALUES (?, ?, ?, ?)`,
      [email, first_name, last_name, password],
    );
    return result;
  }

  async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT idMembership, email, first_name, last_name, profile_image, password FROM membership WHERE email = ? LIMIT 1',
      [email],
    );
    return rows[0] || null;
  }

  async updateProfile(idMembership, data) {
    const keys = Object.keys(data);

    if (keys.length === 0) return;

    const fields = keys.map((key) => `${key} = ?`).join(', ');
    const values = Object.values(data);

    const sql = `
    UPDATE membership
    SET ${fields}
    WHERE idMembership = ?
  `;

    await db.query(sql, [...values, idMembership]);
  }
}

module.exports = MembershipRepository;
