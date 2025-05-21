import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class regiterDto{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

}