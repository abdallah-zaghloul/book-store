import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSignupDto } from '../dto/user-signup.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entity/user.entity';
import { JwtConfig } from 'src/app/config';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //signup
  async signup(userSignupDto: UserSignupDto) {
    const user = await this.userRepository.createUniqueOrFail(
      userSignupDto,
      //should be non meaningful message for security
      new BadRequestException('invalid email'),
    );

    return {
      user: user,
      //@ts-expect-error it will be thrown before here
      auth: await this.auth(user.id),
    };
  }

  //login
  async login(userLoginDto: UserLoginDto) {
    const user = await this.get({ email: userLoginDto.email });

    if (!user || !(await bcrypt.compare(userLoginDto.password, user.password)))
      throw new UnauthorizedException('wrong credentials');

    return {
      user: user,
      auth: await this.auth(user.id),
    };
  }

  //get refreshed profile
  async profile(id: string) {
    const user = await this.get({ id });
    return {
      user: user,
      auth: await this.auth(user.id),
    };
  }

  //authenticate and refresh auth
  async auth(userId: string) {
    const accessToken = this.jwtService.sign({
      personaId: userId,
      accessId: userId, //we can make it UUID() for multiple user devices tokens
    });

    const payload = this.jwtService.verify(accessToken);
    const expiresIn = this.configService.get<
      JwtConfig['signOptions']['expiresIn']
    >('jwt.signOptions.expiresIn')!;

    return await this.authRepository.upsertUserAuth({
      accessToken,
      expiresIn,
      payload,
    });
  }

  async get(userProps: Partial<User>) {
    const user = await this.userRepository.findOne({ where: userProps });
    if (!user) throw new NotFoundException();
    return user;
  }

  async logout(userId: string) {
    await this.authRepository.delete({ userId });
  }
}
