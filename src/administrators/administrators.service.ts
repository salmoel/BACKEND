import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Administrator } from '../shared/administrator';


@Injectable()
export class AdministratorsService { 
  constructor(
    @InjectModel('Administrator') private readonly administratorModel: Model<Administrator>) {}

 
  async getAll() {
    return await this.administratorModel.find().exec();
  }
  async getById(id: string) {
    return await this.administratorModel.findById(id).exec();
  }

  async create(administrator: Administrator) {
    administrator.password = bcrypt.hashSync(administrator.password,8);  // encriptando a senha do usuário no banco de dados 
    const createdAdministrator = new this.administratorModel(administrator);
    return await createdAdministrator.save();

  }

  async update(id: string, administrator: Administrator) {
    await this.administratorModel.updateOne({ _id: id }, administrator).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.administratorModel.deleteOne({ _id: id }).exec()
  }

  findName(termo: string) {
   
  }

  async getByEmail(email: string): Promise<Administrator | undefined> {
     return await this.administratorModel.findOne({email}).exec();

  }

  
}
