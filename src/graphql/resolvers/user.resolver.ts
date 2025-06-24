import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { UserType, AuthPayload, CreateUserInput } from '../types';
import { AppDataSource } from '../../server';
import { User } from '../../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

@Resolver()
export class UserResolver {
  @Mutation(() => AuthPayload)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthPayload> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return {
      token,
      user
    };
  }

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.find();
  }

  @Mutation(() => UserType)
  async createUser(
    @Arg('input') userData: CreateUserInput,
    @Arg('images', () => [require('graphql-upload').GraphQLUpload], { nullable: true }) images?: Promise<any[]>
  ): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    let confirmationImages: string[] = [];
    if (images) {
      const files = await images;
      for (const file of files) {
        const { createReadStream, filename } = await file;
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        const filePath = path.join(uploadDir, `${Date.now()}-${filename}`);
        await new Promise((resolve, reject) => {
          createReadStream()
            .pipe(fs.createWriteStream(filePath))
            .on('finish', resolve)
            .on('error', reject);
        });
        confirmationImages.push(`/uploads/${path.basename(filePath)}`);
      }
    }

    const user = userRepository.create({
      ...userData,
      password: hashedPassword,
      role: 'user',
      confirmationImages,
    });

    return userRepository.save(user);
  }
}