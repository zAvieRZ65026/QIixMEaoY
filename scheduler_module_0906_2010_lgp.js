// 代码生成时间: 2025-09-06 20:10:34
const { CronJob } = require('cron');

// 定时任务调度器模块
module.exports = function () {
  // 存储所有的定时任务
  let jobs = [];

  // 创建一个新的定时任务
  function createJob(cronTime, onTick, onComplete) {
    try {
      const job = new CronJob({
        cronTime,
        onTick: () => {
          // 执行定时任务
          onTick();
        },
        onComplete: () => {
          // 定时任务完成后的回调
          if (typeof onComplete === 'function') {
            onComplete();
          }
        },
        start: true,
      });
      // 将任务添加到数组中
      jobs.push(job);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  }

  // 停止所有定时任务
  function stopAllJobs() {
    jobs.forEach(job => job.stop());
  }

  // 导出模块的公共接口
  return {
    createJob,
    stopAllJobs,
  };
};