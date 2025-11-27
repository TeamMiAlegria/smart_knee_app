// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global: ya lo usas para /api/v1
  app.setGlobalPrefix('api/v1');

  // 🟢 CORS: permite localhost + Vercel
  app.enableCors({
    origin: [
      'http://localhost:3000',                 // dev local
      'https://smartkneefinal.onrender.com',   // opcional: si pegas desde la misma URL
      'https://rodilladebronce1.vercel.app',        
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // no usas cookies, solo Bearer
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API running on port ${port}`);
}
bootstrap();
