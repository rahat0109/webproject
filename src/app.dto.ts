import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Matches,
  isNumber,
} from 'class-validator';

export class MemberDTO {
  id: number;

  @IsString({ message: 'invalid name' })
  @Matches(/^[a-zA-Z]+$/, { message: 'enter a proper name' })
  name: string;

  @IsEmail({}, { message: 'invalid email' })
  email: string;

  @IsString({ message: 'invalid pass' })
  password: string;

  filenames: string;
}

export class EventDTO {
  id: number;
  name: string;
  email: string;
  date: string;
}
