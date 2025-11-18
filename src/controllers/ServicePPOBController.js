class ServicePPOBController {
  constructor(service, repositories) {
    this.servicesPPOBService = service.servicesPPOBService;
    this.getServicePPOB = this.getServicePPOB.bind(this);
  }

  getServicePPOB = async (req, res, next) => {
    try {
      const result = await this.servicesPPOBService.getAllServicesPPOB();

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ServicePPOBController;
