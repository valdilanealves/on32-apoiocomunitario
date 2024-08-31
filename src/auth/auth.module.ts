import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module'; // Ajuste o caminho conforme necessário

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'cd5548f7-ac9d-4948-9eef-55c18cf3ad7b', // Substitua por uma chave secreta segura
      signOptions: { expiresIn: '60m' },
    }),
    UsuariosModule,
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
