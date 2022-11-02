export function TimeChange () {
  const now = new Date()

  let nowHours = now.getHours() - 1
  let nowMinites = "00"
  if (now.getMinutes() > 45) {
    nowMinites = "30"
    nowHours += 1
  } 

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