"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsignController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const esign_service_1 = require("./esign.service");
const esign_dto_1 = require("./esign.dto");
const multer_1 = require("multer");
let EsignController = class EsignController {
    constructor(esignService) {
        this.esignService = esignService;
    }
    async uploadFile(file, dto) {
        console.log('Endpoint /esign/upload hit');
        console.log('File:', file);
        console.log('DTO:', dto);
        if (!file)
            throw new Error('No file uploaded');
        return this.esignService.uploadAndCreateTemplate(file, dto);
    }
    async getTemplate(templateId) {
        console.log('Endpoint /esign/template/:templateId hit, templateId:', templateId);
        return this.esignService.getTemplate(templateId);
    }
};
exports.EsignController = EsignController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
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
            }
            else {
                cb(new Error('Only PDF files are allowed'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, esign_dto_1.CreateEsignDto]),
    __metadata("design:returntype", Promise)
], EsignController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('template/:templateId'),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EsignController.prototype, "getTemplate", null);
exports.EsignController = EsignController = __decorate([
    (0, common_1.Controller)('esign'),
    __metadata("design:paramtypes", [esign_service_1.EsignService])
], EsignController);
//# sourceMappingURL=esign.controller.js.map