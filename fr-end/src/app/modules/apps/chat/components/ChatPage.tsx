import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {Private} from './Private'
import {Group} from './Group'

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'TikTok Live',
    path: '/apps/chat/tiktok-live',
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

const ChatPage = () => {
 
  
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='tiktok-live'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Private chat</PageTitle>
              <Private />
            </>
          }
        />
        <Route
          path='group-chat'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Group chat</PageTitle>
              <Group />
            </>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
        <Route index element={<Navigate to='/apps/tiktok/tiktok-live' />} />
      </Route>
    </Routes>
  )
}

export default ChatPage
