import { JsonWebTokenError, JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';
// import 'dotenv/config';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';
  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): JwtPayload {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      throw new JsonWebTokenError('Token must be a valid token');
    }
  }
}
