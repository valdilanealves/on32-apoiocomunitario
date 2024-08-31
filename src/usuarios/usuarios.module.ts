import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './usuario.entity';
import { Especializacao } from './especializacao.entity';
import { Acompanhamento } from '../acompanhamentos/acompanhamento.entity';
import { Documento } from '../documentos/documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Especializacao,Acompanhamento , Documento])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule {}
