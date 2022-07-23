/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC ,useState,useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {KTCard} from '../../../../../_metronic/helpers'


// function UserInfo() {

  
//     const search = useLocation().search
   
//     const name = new URLSearchParams(search).get('channelId');
//     console.log(name)





const UserInfo = () => {
  const {itemIdForUpdate} = useListView()
  const search = useLocation().search
 
  const name = new URLSearchParams(search).get('channelId');
  console.log(name)
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined }
    </>
  )
}

const UserInfoWrapper = () => (
  
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UserInfo />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UserInfoWrapper}
