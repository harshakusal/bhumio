import { CreateEsignDto } from './esign.dto';
export declare class EsignService {
    private readonly apiToken;
    private readonly apiBaseUrl;
    uploadAndCreateTemplate(file: Express.Multer.File, dto: CreateEsignDto): Promise<{
        templateId: any;
        message: string;
    }>;
    getTemplate(templateId: string): Promise<any>;
}
