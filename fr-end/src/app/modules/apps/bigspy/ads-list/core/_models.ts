import { Response} from '../../../../../../_metronic/helpers'
export type ItemAds = {
  heat: number
  impression : number
  days_count : number
  like_count : number
  dislike_count : number
  comment_count : number
  share_count : number
  last_seen : string
  image_url: string
  logo_url: string
  title: string 
  video_url: string
  description: string 
  status: 'up' | 'down'
  statusValue: number 
  statusDesc: string 
  progress: number 
  progressType: string 
}

// title='Twitter Followers'
// description='807k'
// status='up'
// statusValue={17.62}
// statusDesc='Followers growth'
// progress={5}
// progressType='New trials'





export type UsersQueryResponse = Response<Array<ItemAds>>

