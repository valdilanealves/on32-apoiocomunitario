import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Acompanhamento } from '../acompanhamentos/acompanhamento.entity';
import { Documento } from '../documentos/documento.entity';
import { Especializacao } from './especializacao.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', length: 255 })
  nome: string;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;

  @Column({ name: 'endereco', type: 'text' })
  endereco: string;

  @Column({ name: 'email', unique: true, length: 255 })
  email: string;

  @Column({ name: 'senha', length: 255 })
  senha: string;

  @Column({ name: 'data_cadastro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCadastro: Date;

  @Column({ name: 'especializacao_id' })
  especializacao_id: number;

  @Column({ name: 'documento_id' })
  documento_id: number;

  @ManyToOne(() => Especializacao, { nullable: false })
  @JoinColumn({ name: 'especializacao_id' })
  especializacao: Especializacao;

  @ManyToOne(() => Documento, { nullable: false })
  @JoinColumn({ name: 'documento_id' })
  documento: Documento;

  @OneToMany(() => Acompanhamento, (acompanhamento) => acompanhamento.mae)
  acompanhamentosComoMae: Acompanhamento[];

  @OneToMany(() => Acompanhamento, (acompanhamento) => acompanhamento.profissional)
  acompanhamentosComoProfissional: Acompanhamento[];
}
