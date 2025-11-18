const _ = require('lodash');
const ApiResponse = require('../utils/ApiResponse');
const AppError = require('../utils/AppError');
const db = require('../config/db');

class TransactionsService {
  constructor(repositories, services) {
    this.transactionsRepository = repositories.transactionsRepository;
    this.membershipRepository = repositories.membershipRepository;
    this.services = services;
  }

  async getUserBalanceByMemberId(email) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const user = await this.membershipRepository.findByEmail(email);
      if (!user) {
        throw new AppError(401, 108, 'Token tidak tidak valid atau kadaluwarsa');
      }

      const membershipBalance = await this.transactionsRepository.getUserBalanceByMemberId(
        user.idMembership,
        connection,
      );
      const balance = _.get(membershipBalance, 'balance', null);

      await connection.commit();

      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Get Balance Berhasil',
          data: balance,
        }),
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async topUpBalance(email, top_up_amount) {
    const amount = top_up_amount;
    if (isNaN(amount) || amount <= 0) {
      throw new AppError(
        400,
        102,
        'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
      );
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const user = await this.membershipRepository.findByEmail(email);
      if (!user) {
        throw new AppError(401, 108, 'Token tidak tidak valid atau kadaluwarsa');
      }

      const membershipBalance = await this.transactionsRepository.getUserBalanceByMemberId(
        user.idMembership,
        connection,
      );
      const idBalance = membershipBalance?.idBalance ?? null;

      await Promise.all([
        this.transactionsRepository.updateBalance(user.idMembership, amount, connection),
        this.transactionsRepository.insertTransaction({ idBalance, amount, connection }),
      ]);

      const finalBalance = await this.transactionsRepository.getUserBalanceByMemberId(
        user.idMembership,
        connection,
      );

      await connection.commit();

      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Top Up Balance berhasil',
          data: { balance: finalBalance.balance },
        }),
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async upsertTransaction(email, service_code) {
    const codeSevice = service_code;
    if (!codeSevice) {
      throw new AppError(400, 102, 'Service ataus Layanan tidak ditemukan');
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const user = await this.membershipRepository.findByEmail(email, connection);
      if (!user) {
        throw new AppError(401, 108, 'Token tidak tidak valid atau kadaluwarsa');
      }
      
      const services = await this.transactionsRepository.findServicesByCode(
        codeSevice,
        connection,
      );
      if (!services) {
        throw new AppError(400, 102, 'Service ataus Layanan tidak ditemukan');
      }

      const membershipBalance = await this.transactionsRepository.getUserBalanceByMemberId(
        user.idMembership,
        connection,
      );
      const { idBalance, balance } = membershipBalance;
      if (balance === null || balance < services.service_tariff) {
        throw new AppError(400, 103, 'Saldo tidak mencukupi');
      }

      const { service_code, service_name, service_tariff } = services;
      const [finalBalance, resultTransaction] = await Promise.all([
        this.transactionsRepository.deductBalance(user.idMembership, service_tariff, connection),
        this.transactionsRepository.insertTransaction({
          idBalance,
          service_code,
          amount: service_tariff,
          transaction_type: 'PAYMENT',
          connection,
        }),
      ]);

      await connection.commit();

      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Transaksi berhasil',
          data: {
            invoice_number: resultTransaction.invoiceNumber,
            service_code: service_code,
            service_name: service_name,
            transaction_type: 'PAYMENT',
            total_amount: service_tariff,
            created_on: new Date().toISOString(),
          },
        }),
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getTransactionHistory({ email, limit, offset }) {
    const user = await this.membershipRepository.findByEmail(email);
    if (!user) {
      throw new AppError(401, 108, 'Token tidak tidak valid atau kadaluwarsa');
    }

    const transactions = await this.transactionsRepository.getTransactionHistory(
      user.idMembership,
      limit,
      offset
    );

    return {
      httpCode: 200,
      body: ApiResponse.success({
        message: 'Get History Berhasil',
        data: transactions,
      }),
    };
  }
}

module.exports = TransactionsService;
