import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Auth } from '../entity/auth.entity';
import { TokenPayload } from '../type/token-payload';

@Injectable()
export class AuthRepository extends Repository<Auth> {
  constructor(private dataSource: DataSource) {
    super(Auth, dataSource.createEntityManager());
  }

  async upsertUserAuth({
    accessToken,
    expiresIn,
    payload,
  }: {
    accessToken: string;
    expiresIn: number;
    payload: TokenPayload;
  }): Promise<Auth> {
    /**
     * update or create current single token record
     * upsert maybe used for multiple tokens per user
     */
    return this.save(
      this.create({
        accessId: payload.accessId,
        persona: { userId: payload.personaId },
        accessToken,
        expiresIn,
        expiredAt: this.getExpiredAt(payload.exp),
      }),
    );
  }

  async getValidToken(payload: TokenPayload) {
    return this.findOne({
      where: {
        accessId: payload.accessId,
        expiredAt: this.getExpiredAt(payload.exp),
      },
    });
  }

  getExpiredAt(exp: number) {
    return new Date(exp * 1000);
  }
}
