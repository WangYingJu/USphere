import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

// 啟用 dayjs 套件方法
dayjs.extend(utc)
dayjs.extend(relativeTime)
// 到現在為止的時間
const timeToNow = (time) => {
  // 設定本地時間為 UTC 時間（因為後端資料庫設定為 UTC 時間）
  return dayjs(time).utc(true).toNow(true)
}

export default timeToNow
