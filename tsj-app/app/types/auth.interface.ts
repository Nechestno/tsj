import {IUser} from "@/types/user.interface";

export interface IAuthFormData extends Pick<IUser, 'login' | 'password'>{}
export interface IRegistrFormData extends IUser{}