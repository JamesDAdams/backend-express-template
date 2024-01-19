import { Authorized, JsonController, Get, UploadedFile, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { fileUploadOptions } from '../utils/Multer';
import { EmailService } from '../services/EmailService';
import type { IEmail } from '../interfaces/IEmail';
import { S3Service } from '../services/S3Service';
import { Readable } from 'stream';
import { log } from '../app';

@JsonController('/example')
export class ExampleController {

  private emailService: EmailService;
  private s3Service: S3Service;

  constructor() {
    this.s3Service = new S3Service();
    this.emailService = new EmailService();
  }

  @Get('/public')
  publicExample(): string {
    log.info("cc");
    return 'This is a public route';
  }


  @Get('/protected')
  @Authorized()
  @OpenAPI({
    description: 'Need to be connected',
  })
  protectedExample(): string {
    return 'This is a protected route';
  }


  @Get('/admin')
  @Authorized('Admin')
  @OpenAPI({
    description: 'Need Admin Role',
  })
  adminExample(): string {
    return 'This route is for admins only';
  }


  @Post('/add-file')
  @OpenAPI({
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        },
      },
    },
  })
  async uploadFile(@UploadedFile("file", { options: fileUploadOptions }) file: any): Promise<string> {
    log.info(`add-file :: ${file?.originalname} `);
    const readableStream = Readable.from(file.buffer);

    const successMessage = 'File uploaded successfully';
    const failureMessage = 'File upload failed';

    const result: boolean = await this.s3Service.uploadFile(readableStream, file.originalname);
    return result ? successMessage : failureMessage;
  }

  @Get('/send-email-test')
  @Authorized()
  async sendEmail() {
    const email: IEmail = {
      from: "georg@outsider.com",
      to: "georg@insider.com",
      subject: "test",
      text: "test"
    };

    const successMessage: string = 'Email uploaded successfully';
    const failureMessage: string = 'Email upload failed';

    const result: boolean = await this.emailService.sendEmail(email);
    return result ? successMessage : failureMessage;
  }
}
