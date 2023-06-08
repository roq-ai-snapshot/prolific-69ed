import * as yup from 'yup';
import { subscriptionValidationSchema } from 'validationSchema/subscriptions';

export const courseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  team_id: yup.string().nullable().required(),
  subscription: yup.array().of(subscriptionValidationSchema),
});
