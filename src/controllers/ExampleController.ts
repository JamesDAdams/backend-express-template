import { Authorized, JsonController, Get, UploadedFile, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { fileUploadOptions } from '../utils/Multer';
import { sendEmail } from '../utils/NodeMailer';
import type { IEmail } from '../interfaces/IEmail';
import { S3Service } from '../services/S3Service';
import { Readable } from 'stream';
import { log } from '../app';

@JsonController('/example')
export class ExampleController {

  /**
   * S3Service property
   * @private
   * @type {S3Service}
   */
  private s3Service: S3Service;
  /**
   * Instantiates S3Service
   * @constructor
   * @returns void
   */
  constructor() {
    this.s3Service = new S3Service();
  }


  /**
   * Public route example
   */
  @Get('/public')
  publicExample() {
    return 'This is a public route';
  }

  /**
   * Protected route example
   */
  @Get('/protected')
  @Authorized()
  @OpenAPI({
    description: 'Need to be connected',
  })
  protectedExample() {
    return 'This is a protected route';
  }

  /**
   * Admin route example
   */
  @Get('/admin')
  @Authorized('Admin')
  @OpenAPI({
    description: 'Need Admin Role',
  })
  adminExample() {
    return 'This route is for admins only';
  }

  /**
   * Add file route example
   */
  @Post('/add-file')
  async uploadFile(@UploadedFile("file", { options: fileUploadOptions }) file: any) {
    log.info(`add-file :: ${file?.originalname} `);
    const readableStream = Readable.from(file.buffer);
    this.s3Service.uploadFile(readableStream, file.originalname).then((statusUpload: boolean) => {
      if (statusUpload) {
        return 'File uploaded successfully';
      } else {
        return 'File upload failed';
      }
    });
  }

  /**
   * Send test email
   */
  @Post('/send-email-test')
  @Authorized()
  async sendEmail() {
    const email: IEmail = {
      from: "",
      to: "",
      subject: "test",
      text: "test"
    };
    const successMessage = 'Email uploaded successfully';
    const failureMessage = 'Email upload failed';

    const result = await sendEmail(email);

    return result ? successMessage : failureMessage;
  }
}
