import { Readable } from "stream";

export interface IFileS3 {
    Bucket: string;
    Key: string;
    Body: Readable;
}