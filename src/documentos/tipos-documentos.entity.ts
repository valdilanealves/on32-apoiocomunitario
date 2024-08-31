import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('tipos_documentos')
export class TiposDocumentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50, type: 'varchar' })
  descricao: string;
}