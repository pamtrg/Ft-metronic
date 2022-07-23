/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href={`https://www.tiktok.com/@${user.channelId}`}>
        {user.owner.cover ? (
          <div className='symbol-label'>
            <img src={`${user.owner.cover}`} alt={user.owner.username} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-`,
              `text-`
            )}
          >
           
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {user.owner.username}
      </a>
      <span>{user.owner.nickname}</span>
    </div>
  </div>
)

export {UserInfoCell}
