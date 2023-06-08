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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getMentorshipPurchaseById, updateMentorshipPurchaseById } from 'apiSdk/mentorship-purchases';
import { Error } from 'components/error';
import { mentorshipPurchaseValidationSchema } from 'validationSchema/mentorship-purchases';
import { MentorshipPurchaseInterface } from 'interfaces/mentorship-purchase';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { MentorshipInterface } from 'interfaces/mentorship';
import { getUsers } from 'apiSdk/users';
import { getMentorships } from 'apiSdk/mentorships';

function MentorshipPurchaseEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MentorshipPurchaseInterface>(
    () => (id ? `/mentorship-purchases/${id}` : null),
    () => getMentorshipPurchaseById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MentorshipPurchaseInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMentorshipPurchaseById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<MentorshipPurchaseInterface>({
    initialValues: data,
    validationSchema: mentorshipPurchaseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Mentorship Purchase
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'mentorship_purchase',
  operation: AccessOperationEnum.UPDATE,
})(MentorshipPurchaseEditPage);
