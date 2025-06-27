import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Module Prisma global
// @Global() permet m'utilisation de ce service dans tous les modules
@Global()
@Module({
  providers: [PrismaService], 
  exports: [PrismaService],   
})
export class PrismaModule {} 