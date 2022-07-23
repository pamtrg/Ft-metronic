import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  channelId: ID
  owner : {
    cover : string
    username : string
    nickname : string
    bio_description? : string
    follow_info : {
      follower_count : number,
      following_count : number
    }

  }
  liveChatCount?: String


}




export type UsersQueryResponse = Response<Array<User>>

