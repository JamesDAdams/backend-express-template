import { IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class ResetPasswordDto {
  @JSONSchema({
    description: 'Le nouveau mot de passe doit contenir entre 8 et 50 caractères, au moins un chiffre et un caractère spécial (!@#$%^&*)',
    example: 'MonMotDePasse123!'
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/,
    { message: 'Le mot de passe doit contenir au moins un chiffre et un caractère spécial' }
  )
  newPassword: string;
}
