class MembershipController {
  constructor(services, repositories) {
    this.membershipService = services.membershipService;
    this.registerMembership = this.registerMembership.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updateProfileImage = this.updateProfileImage.bind(this);
  }

  registerMembership = async (req, res, next) => {
    try {
      const result = await this.membershipService.register(req.body);
      return res.status(result.httpCode).json(result.body);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const result = await this.membershipService.login(req.body);
      return res.status(result.httpCode).json(result.body);
    } catch (err) {
      next(err);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const email = req.user.email;

      const result = await this.membershipService.getProfile(email);

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const email = req.user.email;
      const payload = req.body;

      const result = await this.membershipService.updateProfile(email, payload);

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };

  updateProfileImage = async (req, res, next) => {
    try {
      const email = req.user.email;
      const result = await this.membershipService.updateProfileImage(email, req.file);

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MembershipController;
