import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrator } from 'src/shared/administrator';
import { Voluntary } from 'src/shared/voluntary';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel('Voluntary') private readonly voluntaryModel: Model<Voluntary>,
        @InjectModel('Administrator') private readonly administratorModel: Model<Administrator>
        ) {}

        


    getAllVolunteers(){
        return  this.voluntaryModel.countDocuments({}).exec();
    }
    getAllAdministrators(){
        return  this.administratorModel.countDocuments({}).exec();
    }
    // async getAll() {
    //     return await this.voluntaryModel.find().exec();
    //   }
}
