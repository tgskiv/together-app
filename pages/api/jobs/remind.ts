import type {NextApiRequest, NextApiResponse} from 'next';
import {memberService} from '../../../services';
import {handleAPIErrors, validateHttpMethod, validateJobsAPIToken} from '../../../helpers/server';
import {logger} from '../../../config/custom';
import getDay from "date-fns/getDay";
import {isFirstWeekDayNow} from "./_date";

interface Payload {
    token: string;
}

export default async function Remind(req: NextApiRequest, res: NextApiResponse) {

    // do request only on mondays and fridays
    if (!(isFirstWeekDayNow(1) || isFirstWeekDayNow(3))) {
        res.status(200).json({});
        return
    }

    try {
        validateHttpMethod('GET', req.method!);

        const {token} = req.query as unknown as Payload;

        validateJobsAPIToken(token);
    } catch (error) {
        handleAPIErrors(error, res);

        return;
    }

    try {
        res.status(200).json({});

        await memberService.remindMembersOfLateCheckIn();

        const message = 'The job `remind` has been completed successfully.';

        logger
            ? logger.info(message)
            : console.log(message);
    } catch (error) {
        const message = 'An error occurred while running the `remind` job.';

        logger
            ? logger.info(message)
            : console.log(message);

        logger
            ? logger.error(error)
            : console.log(error);
    }
};
