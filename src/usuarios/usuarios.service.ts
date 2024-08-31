import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Especializacao } from './especializacao.entity';
import { Documento } from '../documentos/documento.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Especializacao)
    private readonly especializacoesRepository: Repository<Especializacao>,
    @InjectRepository(Documento)
    private readonly documentosRepository: Repository<Documento>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  async createUsuario(
    usuarioData: Partial<Usuario>,
    especializacaoId: number,
    tipoDocumentoId: number,
  ): Promise<Usuario> {
    
    // Criando o documento
    const documento = new Documento();
    documento.tipo_documento_id = tipoDocumentoId;
    documento.valor_documento = usuarioData.documento.toString();;
    const documentoSalvo = await this.documentosRepository.save(documento);

    // Criando o usuário
    const salt = bcrypt.genSaltSync(10);
    const novoUsuario = this.usuariosRepository.create({
      ...usuarioData,
      senha: bcrypt.hashSync(usuarioData.senha, salt),
      especializacao_id: especializacaoId,
      documento_id: documentoSalvo.id,
    });

    return this.usuariosRepository.save(novoUsuario);
  }


  async update(id: number, usuario: Partial<Usuario>): Promise<void> {
    await this.usuariosRepository.update(id, usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
