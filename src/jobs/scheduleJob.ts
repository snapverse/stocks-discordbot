import cron from 'node-cron';

export default (expr: string, task: VoidFunction) => {
  console.info(
    JSON.stringify({
      time: Date.now(),
      trigger: 'node-cron',
      msg: `cron job for ${expr} setup`
    })
  );

  cron.schedule(expr, () => {
    task();
  });
};
