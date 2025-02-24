import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'; // ✅ Import MulterModule
import { EsignController } from './esign.controller';
import { EsignService } from './esign.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // ✅ Temporary storage for uploaded files
    }),
  ],
  controllers: [EsignController],
  providers: [EsignService],
})
export class EsignModule {}
