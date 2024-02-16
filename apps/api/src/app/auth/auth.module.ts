import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigType } from '@nestjs/config';

import configurations, { configRoot } from '../../libs/config/configurations';

// Application layer
import { LoginQueryHandler } from './application/queries/login/login.handler';
import { UserLoggedInEventHandler } from './application/events/user-logged-in/user-logged-in.handler';
import { InjectionToken } from './application/constants';

// Domain layer
import { UserFactory } from './domain/user.factory';

// Infrastructure layer
import { UserRepositoryImplementation } from './infrastructure/repositories/user-repository-implementation';

// Interface layer
import { AuthController } from './interface/auth.controller';
import { JwtStrategy } from './interface/strategies';

const application: Provider[] = [LoginQueryHandler, UserLoggedInEventHandler];

const domain: Provider[] = [UserFactory];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplementation,
  },
];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(configRoot())],
      inject: [configurations.KEY],
      useFactory(configEnvs: ConfigType<typeof configurations>) {
        return {
          secret: configEnvs.jwtSecret,
          signOptions: { expiresIn: configEnvs.jwtExpiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...application, ...domain, ...infrastructure, JwtStrategy],
})
export class AuthModule {}
