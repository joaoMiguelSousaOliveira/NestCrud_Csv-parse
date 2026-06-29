import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImportsModule } from './imports/imports.module';

@Module({
  imports: [TasksModule, PrismaModule, ImportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
