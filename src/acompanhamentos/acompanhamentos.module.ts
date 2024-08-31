import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acompanhamento } from './acompanhamento.entity';
import { AcompanhamentosService } from './acompanhamentos.service';
import { AcompanhamentosController } from './acompanhamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Acompanhamento])],
  providers: [AcompanhamentosService],
  controllers: [AcompanhamentosController],
  exports: [AcompanhamentosService],
})
export class AcompanhamentosModule {}
