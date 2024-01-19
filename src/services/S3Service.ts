import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import type { NodeJsClient } from "@smithy/types";
import { Upload } from "@aws-sdk/lib-storage";

/**
 * S3Service class
 * @class
 */
export class S3Service {
    /**
     * UserService constructor,
     * instantiates S3Client object
     * @constructor
     * @returns void
    */
    constructor(
        private readonly s3Client = new S3Client({
            region: process.env["AWS_REGION"],
            credentials: {
                accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "",
                secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "",
            }
        }) as NodeJsClient<S3Client>) { }

    /**
     * get file from S3
     * @memberof UserService
     * @returns {Promise<any>}
     */
    public async downloadFile(path: string): Promise<any> {
        const body = (
            await this.s3Client.send(
                new GetObjectCommand({
                    Bucket: process.env["AWS_S3_BUCKET"],
                    Key: path,
                }),
            )
        ).Body;
        return body;
    }
    /**
     * upload file to S3
     * @memberof UserService
     * @returns {Promise<boolean>}
     */
    public async uploadFile(file: Readable, fileName: string): Promise<boolean> {
        try {
            const upload = new Upload({
                client: this.s3Client,
                params: {
                    Bucket: process.env["AWS_S3_BUCKET"],
                    Key: fileName,
                    Body: file,
                },
            });

            await upload.done();

            return true;
        } catch (e) {
            console.log("error", e);
            return false;
        }
    }
}