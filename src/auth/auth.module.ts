import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthRepository],
  //exported for AppModule (Mediator)
  exports: [AuthRepository],
})
export class AuthModule {}
