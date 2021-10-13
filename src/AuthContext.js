import React from 'react'

const AuthContext = React.createContext({
    token: '',
    changeToken: () => {}
})

export default AuthContext