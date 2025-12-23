import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    const adapter = new PrismaMariaDb({
      host: config.get("MYSQL_HOST") as string  || "localhost",
      port: config.get("MYSQL_PORT") as number || 3306,
      connectionLimit: 5
    });
    
    super({ 
      adapter,
    });
  }
}