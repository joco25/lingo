import { auth } from '@clerk/nextjs/server';

const allowedIds = ['user_2hjK94f1LnMQvKzGaP8c7IiVrta'];

export const isAdmin = () => {
  const { userId } = auth();
  return userId && allowedIds.indexOf(userId) !== -1;
};
