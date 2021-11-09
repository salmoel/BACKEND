import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Console } from 'console';
import { Model } from 'mongoose';
import { Voluntary } from '../shared/voluntary';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectModel('Voluntary') private readonly voluntaryModel: Model<Voluntary>
  ) {}

  async getAll() {
    return await this.voluntaryModel.find().exec();
  }
  async getById(id: string) {
    return await this.voluntaryModel.findById(id).exec();
  }

  async create(voluntary: Voluntary) {
    voluntary.password = bcrypt.hashSync(voluntary.password, 8); // encriptando a senha do usuário no banco de dados
    const createdVoluntary = new this.voluntaryModel(voluntary);
    return await createdVoluntary.save();
  }

  async update(id: string, voluntary: Voluntary) {
    await this.voluntaryModel.updateOne({ _id: id }, voluntary).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.voluntaryModel.deleteOne({ _id: id }).exec();
  }

  async findName(termo: string) {
    const termocustom = `/${termo}/i`;
    return await this.voluntaryModel
      .find({ nome: { $regex: new RegExp(termo), $options: 'i' } })
      .exec();
  }
  async customSearch(termo: string, campo: string) {
    const termocustom = `/${termo}/i`;
    return await this.voluntaryModel.find({ campo: termocustom });
  }
  async updateStatus(id: string, status: string) {
    console.log('MUDOU STATUS');
    
    await this.voluntaryModel.findByIdAndUpdate({_id:id}, { $set: { status: status  }}).exec();

  }

  async getByEmail(email: string): Promise<Voluntary | undefined> {
    return await this.voluntaryModel.findOne({ email }).exec();
  }
}
