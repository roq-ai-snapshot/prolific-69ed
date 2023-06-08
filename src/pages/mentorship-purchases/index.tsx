import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Link, IconButton } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getMentorshipPurchases, deleteMentorshipPurchaseById } from 'apiSdk/mentorship-purchases';
import { MentorshipPurchaseInterface } from 'interfaces/mentorship-purchase';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { FiTrash, FiEdit2 } from 'react-icons/fi';

function MentorshipPurchaseListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<MentorshipPurchaseInterface[]>(
    () => '/mentorship-purchases',
    () =>
      getMentorshipPurchases({
        relations: ['user', 'mentorship'],
      }),
  );
  const router = useRouter();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteMentorshipPurchaseById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const handleView = (id: string) => {
    if (hasAccess('mentorship_purchase', AccessOperationEnum.READ, AccessServiceEnum.PROJECT)) {
      router.push(`/mentorship-purchases/view/${id}`);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Mentorship Purchase
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('mentorship_purchase', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Link href={`/mentorship-purchases/create`}>
            <Button colorScheme="blue" mr="4">
              Create
            </Button>
          </Link>
        )}
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>user</Th>}
                  {hasAccess('mentorship', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>mentorship</Th>}

                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr cursor="pointer" onClick={() => handleView(record.id)} key={record.id}>
                    {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/users/view/${record.user?.id}`}>
                          {record.user?.email}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('mentorship', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/mentorships/view/${record.mentorship?.id}`}>
                          {record.mentorship?.name}
                        </Link>
                      </Td>
                    )}

                    <Td>
                      {hasAccess('mentorship_purchase', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                        <Td>
                          <NextLink href={`/mentorship-purchases/edit/${record.id}`} passHref legacyBehavior>
                            <Button
                              onClick={(e) => e.stopPropagation()}
                              mr={2}
                              as="a"
                              variant="outline"
                              colorScheme="blue"
                              leftIcon={<FiEdit2 />}
                            >
                              Edit
                            </Button>
                          </NextLink>
                          {hasAccess('mentorship_purchase', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(record.id);
                              }}
                              colorScheme="red"
                              variant="outline"
                              aria-label="edit"
                              icon={<FiTrash />}
                            />
                          )}
                        </Td>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'mentorship_purchase',
  operation: AccessOperationEnum.READ,
})(MentorshipPurchaseListPage);
