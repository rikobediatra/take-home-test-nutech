const _ = require('lodash');
const ApiResponse = require('../utils/ApiResponse');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/encrypt');

class MembershipService {
  constructor(repositories, services) {
    this.membershipRepository = repositories.membershipRepository;
    this.services = services;
  }

  async register(payload) {
    const { email, password } = payload;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new AppError(400, 102, 'Parameter email tidak sesuai format');
    }

    if (!password || password.length < 8) {
      throw new AppError(400, 102, 'Password minimal 8 karakter');
    }

    const hashedPassword = await hashPassword(password);
    payload.password = hashedPassword;

    await this.membershipRepository.insert(payload);

    return {
      httpCode: 200,
      body: ApiResponse.success({ message: 'Registrasi berhasil silahkan login', data: null }),
    };
  }

  async login(payload) {
    const { email, password } = payload;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError(400, 102, 'Parameter email tidak sesuai format');
    }

    if (!password || password.length < 8) {
      throw new AppError(401, 103, 'Username atau password salah');
    }

    const user = await this.membershipRepository.findByEmail(email);
    const userPassword = _.get(user, 'password', '');
    const match = await comparePassword(password, userPassword);

    if (!user || !match) {
      throw new AppError(401, 103, 'Username atau password salah');
    }

    const tokens = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return {
      httpCode: 200,
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
      body: ApiResponse.success({ message: 'Login Sukses', data: { token: tokens } }),
    };
  }

  async getProfile(email) {
    const user = await this.membershipRepository.findByEmail(email);

    if (!email || !user) {
      throw new AppError(401, 108, 'Token tidak valid atau kadaluwarsa');
    }

    const { idMembership, password, ...safeUser } = user;

    return {
      httpCode: 200,
      body: ApiResponse.success({
        message: 'Sukses',
        data: { ...safeUser },
      }),
    };
  }

  async updateProfile(email, payload) {
    try {
      const allowedFields = ['first_name', 'last_name', 'profile_image'];

      const user = await this.membershipRepository.findByEmail(email);

      const updateData = {};
      for (const field of allowedFields) {
        if (payload[field] !== undefined && payload[field] !== null) {
          updateData[field] = payload[field];
        }
      }

      if (Object.keys(updateData).length === 0) {
        /* RETURN DATA DEFAULT USER */
        const { idMembership, password, ...safeUser } = user;
        return {
          httpCode: 200,
          body: ApiResponse.success({
            message: 'Update Pofile berhasil',
            data: { ...safeUser },
          }),
        };
      }

      await this.membershipRepository.updateProfile(user.idMembership, updateData);

      const updatedUser = await this.membershipRepository.findByEmail(email);
      const { idMembership, password, ...safeUser } = updatedUser;

      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Update Pofile berhasil',
          data: { ...safeUser },
        }),
      };
    } catch (error) {
      throw new AppError(401, 108, 'Token tidak valid atau kadaluwarsa');
    }
  }

  async updateProfileImage(email, file) {
    try {
      if (!file) {
        throw new AppError(400, 102, 'Format Image tidak sesuai');
      }
      
      const user = await this.membershipRepository.findByEmail(email);
      if (!email || !user) {
        throw new AppError(401, 108, 'Token tidak tidak valid atau kadaluwarsa');
      }

      const fileName = `uploads/${file.filename}`;

      await this.membershipRepository.updateProfile(user.idMembership, {
        profile_image: fileName,
      });

      const updatedUser = await this.membershipRepository.findByEmail(email);
      const { idMembership, password, ...safeUser } = updatedUser;

      return {
        httpCode: 200,
        body: ApiResponse.success({
          message: 'Update Profile Image berhasil',
          data: safeUser,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MembershipService;
