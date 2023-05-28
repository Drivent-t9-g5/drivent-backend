import { ApplicationError } from '@/protocols';

export function cannotActivitiesError(message: string): ApplicationError {
  return {
    name: 'CannotAccessActivities',
    message,
  };
}
