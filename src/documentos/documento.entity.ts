import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { TiposDocumentos } from './tipos-documentos.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_documento_id' })
  tipo_documento_id: number;

  @ManyToOne(() => TiposDocumentos, (tipoDocumento) => tipoDocumento.id)
  @JoinColumn({ name: 'tipo_documento_id' })
  tipoDocumento: TiposDocumentos;

  @Column({ name: 'valor_documento', unique: true, length: 50, type: 'varchar' })
  valor_documento: string;
}
