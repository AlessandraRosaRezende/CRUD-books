import { JsonWebTokenError, JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';

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
      const payload = verify(token, this.secret);
      return payload as JwtPayload;
    } catch (error) {
      throw new JsonWebTokenError('Token must be a valid token');
    }
  }
}
