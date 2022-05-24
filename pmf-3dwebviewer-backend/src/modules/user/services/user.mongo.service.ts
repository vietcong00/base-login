import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from 'src/common/services/winston.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { MODULE_NAME } from '../user.constant';
import { ICreateUserDto, IUserQueryDto } from '../dto/request/user.write.dto';
import {
    DEFAULT_LIMIT_FOR_PAGINATION,
    MIN_PAGE_VALUE,
    OrderBy,
    OrderDirection,
} from 'src/common/constants';
import {
    getMongoKeywordConditions,
    getTotalSkipItem,
} from 'src/common/helpers/commonFunctions';
const userAtributes = ['email', 'fullName'];
@Injectable()
export class UserMongoService {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}
    private readonly logger = createWinstonLogger(
        MODULE_NAME,
        this.configService,
    );

    async createUser(createUserDto: ICreateUserDto): Promise<User> {
        try {
            const user = new this.userModel({
                ...createUserDto,
            });
            return await user.save();
        } catch (error) {
            this.logger.error('Error in create user service', error);
            throw error;
        }
    }

    async checkEmailExist(email: string): Promise<boolean> {
        try {
            const numberOfUser = await this.userModel.count({
                email: {
                    $eq: email,
                },
            });
            return numberOfUser > 0;
        } catch (error) {
            this.logger.error('Error in check email exist service', error);
            throw error;
        }
    }

    async getUserList(query: IUserQueryDto): Promise<User[]> {
        try {
            const {
                page = MIN_PAGE_VALUE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderDirection = OrderDirection.DESC,
                orderBy = OrderBy.CREATED_AT,
            } = query;
            const condition = {
                $and: [
                    {
                        $or: getMongoKeywordConditions(
                            ['email', 'fullName'],
                            keyword,
                        ),
                    },
                    { deletedAt: { $exists: true, $eq: null } },
                ],
            };
            const userList = await this.userModel
                .find({
                    $and: [condition],
                })
                .sort({ [orderBy]: orderDirection })
                .skip(getTotalSkipItem(page, limit))
                .limit(+limit)
                .select(userAtributes)
                .exec();
            return userList;
        } catch (error) {
            this.logger.error('Error in get user list service', error);
            throw error;
        }
    }
}
