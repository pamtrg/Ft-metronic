// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    
    Cell: ({...props}) => <UserSelectionCell channelId={props.data[props.row.index].channelId} />,
  },
  
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Username' className='min-w-125px' />,
    id: 'username',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Is Livestream' className='min-w-100px' />
    ),
    id: 'is_livestream',
    Cell: ({...props}) => <UserTwoStepsCell two_steps={1} />,
  },



  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Following' className='min-w-100px' />
    ),
    id: 'following_count',
    Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].owner.follow_info.following_count} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Follower' className='min-w-100px' />
    ),
    id: 'follower_count',
    Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].owner.follow_info.follower_count} />,
  },


  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Live count' className='min-w-100px' />
    ),
    id: 'liveChatCount',
    Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].liveChatCount} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell channelId={props.data[props.row.index].channelId} />,
  },
]

export {usersColumns}
