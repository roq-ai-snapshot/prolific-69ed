import { MentorshipPurchaseInterface } from 'interfaces/mentorship-purchase';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface MentorshipInterface {
  id?: string;
  name: string;
  team_id: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  mentorship_purchase?: MentorshipPurchaseInterface[];
  team?: TeamInterface;
  _count?: {
    mentorship_purchase?: number;
  };
}

export interface MentorshipGetQueryInterface extends GetQueryInterface {
  filter: {
    id?: string;
    name?: string;
    team_id?: string;
    status?: string;
  };
}
