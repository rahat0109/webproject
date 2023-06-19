import { Injectable } from '@nestjs/common';
import { MemberDTO } from './app.dto';
import { EventDTO } from './app.dto';

@Injectable()
export class AppService {
  getProfile(): string {
    return 'Member Profile';
  }

  addMember(data: MemberDTO): any {
    return data;
  }

  updateMember(data: MemberDTO): object {
    return data;
  }

  deleteMemberbyid(id):any {
    return id;
  }

  getAllEvent(): string {
    return 'This is Event Page';
  }

  registerevent(data: EventDTO): any {
    return data.id;
  }

  deleteeventbyid(id: number):any {
    return id;
  }

 
}
