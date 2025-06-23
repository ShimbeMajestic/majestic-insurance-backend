import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { ClaimType, ClaimInput } from '../types';
import { AppDataSource } from '../../server';
import { Claim } from '../../entities/Claim';
import { Policy } from '../../entities/Policy';

@Resolver()
export class ClaimResolver {
  @Authorized()
  @Query(() => [ClaimType])
  async userClaims(@Arg('userId') userId: string): Promise<Claim[]> {
    const claimRepository = AppDataSource.getRepository(Claim);
    return claimRepository.find({
      where: { claimant: { id: userId } },
      relations: ['policy', 'claimant']
    });
  }

  @Authorized()
  @Mutation(() => ClaimType)
  async createClaim(
    @Arg('input') claimData: ClaimInput,
    @Ctx() { user }: any
  ): Promise<Claim> {
    const claimRepository = AppDataSource.getRepository(Claim);
    const policyRepository = AppDataSource.getRepository(Policy);

    const policy = await policyRepository.findOneOrFail({ 
      where: { id: claimData.policyId },
      relations: ['policyholder']
    });

    if (policy.policyholder.id !== user.id) {
      throw new Error('Unauthorized to create claim for this policy');
    }

    const claim = claimRepository.create({
      ...claimData,
      policy,
      claimant: policy.policyholder,
      status: 'pending'
    });

    return claimRepository.save(claim);
  }
}