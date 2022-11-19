export function TimeChange () {
  const now = new Date()

  // 1시간전 예보로 받아옴
  // 바로바로 업데이트가 안되서 받아지지 않는 경우가 있음
  let nowHours = now.getHours() - 1
  let nowMinites = "30"
  const strNowHours = nowHours < 10 ? '0' + String(nowHours) : String(nowHours)

  return strNowHours + nowMinites
}


export function nowDate (day: number) {
  const now = new Date()

  let nowMonth = now.getMonth() + 1
  let nowDay = now.getDate() + day
  const week = ['일', '월', '화', '수', '목', '금', '토']
  const nowWeek = week[(now.getDay() + day) % 7]

  const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (nowMonth === 2 && now.getFullYear() % 4 === 0){
    days[2] = 29
  }
  if (nowDay > days[nowMonth]) {
    nowMonth += 1
    // 만약 12월을 넘어가면
    nowMonth = nowMonth > 12 ? nowMonth %= 12 : nowMonth
    nowDay = nowDay % days[nowMonth]
  }

  return nowMonth + '월 ' + nowDay + '일 ' + nowWeek + '요일 '
}