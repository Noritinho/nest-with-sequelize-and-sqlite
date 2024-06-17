import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'src/database/sqlite/database.sqlite3',
      autoLoadModels: true,
      synchronize: false,
    }),
    UsersModule,
  ],
})
export class AppModule {}
