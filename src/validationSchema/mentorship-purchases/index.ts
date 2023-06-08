import * as yup from 'yup';

export const mentorshipPurchaseValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  mentorship_id: yup.string().nullable().required(),
});
