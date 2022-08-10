import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './graphql/http.module';

@Module({
  imports: [DatabaseModule, HttpModule],
})
export class AppModule {}
