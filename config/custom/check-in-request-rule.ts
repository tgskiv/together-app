import type { Nullable, CheckInRequestRule } from '../../types';

export const checkInRequestRule: Nullable<CheckInRequestRule> = {
    requestCheckInDirectMessage: true, // The message will not be sent as a direct message
    requestCheckInOrganizationChannel: false,
};
