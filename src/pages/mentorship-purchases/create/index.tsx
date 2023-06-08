import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createMentorshipPurchase } from 'apiSdk/mentorship-purchases';
import { Error } from 'components/error';
import { mentorshipPurchaseValidationSchema } from 'validationSchema/mentorship-purchases';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { MentorshipInterface } from 'interfaces/mentorship';
import { getUsers } from 'apiSdk/users';
import { getMentorships } from 'apiSdk/mentorships';
import { MentorshipPurchaseInterface } from 'interfaces/mentorship-purchase';

function MentorshipPurchaseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MentorshipPurchaseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMentorshipPurchase(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MentorshipPurchaseInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      mentorship_id: (router.query.mentorship_id as string) ?? null,
    },
    validationSchema: mentorshipPurchaseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Mentorship Purchase
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<MentorshipInterface>
            formik={formik}
            name={'mentorship_id'}
            label={'Select Mentorship'}
            placeholder={'Select Mentorship'}
            fetcher={getMentorships}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'mentorship_purchase',
  operation: AccessOperationEnum.CREATE,
})(MentorshipPurchaseCreatePage);
