import * as process from 'process';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
// import helmet from 'helmet';

import {
  getApp,
  createSwaggerDocument,
  globalPrefix,
} from '@ocmi/api/bootstrap';

async function bootstrap() {
  const app = await getApp();

  app.enableCors();
  // app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const [error] = errors;

        const errorMessage = error.constraints
          ? error.constraints[Object.keys(error.constraints)[0]]
          : error.children[0].children[0].constraints[
              Object.keys(error.children[0].children[0].constraints)[0]
            ];

        return new BadRequestException(errorMessage);
      },
    }),
  );

  const document = createSwaggerDocument(app);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
