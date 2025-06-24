import { ObjectType, Field, ID } from 'type-graphql';
import { UserType } from './user.type';
import { GraphQLISODateTime } from 'type-graphql';

@ObjectType()
export class PolicyType {
  @Field(type => ID)
  id: string;

  @Field()
  policyNumber: string;

  @Field()
  type: string;

  @Field()
  coverage: number;

  @Field()
  premium: number;

  @Field()
  status: string;

  @Field(type => GraphQLISODateTime)
  startDate: Date;

  @Field(type => GraphQLISODateTime)
  endDate: Date;

  @Field(type => UserType)
  policyholder: UserType;
}