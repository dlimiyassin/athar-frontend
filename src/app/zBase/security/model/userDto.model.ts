import {RoleDto} from "./roleDto.model";
import {BaseDto} from "../../model/BaseDto";
import { UserStatus } from "../../../core/enums/UserStatus";

export class UserDto extends BaseDto {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public phoneNumber!: string;
    public enabled!: boolean;
    public roleDtos: Array<RoleDto>;
    public status! : UserStatus;
    public lastLogin!: string;

    constructor() {
        super();
        this.roleDtos = new Array<RoleDto>();
    }
}
