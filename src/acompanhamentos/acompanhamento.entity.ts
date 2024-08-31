import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('acompanhamentos')
export class Acompanhamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.acompanhamentosComoMae, { nullable: false })
  @JoinColumn({ name: 'mae_id' })
  mae: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.acompanhamentosComoProfissional, { nullable: false })
  @JoinColumn({ name: 'profissional_id' })
  profissional: Usuario;

  @Column({ name: 'inicio', type: 'timestamp' })
  inicio: Date;

  @Column({ name: 'fim', type: 'timestamp', nullable: true })
  fim: Date;

  @Column({ name: 'em_andamento', type: 'boolean', default: true })
  emAndamento: boolean;
}
