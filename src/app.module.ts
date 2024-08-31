// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AcompanhamentosModule } from './acompanhamentos/acompanhamentos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // URL de conexão do banco de dados
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Define como true apenas em desenvolvimento
    }),
    UsuariosModule,
    AuthModule,
    AcompanhamentosModule,
  ],
})
export class AppModule {}
