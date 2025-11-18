const db = require('../config/db');

class ServicesPPOBRepository {
  async getAllServicesPPOB() {
    const [result] = await db.query(`SELECT * FROM services`);
    return result;
  }
}

module.exports = ServicesPPOBRepository;
