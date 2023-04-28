const schedule = require('node-schedule');

// 隔一段时间执行一次
const repeatJob = (
  { second, minute, hour, date, month, dayOfWeek, year },
  Fn
) => {
  // time [second,minute,hour,date,month,dayOfWeek]
  let rule = new schedule.RecurrenceRule();
  if (second) {
    rule.second = second;
  }
  if (minute) {
    rule.minute = minute;
  }
  if (hour) {
    rule.hour = hour;
  }
  if (date) {
    rule.date = date;
  }
  if (month) {
    rule.month = month;
  }
  if (dayOfWeek) {
    rule.dayOfWeek = dayOfWeek;
  }
  if (year) {
    rule.year = year;
  }
  // job.cancel()取消
  return schedule.scheduleJob(rule, () => {
    Fn();
  });
};

//定时执行
const regularJob = ({ second, minute, hour, date, month, year }, Fn) => {
  let Date = new Date(year, month, date, hour, minute, second);
  return schedule.scheduleJob(Date, () => {
    Fn();
  });
};



module.exports = {
  repeatJob,
  regularJob,
};
