import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SearchUsersDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @IsInt()
    @Min(1)
    @IsOptional()
    limit?: number = 10;
}
