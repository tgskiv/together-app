import type {NextApiRequest, NextApiResponse} from 'next';
import {memberService} from '../../../services';
import {handleAPIErrors, validateHttpMethod, validateJobsAPIToken} from '../../../helpers/server';
import {logger} from '../../../config/custom';
import getDay from "date-fns/getDay";

interface Payload {
    token: string;
}

export default async function NotifyOfLateCheckIns(req: NextApiRequest, res: NextApiResponse) {

    if ([0, 6].includes(getDay(new Date()))) {
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

        await memberService.notifyOfLateCheckIns();

        const message = 'The job `notify` has been completed successfully.';

        logger
            ? logger.info(message)
            : console.log(message);
    } catch (error) {
        const message = 'An error occurred while running the `notify` job.';

        logger
            ? logger.info(message)
            : console.log(message);

        logger
            ? logger.error(error)
            : console.log(error);
    }
};
