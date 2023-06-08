import { SubscriptionInterface } from 'interfaces/subscription';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  name: string;
  team_id: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  subscription?: SubscriptionInterface[];
  team?: TeamInterface;
  _count?: {
    subscription?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  filter: {
    id?: string;
    name?: string;
    team_id?: string;
    status?: string;
  };
}
