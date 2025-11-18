class TransactionsController {
  constructor(services, repositories) {
    this.transactionsService = services.transactionsService;
    this.getUserBalanceByMemberId = this.getUserBalanceByMemberId.bind(this);
    this.topUpBalance = this.topUpBalance.bind(this);
    this.upsertTransaction = this.upsertTransaction.bind(this);
    this.getTransactionHistory = this.getTransactionHistory.bind(this);
  }

  getUserBalanceByMemberId = async (req, res, next) => {
    try {
      const email = req.user.email;

      const result = await this.transactionsService.getUserBalanceByMemberId(email);

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };

  topUpBalance = async (req, res, next) => {
    try {
      const email = req.user.email;
      const { top_up_amount } = req.body;
      const result = await this.transactionsService.topUpBalance(email, top_up_amount);

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };

  upsertTransaction = async (req, res, next) => {
    try {
      const email = req.user.email;
      const { service_code } = req.body;
      const result = await this.transactionsService.upsertTransaction(email, service_code);

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      next(error);
    }
  };

  getTransactionHistory = async (req, res, next) => {
    try {
      const email = req.user.email;
      const { offset, limit } = req.query;

      const result = await this.transactionsService.getTransactionHistory({ email, offset, limit });

      res.status(result.httpCode).json(result.body);
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
}

module.exports = TransactionsController;
