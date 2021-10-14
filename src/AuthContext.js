import React from 'react'

const AuthContext = React.createContext({
    userId: 0,
    token: '',
    changeToken: () => {},
    changeUserID: () => {}
})

export default AuthContext