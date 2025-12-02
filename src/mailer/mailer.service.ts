import { Injectable, Logger } from '@nestjs/common';

type MailOptions = { to: string; subject: string; text: string };

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  send(options: MailOptions) {
    const fakeId = `mail-${Date.now()}`;
    this.logger.log(
      `Mail queued: ${fakeId} -> ${options.to} | ${options.subject}`,
    );
    return { id: fakeId, ...options };
  }
}
