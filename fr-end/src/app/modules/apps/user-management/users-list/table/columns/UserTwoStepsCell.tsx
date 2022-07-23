import {FC} from 'react'

type Props = {
  two_steps?: boolean
}

const UserTwoStepsCell: FC<Props> = ({two_steps}) => (
  <> <div className='badge badge-light-success fw-bolder' >{two_steps}</div></>
)

export {UserTwoStepsCell}
