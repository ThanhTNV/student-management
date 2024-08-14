import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signin')
  signin(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.signin(createAccountDto);
  }

  @Get('login')
  loginPage() {
    return 'This is login page';
  }

  @Post('login')
  login(@Body() createAccountDto: CreateAccountDto, @Req() req) {
    const userSession = req.session;
    if (!userSession || !userSession.accountSession) {
      // Check if the email and password are correct
      const accountLogin = this.accountService.login(
        createAccountDto.email,
        createAccountDto.password,
      );
      // If the account is an instance of Account, then store the account in the session
      if (accountLogin instanceof Account) {
        req.session.account = accountLogin;
        return accountLogin;
      }
      // In case of invalid email or password
      return accountLogin;
    }
    return 'User already logged in';
  }
  @Get('logout')
  logout(@Req() req) {
    // Destroy the session
    const userSession = req.session;
    if (!userSession) {
      return 'No user logged in';
    }
    req.session.destroy();
    return 'Logged out successfully';
  }
}
