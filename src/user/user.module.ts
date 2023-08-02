import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, MSchema } from './user.model';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { UserCommandHandlers } from './user-cqrs/user-handlers/user.command.handler';
import { UserQueryHandlers } from './user-cqrs/user-handlers/user.query.handler';
import { UserEventHandlers } from './user-cqrs/user-handlers/user.event.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: 'MUser', schema: MSchema }]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    EventBus,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    ...UserEventHandlers,

  ]
})
export class UserModule { }
