import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import axios from 'axios';
import { CreateEsignDto } from './esign.dto';

@Injectable()
export class EsignService {
  private readonly apiToken = 'test.d1iJ00pTtnkR9eJD1Dm4f';
  private readonly apiBaseUrl = 'https://sandbox.opensignlabs.com/api/v1';

  // Existing upload method
  async uploadAndCreateTemplate(file: Express.Multer.File, dto: CreateEsignDto) {
    const fileBuffer = await fs.readFile(file.path);
    const base64File = fileBuffer.toString('base64');

    const payload = {
      file: base64File,
      title: dto.title || 'sample template',
      note: dto.note || 'sample note',
      description: dto.description || 'sample description',
      signers: [
        {
          role: 'Role 1',
          email: dto.role1Email,
          name: dto.role1Name || '',
          phone: dto.role1Phone || '',
          widgets: dto.role1Widgets || [{ type: 'signature', page: 1, x: 244, y: 71, w: 38, h: 46 }],
        },
        { role: 'Role 2', email: dto.role2Email || 'placeholder@temp.com', name: '', phone: '', widgets: [] },
        { role: 'Role 3', email: dto.role3Email || 'pending@temp.com', name: '', phone: '', widgets: [] },
      ],
      sendInOrder: true,
      enableOTP: false,
      enableTour: false,
      redirect_url: '',
      sender_name: 'opensign™',
      sender_email: 'mailer@opensignlabs.com',
      allow_modifications: false,
    };

    const response = await axios.post(`${this.apiBaseUrl}/createtemplate`, payload, {
      headers: { 'x-api-token': `${this.apiToken}` },
    });
    console.log('OpenSign API Response:', response.data);
    await fs.unlink(file.path);
    return { templateId: response.data.templateId, message: 'Template created' };
  }

  // New method to get template details
  async getTemplate(templateId: string) {
    try {
      const url = `${this.apiBaseUrl}/template/${templateId}`;
      console.log("url",url)
      const headers = { 'x-api-token': this.apiToken };
  
      console.log('Fetching template from:', url);
  
      const response = await axios.get(url, { headers });
  
      console.log('OpenSign Get Template Response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'OpenSign Get Template Error:',
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch template: ${error.response?.data?.message || error.message}`
      );
    }
  }}