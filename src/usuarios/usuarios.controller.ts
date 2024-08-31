import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @Post('maes')
  async createMae(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.createUsuario(usuarioData, 1, 1);
  }

  @Post('psi')
  async createPsi(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.createUsuario(usuarioData, 2, 2);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() usuario: Usuario): Promise<void> {
    return this.usuariosService.update(id, usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}