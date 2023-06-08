import * as yup from 'yup';
import { mentorshipPurchaseValidationSchema } from 'validationSchema/mentorship-purchases';

export const mentorshipValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  team_id: yup.string().nullable().required(),
  mentorship_purchase: yup.array().of(mentorshipPurchaseValidationSchema),
});
