import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { mentorshipPurchaseValidationSchema } from 'validationSchema/mentorship-purchases';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getMentorshipPurchases();
    case 'POST':
      return createMentorshipPurchase();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMentorshipPurchases() {
    const data = await prisma.mentorship_purchase
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'mentorship_purchase'));
    return res.status(200).json(data);
  }

  async function createMentorshipPurchase() {
    await mentorshipPurchaseValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.mentorship_purchase.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
