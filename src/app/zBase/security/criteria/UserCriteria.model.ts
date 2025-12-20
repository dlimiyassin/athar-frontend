import { UserStatus } from "../../../core/models/enums/UserStatus";
import {BaseCriteria} from "../../criteria/BaseCriteria";

export class UserCriteria extends BaseCriteria {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public enabled!: boolean;
    userStatus!: UserStatus;
}
