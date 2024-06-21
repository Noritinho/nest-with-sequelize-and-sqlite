import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string;
}
