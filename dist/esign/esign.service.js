"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsignService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const axios_1 = require("axios");
let EsignService = class EsignService {
    constructor() {
        this.apiToken = 'test.d1iJ00pTtnkR9eJD1Dm4f';
        this.apiBaseUrl = 'https://sandbox.opensignlabs.com/api/v1';
    }
    async uploadAndCreateTemplate(file, dto) {
        const fileBuffer = await fs_1.promises.readFile(file.path);
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
        const response = await axios_1.default.post(`${this.apiBaseUrl}/createtemplate`, payload, {
            headers: { 'x-api-token': `${this.apiToken}` },
        });
        console.log('OpenSign API Response:', response.data);
        await fs_1.promises.unlink(file.path);
        return { templateId: response.data.templateId, message: 'Template created' };
    }
    async getTemplate(templateId) {
        var _a, _b, _c;
        try {
            const url = `${this.apiBaseUrl}/template/${templateId}`;
            console.log("url", url);
            const headers = { 'x-api-token': this.apiToken };
            console.log('Fetching template from:', url);
            const response = await axios_1.default.get(url, { headers });
            console.log('OpenSign Get Template Response:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('OpenSign Get Template Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error(`Failed to fetch template: ${((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message}`);
        }
    }
};
exports.EsignService = EsignService;
exports.EsignService = EsignService = __decorate([
    (0, common_1.Injectable)()
], EsignService);
//# sourceMappingURL=esign.service.js.map