import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EsignService } from './esign.service';
import { CreateEsignDto } from './esign.dto';
import { diskStorage } from 'multer';

@Controller('esign')
export class EsignController {
  constructor(private readonly esignService: EsignService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.pdf`);
      },
    }),
    fileFilter: (req, file, cb) => {
      console.log('File filter running, mimetype:', file.mimetype);
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed'), false);
      }
    },
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEsignDto,
  ) {
    console.log('Endpoint /esign/upload hit');
    console.log('File:', file);
    console.log('DTO:', dto);
    if (!file) throw new Error('No file uploaded');
    return this.esignService.uploadAndCreateTemplate(file, dto);
  }

  @Get('template/:templateId')
  async getTemplate(@Param('templateId') templateId: string) {
    console.log('Endpoint /esign/template/:templateId hit, templateId:', templateId);
    return this.esignService.getTemplate(templateId);
  }
}