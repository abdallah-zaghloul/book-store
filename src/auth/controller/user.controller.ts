import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserSignupDto } from 'src/auth/dto/user-signup.dto';
import { UserService } from '../service/user.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { AuthGuard } from '../../app/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() userSignupDto: UserSignupDto) {
    return this.userService.signup(userSignupDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req: any) {
    return this.userService.profile(req.personaId);
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refresh(@Req() req: any) {
    //profile is refreshed
    return this.userService.profile(req.personaId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.userService.logout(req.personaId);
  }
}
