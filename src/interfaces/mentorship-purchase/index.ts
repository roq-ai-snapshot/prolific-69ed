import { UserInterface } from 'interfaces/user';
import { MentorshipInterface } from 'interfaces/mentorship';
import { GetQueryInterface } from 'interfaces';

export interface MentorshipPurchaseInterface {
  id?: string;
  user_id: string;
  mentorship_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  mentorship?: MentorshipInterface;
  _count?: {};
}

export interface MentorshipPurchaseGetQueryInterface extends GetQueryInterface {
  filter: {
    id?: string;
    user_id?: string;
    mentorship_id?: string;
  };
}
