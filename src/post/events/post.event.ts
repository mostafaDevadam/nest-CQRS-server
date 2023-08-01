
import { IEvent } from '@nestjs/cqrs'

export class PostCreatedEvent {
   constructor(public readonly _id: number) { }

}
