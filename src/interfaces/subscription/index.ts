import { UserInterface } from 'interfaces/user';
import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface SubscriptionInterface {
  id?: string;
  user_id: string;
  course_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  course?: CourseInterface;
  _count?: {};
}

export interface SubscriptionGetQueryInterface extends GetQueryInterface {
  filter: {
    id?: string;
    user_id?: string;
    course_id?: string;
  };
}
