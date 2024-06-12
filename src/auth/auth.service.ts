import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosError } from "axios";
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  async signIn(signInDto: SignInDto) {
    try {
      const response = await axios.get(`http://user-service:3001/account/?email=${signInDto.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (200 >= response.status && response.status < 300) {
        const json: any = response.data();
        return json.passwordHash == signInDto.password // TODO: change this.
      }
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const response = await axios.post(`http://user-service:3001/account`,
      {
        email: signUpDto.email,
        password: signUpDto.password,
        username: signUpDto.username,
      });
      console.log(response.status);
      if (200 >= response.status && response.status < 300) {
        return 0;
      }
      throw new Error("Error in request");
    } catch (error) {
      if (!(error instanceof AxiosError)) { // not the best way, but fine for now
        console.log(error);
      }
    }
  }
}
