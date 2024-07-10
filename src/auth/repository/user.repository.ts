import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { UserSignupDto } from 'src/auth/dto/user-signup.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUniqueOrFail(
    userSignupDto: UserSignupDto,
    exception: HttpException,
  ): Promise<User | null> {
    const user = await this.findOne({ where: { email: userSignupDto.email } });
    if (user) throw exception;
    return this.save(this.create(userSignupDto));
  }
}
