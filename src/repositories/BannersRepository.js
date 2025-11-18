const db = require('../config/db');

class BannersRepository {
  async getAllBanners() {
    const [result] = await db.query(`SELECT * FROM banners`);
    return result;
  }
}

module.exports = BannersRepository;
