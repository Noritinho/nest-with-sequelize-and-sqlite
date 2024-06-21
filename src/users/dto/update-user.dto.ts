export class CreateUserDto {
  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
  ) {}
}
