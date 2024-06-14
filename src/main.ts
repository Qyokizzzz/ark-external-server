import { join } from 'path';
// import { createServer as createViteServer } from 'vite';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
// import type { Request, Response, NextFunction } from 'express';
// import type { ViteDevServer } from 'vite';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.useStaticAssets(join(__dirname, '..', 'client'));

  // const vite = await createViteServer({
  //   server: { middlewareMode: true },
  //   appType: 'custom',
  // });

  // app.use(
  //   (
  //     req: Request & { viteServer: ViteDevServer },
  //     _: Response,
  //     next: NextFunction,
  //   ) => {
  //     req['viteServer'] = vite;
  //     next();
  //   },
  // );

  // app.use(vite.middlewares);

  await app.listen(4000);
}
bootstrap();
