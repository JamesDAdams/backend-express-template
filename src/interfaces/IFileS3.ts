import { Readable } from "stream";

/**
 * IFileS3 interface
 * @interface
 */
export interface IFileS3 {
    Bucket: string;
    Key: string;
    Body: Readable;
}