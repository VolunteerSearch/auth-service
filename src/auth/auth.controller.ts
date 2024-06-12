import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto'; // TODO: add index for DTOs
import { SignUpDto } from './dto/sign-up.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    await this.authService.signIn(signInDto);
  }

  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto, @Res() response: Response) {
    const result = await this.authService.signUp(signUpDto);
    if (result == 0) {
      return response.status(200).send();
    }
    return response.status(400).send();
  }
}
