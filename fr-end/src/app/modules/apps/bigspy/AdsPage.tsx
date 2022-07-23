import {Navigate, Route, Routes, Outlet,MemoryRouter} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {AdsListWrapper} from './ads-list/Adslist'

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'TikTok Ads',
    path: '/apps/bigspy/page/tiktok',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]





const AdsPage = () => {

  
  
  return (
    <Routes>
      <Route element={<Outlet />}>

   
        <Route
          
          path="page/:app_type"
          element={
            <>
           
              <PageTitle breadcrumbs={chatBreadCrumbs} >User</PageTitle>
              <AdsListWrapper  />
            </>
          }
        />
         <Route path='*' element={<Navigate to='/error/404' />} />
        <Route index element={<Navigate to='/apps/bigspy/page/tiktok' />} />
      </Route>
    </Routes>
  )
}

export default AdsPage
