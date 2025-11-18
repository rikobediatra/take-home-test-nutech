const _ = require('lodash');
const ApiResponse = require('../utils/ApiResponse');

class ServicesPPOBService {
  constructor(repositories, services) {
    this.servicesPPOBRepository = repositories.servicesPPOBRepository;
    this.services = services;
  }

  async getAllServicesPPOB() {
    try {
      const servicesPPOB = await this.servicesPPOBRepository.getAllServicesPPOB();
      const filteredServicePPOB = _.map(servicesPPOB, (obj) =>
        _.pick(obj, ['service_code', 'service_name', 'service_icon', 'service_tariff']),
      );
      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Sukses',
          data: filteredServicePPOB,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicesPPOBService;
