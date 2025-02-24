import { EsignService } from './esign.service';
import { CreateEsignDto } from './esign.dto';
export declare class EsignController {
    private readonly esignService;
    constructor(esignService: EsignService);
    uploadFile(file: Express.Multer.File, dto: CreateEsignDto): Promise<{
        templateId: any;
        message: string;
    }>;
    getTemplate(templateId: string): Promise<any>;
}
