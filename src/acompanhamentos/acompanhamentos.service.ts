import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Acompanhamento } from './acompanhamento.entity';

@Injectable()
export class AcompanhamentosService {
  constructor(
    @InjectRepository(Acompanhamento)
    private readonly acompanhamentosRepository: Repository<Acompanhamento>,
  ) {}

  async findAll(): Promise<Acompanhamento[]> {
    return this.acompanhamentosRepository.find();
  }

  async findOne(id: number): Promise<Acompanhamento | undefined> {
    return this.acompanhamentosRepository.findOne({ where: { id } });
  }
}
