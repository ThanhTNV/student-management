import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { SubjectModule } from './subject/subject.module';
import { AccountModule } from './account/account.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { NestModule } from '@nestjs/common';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [StudentModule, ClassModule, SubjectModule, AccountModule],
})
export class AppModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes('student', 'class', 'subject');
  }
}
