import { CourseInterface } from 'interfaces/course';
import { MentorshipInterface } from 'interfaces/mentorship';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  user_id: string;
  tenant_id: string;
  course?: CourseInterface[];
  mentorship?: MentorshipInterface[];
  user?: UserInterface;
  _count?: {
    course?: number;
    mentorship?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  filter: {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    user_id?: string;
    tenant_id?: string;
  };
}
