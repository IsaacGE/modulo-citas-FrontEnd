import { takeUntil } from 'rxjs/operators';

export class User {

    _id: string;
    strName: string;
    strLastName: string;
    strMotherLastName: string;
    strEmail: string;
    strPassword: string;
    strValidatePass: string;
    blnStatus?: boolean;
    updatedAt: Date;
    cratedAt: Date;
}