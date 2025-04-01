import { IsString, MaxLength, MinLength, Matches, IsEmail } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @JSONSchema({
        description: 'Le mot de passe doit contenir entre 8 et 50 caractères, au moins un chiffre et un caractère spécial (!@#$%^&*)',
        example: 'MonMotDePasse123!'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/,
        { message: 'Le mot de passe doit contenir au moins un chiffre et un caractère spécial' }
    )
    password: string;
}
