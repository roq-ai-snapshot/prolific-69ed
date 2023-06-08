import * as yup from 'yup';
import { courseValidationSchema } from 'validationSchema/courses';
import { mentorshipValidationSchema } from 'validationSchema/mentorships';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  tenant_id: yup.string().required(),
  user_id: yup.string().nullable().required(),
  course: yup.array().of(courseValidationSchema),
  mentorship: yup.array().of(mentorshipValidationSchema),
});
