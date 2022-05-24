export interface IMongoKeywordCondition {
    [key: string]: {
        $regex: string;
        $options: string;
    };
}

export interface ILoginUser {
    email: string;
    fullName: string;
}
