import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AddressInfo, createServer } from 'net';

async function findAvailablePort(preferredPort: number, host: string) {
  return new Promise<{ port: number; usedPreferred: boolean }>(
    (resolve, reject) => {
      const server = createServer();
      server.unref();

      server.once('error', (error: NodeJS.ErrnoException) => {
        server.close();

        if (error.code !== 'EADDRINUSE') {
          reject(error);
          return;
        }

        const fallbackServer = createServer();
        fallbackServer.unref();
        fallbackServer.once('error', reject);
        fallbackServer.listen(0, host, () => {
          const address = fallbackServer.address() as AddressInfo;
          fallbackServer.close(() =>
            resolve({ port: address.port, usedPreferred: false }),
          );
        });
      });

      server.listen(preferredPort, host, () => {
        const address = server.address() as AddressInfo;
        server.close(() =>
          resolve({ port: address.port, usedPreferred: true }),
        );
      });
    },
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const host = process.env.HOST || '0.0.0.0';
  const preferredPort = Number(process.env.PORT) || 5000;

  const { port, usedPreferred } = await findAvailablePort(preferredPort, host);
  await app.listen(port, host);

  if (usedPreferred) {
    console.log(`API listening on http://${host}:${port}`);
  } else {
    console.warn(
      `Port ${preferredPort} in use. Started on http://${host}:${port} instead.`,
    );
  }
}
void bootstrap();
