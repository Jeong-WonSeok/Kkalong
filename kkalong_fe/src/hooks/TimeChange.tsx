export function TimeChange () {
  const now = new Date()

  // 1시간전 예보로 받아옴
  // 바로바로 업데이트가 안되서 받아지지 않는 경우가 있음
  let nowHours = now.getHours() - 1
  let nowMinites = "30"
  const strNowHours = nowHours < 10 ? '0' + String(nowHours) : String(nowHours)

  return strNowHours + nowMinites
}


export function nowDate () {
  const now = new Date()

  const nowMonth = now.getMonth() + 1
  const nowDay = now.getDate()
  const week = ['일', '월', '화', '수', '목', '금', '토']
  const nowWeek = week[now.getDay()]

  return nowMonth + '월 ' + nowDay + '일 ' + nowWeek + '요일 '
}