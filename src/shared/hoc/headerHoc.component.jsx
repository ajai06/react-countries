import React from 'react'
import Header from '../../components/header/header.component'

const WithHeader = (Component) => () => {
    return (
        <div>
            <Header />
            <Component />
        </div>
    )
}

export default WithHeader
