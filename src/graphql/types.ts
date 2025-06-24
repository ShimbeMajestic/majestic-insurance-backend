import { ObjectType, Field, ID, Float, InputType } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  role!: string;

  @Field({ nullable: true })
  nationalIdNo?: string;

  @Field()
  mobileNo!: string;

  @Field({ nullable: true })
  gpsCoordinates?: string;

  @Field(() => [String], { nullable: true })
  confirmationImages?: string[];
}

@ObjectType()
export class PolicyType {
  @Field(() => ID)
  id!: string;

  @Field()
  policyNumber!: string;

  @Field()
  type!: string;

  @Field(() => Float)
  premium!: number;

  @Field(() => Float)
  coverage!: number;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field()
  status!: string;

  @Field(() => UserType)
  policyholder!: UserType;
}

@ObjectType()
export class ClaimType {
  @Field(() => ID)
  id!: string;

  @Field()
  claimNumber!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field()
  status!: string;

  @Field()
  incidentDate!: Date;

  @Field(() => PolicyType)
  policy!: PolicyType;

  @Field(() => UserType)
  claimant!: UserType;
}

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;

  @Field(() => UserType)
  user!: UserType;
}

@InputType()
export class ClaimInput {
  @Field()
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field()
  incidentDate!: Date;

  @Field()
  policyId!: string;
}

@InputType()
export class PolicyInput {
  @Field()
  type!: string;

  @Field(() => Float)
  premium!: number;

  @Field(() => Float)
  coverage!: number;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field({ defaultValue: 'active' })
  status!: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  nationalIdNo?: string;

  @Field()
  mobileNo!: string;

  @Field({ nullable: true })
  gpsCoordinates?: string;

  @Field(() => [String], { nullable: true })
  confirmationImages?: string[];
}