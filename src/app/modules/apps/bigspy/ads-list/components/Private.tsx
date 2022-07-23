/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC ,useState,useMemo} from 'react'
import { Card5 } from '../../../../../../_metronic/partials/content/cards/Card5'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import { useParams } from 'react-router-dom'



function Private() {
    // let { apptype } = useParams();
    // const [isurl, setUrl] = useState(['tiktok', 'bigo']);
    const users = useQueryResponseData()
  
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => users, [users])





    return (
        <>
            <div className='d-flex flex-wrap flex-stack mb-6'>





                <h3 className='fw-bolder my-2'>
                    My Contacts
                    <span className='fs-6 text-gray-400 fw-bold ms-1'>(59)</span>
                </h3>

                <div className='d-flex my-2'>
                    <select
                        name='status'
                        data-control='select2'
                        data-hide-search='true'
                        className='form-select form-select-white form-select-sm w-125px'
                        defaultValue='Online'
                    >
                        <option value='Online'>Online</option>
                        <option value='Pending'>Pending</option>
                        <option value='Declined'>Declined</option>
                        <option value='Accepted'>Accepted</option>
                    </select>
                </div>
            </div>

            <div className='row g-6 g-xl-9'>
               {
                users.map((user, index) => {
                    return (
                        <>
                <div className='col-sm-6 col-xl-4'>
                    <Card5 {...user} />
                        
                        
                </div>
                        </>
                    )
                })
               }

    


      
            </div>

            <div className='d-flex flex-stack flex-wrap pt-10'>
                <div className='fs-6 fw-bold text-gray-700'>Showing 1 to 10 of 50 entries</div>

                <ul className='pagination'>
                    <li className='page-item previous'>
                        <a href='#' className='page-link'>
                            <i className='previous'></i>
                        </a>
                    </li>

                    <li className='page-item active'>
                        <a href='#' className='page-link'>
                            1
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            2
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            3
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            4
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            5
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            6
                        </a>
                    </li>

                    <li className='page-item next'>
                        <a href='#' className='page-link'>
                            <i className='next'></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export { Private }
