/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'
import {Dropdown1} from '../dropdown/Dropdown1'
import {ItemAds} from '../../../../app/modules/apps/bigspy/ads-list/core/_models'


const Card5: FC<ItemAds>  = ({
...props

}) => {
  return (
    <div className='card h-100'>
      <div className='card-header flex-nowrap border-0 pt-9'>
        <div className='card-title m-0'>
        <div className='symbol symbol-45px w-45px bg-light me-5'>
            <img src={props.logo_url} alt='Metronic' className='p-3' />
          </div>
          <a href='#' className='fs-4 fw-bold text-hover-primary text-gray-600 m-0'>
            {props.title}
          </a>
        </div>

        <div className='card-toolbar m-0'>
          <button
            type='button'
            className='btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary me-n3'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen024.svg'
              className='svg-icon-3 svg-icon-primary'
            />
          </button>

          <Dropdown1 />
        </div>
      </div>

      <div className='card-body d-flex flex-column px-9 pt-6 pb-8'>
        <div className='fs-2tx fw-bolder mb-3'>{props.description}</div>
        <div className='mb-5'>
         
          <div
            onClick={() => {
              
              window.location.href = props.video_url

            }}
            className='bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5'
            style={{
              backgroundImage: `url(${props.image_url})`,
            }}
          ></div>
         
          {/* begin::Image */}

          {/* end::Image */}

          {/* begin::Text */}
          <div className='text-gray-800 mb-5'>
            Ở đây không có gì hết
          </div>
          {/* end::Text */}

          {/* begin::Toolbar */}

          {/* end::Toolbar */}
        </div>
        <div className='d-flex align-items-center flex-wrap mb-5 mt-auto fs-6'>
          {props.status === 'up' && (
            <KTSVG
              path='/media/icons/duotune/arrows/arr007.svg'
              className='svg-icon-3 me-1 svg-icon-success'
            />
          )}

          {props.status === 'down' && (
            <KTSVG
              path='/media/icons/duotune/arrows/arr006.svg'
              className='svg-icon-3 me-1 svg-icon-danger'
            />
          )}

          <div className={`fw-bolder me-2 ` + (props.status === 'up' ? 'text-success' : 'text-danger')}>
            {props.status === 'up' ? '+' : '-'}
            {props.statusValue}%
          </div>

          <div className='fw-bold text-gray-400'>{props.statusDesc}</div>
        </div>
        <div className='d-flex align-items-center mb-5'>
          
            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
            >
              <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-2' />
              {props.heat}
            </a>
            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
            >
              <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-2' />
              {props.impression}
            </a>
            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
            >
              <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-2' />
              {props.days_count}
            </a>
            <a
              href='#'
              className='btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2'
            >
              <KTSVG path='/media/icons/duotune/general/gen030.svg' className='svg-icon-2' />
              {props.last_seen}
            </a>
          </div>
        <div className='d-flex align-items-center fw-bold'>
          <span className='badge bg-light text-gray-700 px-3 py-2 me-2'>{props.progress}%</span>
          <span className='text-gray-400 fs-7'>{props.progressType}</span>
        </div>
      </div>
    </div>
  )
}

export {Card5}
