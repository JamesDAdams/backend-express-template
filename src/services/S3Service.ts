import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';
import { Upload } from '@aws-sdk/lib-storage';

export class S3Service {
  constructor(
    private readonly s3Client = new S3Client({
      region: process.env['AWS_REGION'],
      credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'] ?? '',
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] ?? '',
      },
    }),
  ) {}

  public async downloadFile(path: string): Promise<Readable | null> {
    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: process.env['AWS_S3_BUCKET'],
          Key: path,
        }),
      );
      return response.Body as Readable;
    } catch (e) {
      console.error('Error downloading file:', e);
      return null;
    }
  }

  public async uploadFile(file: Readable, fileName: string): Promise<boolean> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: process.env['AWS_S3_BUCKET'],
          Key: fileName,
          Body: file,
        },
      });

      await upload.done();

      return true;
    } catch (e) {
      console.log('error', e);
      return false;
    }
  }
}
