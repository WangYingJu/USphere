import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

// 啟用 dayjs 套件方法
dayjs.extend(utc)
dayjs.extend(relativeTime)
// 到現在為止的時間
const timeToNow = (time) => {
  return dayjs(time).toNow(true)
}

export default timeToNow
