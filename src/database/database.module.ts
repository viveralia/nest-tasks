import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: ({ mongo }: ConfigType<typeof config>) => {
        const { connection, dbName, host, pass, port, user } = mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          dbName,
          pass,
          user,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
