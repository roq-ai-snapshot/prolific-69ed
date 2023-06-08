import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { mentorshipPurchaseValidationSchema } from 'validationSchema/mentorship-purchases';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.mentorship_purchase
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMentorshipPurchaseById();
    case 'PUT':
      return updateMentorshipPurchaseById();
    case 'DELETE':
      return deleteMentorshipPurchaseById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMentorshipPurchaseById() {
    const data = await prisma.mentorship_purchase.findFirst(convertQueryToPrismaUtil(req.query, 'mentorship_purchase'));
    return res.status(200).json(data);
  }

  async function updateMentorshipPurchaseById() {
    await mentorshipPurchaseValidationSchema.validate(req.body);
    const data = await prisma.mentorship_purchase.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMentorshipPurchaseById() {
    const data = await prisma.mentorship_purchase.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
