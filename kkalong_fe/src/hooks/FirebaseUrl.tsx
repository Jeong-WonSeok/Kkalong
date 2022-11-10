import axios from '../api/axios'
import requests from '../api/requests'
import { BestDresserArticle, HelpCodiArticle } from '../pages/Community/MainCommunity'

export default function FirebaseUrl(data: any): string {
  const FirebaseBucket = 'kkalong-b4cec.appspot.com'

  let imgurl = ''
  let email = ''
  let id = 0

  if (data.Help) {
    const Help = data as HelpCodiArticle
    imgurl = Help.Help.help_img
    email = Help.Help.user.email
    id = Help.Help.user.user_id
  } else {
    const Best = data as BestDresserArticle
    imgurl = Best.Best.img
    email = Best.user.email
    id = Best.user.user_id
  }
  const Url = `https://firebasestorage.googleapis.com/v0/b/${FirebaseBucket}/o/${id}_${email}?alt=media/${imgurl}`
  return Url
}