import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: { db: { url: process.env.DATABASE_URL } },
    });
  }

  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called when the current second is 45');
  }
}
