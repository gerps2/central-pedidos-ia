import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { mcp } from "./mcp";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mcp.setHttpAdapter(app.getHttpAdapter());
  app.connectMicroservice({ strategy: mcp });
  await app.startAllMicroservices();
  await app.listen(3200);
}

void bootstrap();
