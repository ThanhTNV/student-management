import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  accountList: Account[] = [
    {
      id: '1',
      email: 'admin123@mail.com',
      username: 'admin',
      password: 'admin',
    },
    {
      id: '2',
      email: 'user123@mail.com',
      username: 'user',
      password: 'user',
    },
  ];

  login(email: string, password: string) {
    const account: Account = this.accountList.find(
      (account) => account.email === email && account.password === password,
    );
    if (account) {
      return account;
    }
    return 'Invalid email or password';
  }

  signin(createAccountDto: CreateAccountDto) {
    const account = this.accountList.find(
      (account) => account.email === createAccountDto.email || account.username === createAccountDto.username,
    );
    if (account) {
      return 'Email already exists';
    }
    this.accountList.push({
      id: String(this.accountList.length + 1),
      ...createAccountDto,
    });
    return 'Account created successfully';
  }

  authenticate(id: string) {
    const account = this.accountList.find((account) => account.id === id);
    if (account) {
      return account;
    }
    return 'Invalid account';
  }

  // create(createAccountDto: CreateAccountDto) {
  //   return 'This action adds a new account';
  // }

  // findAll() {
  //   return `This action returns all account`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
