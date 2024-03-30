import cron from 'node-cron';
import echo from '../helpers/echo';

export default (expr: string, task: VoidFunction) => {
  echo.log(
    'src/jobs/scheduleJob.ts:6',
    `cron job for ${expr} setup`
  );

  cron.schedule(expr, () => {
    task();
  });
};
