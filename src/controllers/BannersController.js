class BannersController {
  constructor(service, repositories) {
    this.bannersService = service.bannersService;
    this.getBanners = this.getBanners.bind(this);
  }

  getBanners = async (req, res, next) => {
    try {
      const result = await this.bannersService.getAllBanners();

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = BannersController;
