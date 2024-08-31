import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('especializacoes')
export class Especializacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo', length: 20 })
  tipo: string;

  @OneToMany(() => Usuario, (usuario) => usuario.especializacao)
  usuarios: Usuario[];
}