import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AcompanhamentosService } from './acompanhamentos.service';
import { Acompanhamento } from './acompanhamento.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('acompanhamentos')
// @UseGuards(RolesGuard) // Aplica o guard para restringir acesso
@UseGuards(JwtAuthGuard)
export class AcompanhamentosController {
  constructor(private readonly acompanhamentosService: AcompanhamentosService) {}

  @Get()
  async findAll() {
    return this.acompanhamentosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Acompanhamento> {
    return this.acompanhamentosService.findOne(id);
  }
}
