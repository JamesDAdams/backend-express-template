import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import { log } from '../../app';

export class NotificationWorker {
  private notificationWorker: Worker;
  public notificationQueue: Queue;
  constructor() {
    const redisUrl = process.env['WORKER_REDIS_URL'] ?? 'localhost';
    const redisPort = process.env['WORKER_REDIS_PORT']
      ? parseInt(process.env['WORKER_REDIS_PORT'])
      : 6379;
    const connection = { host: redisUrl, port: redisPort };

    this.notificationWorker = new Worker(
      'notification',
      async (job: Job) => {
        log.info(`Job ${job?.id} started`);
        log.info(`Job ${job?.id} data :: ${job?.data}`);
        return job.data;
      },
      {
        connection,
        removeOnComplete: {
          age: 3600, // keep up to 1 hour
          count: 1000, // keep up to 1000 jobs
        },
        removeOnFail: {
          age: 24 * 3600, // keep up to 24 hours
        },
      },
    );

    this.notificationQueue = new Queue('notification', {
      connection: connection,
    });

    this.notificationQueue.on('waiting', (job: Job) => {
      log.info(`Job ${job?.id} waiting`);
    });

    this.notificationQueue.on('error', (job: Error) => {
      log.info(`Job ${job} error`);
    });

    this.notificationQueue.on('removed', (job: Job) => {
      log.info(`Job ${job?.id} removed`);
    });

    this.notificationQueue.on('cleaned', (job: string[]) => {
      log.info(`Job ${job} cleaned`);
    });

    this.notificationQueue.on('progress', (job: Job) => {
      log.info(`Job ${job?.id} progress`);
    });

    this.notificationWorker.on('completed', (job: Job, returnvalue: any) => {
      log.info(`Job ${job?.id} completed`);
    });
  }
}
