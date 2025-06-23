import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { PolicyType, PolicyInput } from '../types';
import { AppDataSource } from '../../server';
import { Policy } from '../../entities/Policy';
import { User } from '../../entities/User';
import { MyContext } from '../../types/context';

@Resolver(of => PolicyType)
export class PolicyResolver {
  @Authorized()
  @Query(() => [PolicyType])
  async userPolicies(@Arg('userId') userId: string): Promise<PolicyType[]> {
    const policyRepository = AppDataSource.getRepository(Policy);
    const policies = await policyRepository.find({
      where: { policyholder: { id: userId } },
      relations: ['policyholder']
    });

    // Convert to PolicyType
    return policies.map(policy => ({
      id: policy.id,
      policyNumber: policy.policyNumber,
      type: policy.type,
      coverage: policy.coverage,
      premium: policy.premium,
      status: policy.status,
      startDate: new Date(policy.startDate),
      endDate: new Date(policy.endDate),
      policyholder: policy.policyholder
    }));
  }

  @Authorized(['admin'])
  @Query(() => [PolicyType])
  async allPolicies(): Promise<PolicyType[]> {
    const policyRepository = AppDataSource.getRepository(Policy);
    const policies = await policyRepository.find({ relations: ['policyholder'] });
    
    return policies.map(policy => ({
      id: policy.id,
      policyNumber: policy.policyNumber,
      type: policy.type,
      coverage: policy.coverage,
      premium: policy.premium,
      status: policy.status,
      startDate: new Date(policy.startDate),
      endDate: new Date(policy.endDate),
      policyholder: policy.policyholder
    }));
  }

  @Mutation(returns => PolicyType)
  @Authorized()
  async createNewPolicy(
    @Arg("type") type: string,
    @Arg("coverage") coverage: number,
    @Arg("premium") premium: number,
    @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string,
    @Ctx() context: MyContext
  ): Promise<PolicyType> {
    const policyRepository = AppDataSource.getRepository(Policy);
    const userRepository = AppDataSource.getRepository(User);
    
    const newPolicy = new Policy();
    newPolicy.type = type;
    newPolicy.coverage = coverage;
    newPolicy.premium = premium;
    // Convert input strings to ISO date strings
    newPolicy.startDate = new Date(startDate).toISOString();
    newPolicy.endDate = new Date(endDate).toISOString();
    newPolicy.status = 'active';
    newPolicy.policyNumber = `POL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    if (context.user) {
      const user = await userRepository.findOne({ 
        where: { id: context.user.userId } 
      });
      if (user) {
        newPolicy.policyholder = user;
      }
    }

    const savedPolicy = await policyRepository.save(newPolicy);
    
    return {
      id: savedPolicy.id,
      policyNumber: savedPolicy.policyNumber,
      type: savedPolicy.type,
      coverage: savedPolicy.coverage,
      premium: savedPolicy.premium,
      status: savedPolicy.status,
      startDate: new Date(savedPolicy.startDate),
      endDate: new Date(savedPolicy.endDate),
      policyholder: savedPolicy.policyholder
    };
  }
}