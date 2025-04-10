import { type Action, UnauthorizedError } from 'routing-controllers';
import { verifyJWT } from './Jwt';
import { log } from '../app';

export const authCheck = async (
  action: Action,
): Promise<boolean> => {
  console.log('Authorization check started');
  const authorization = action.request.headers['authorization'];
  console.log('Authorization header:', authorization);
  if (!authorization) throw new UnauthorizedError('Missing token');

  const token = authorization.replace('Bearer ', '');
  console.log('Token extracted:', token);
  if (!token) throw new UnauthorizedError('Missing token');

  try {
    const payload = verifyJWT(token);
    if (!payload.user) throw new UnauthorizedError('User not found in token');
    if (!payload.user.isActive) throw new UnauthorizedError('Blocked user');

    // Attacher l'utilisateur à la requête
    action.request.user = payload.user;

    console.log('User found in token:', payload.user);

    return true;

  } catch (error) {
    log.info(`Invalid token: ${error}`);
    throw new UnauthorizedError('Invalid token');
  }


};
