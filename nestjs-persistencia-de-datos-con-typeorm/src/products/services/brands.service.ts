import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);

    return this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);

    this.brandRepository.merge(brand, changes);

    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    this.brandRepository.delete(id);
  }
}
