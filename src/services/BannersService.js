const _ = require('lodash');
const ApiResponse = require('../utils/ApiResponse');

class BannersService {
  constructor(repositories, services) {
    this.bannersRepository = repositories.bannersRepository;
    this.services = services;
  }

  async getAllBanners() {
    try {
      const banners = await this.bannersRepository.getAllBanners();
      const filteredBanners = _.map(banners, (obj) =>
        _.pick(obj, ['banner_name', 'banner_image', 'description']),
      );
      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Sukses',
          data: filteredBanners,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BannersService;
