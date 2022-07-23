import {FC, useMemo} from 'react'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  channelId: ID
}

const UserSelectionCell: FC<Props> = ({channelId}) => {
  
  const {selected, onSelect} = useListView()
  const isSelected = useMemo(() => selected.includes(channelId), [channelId, selected])
  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={isSelected}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={isSelected}
        onChange={() => onSelect(channelId)}
      />
    </div>
  )
}

export {UserSelectionCell}
