import React from 'react'
import { Provider } from 'react-redux'
import UsersPageContainer from './UsersPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <UsersPageContainer />
  </Provider>
)


export default Root
