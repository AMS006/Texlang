import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Topbar from '../components/Common/Topbar'

const Layout = (Component) => ({ ...props }) => {
    return (
        <main>
            <Sidebar />
            <Topbar />
            <Component {...props} />
        </main>
    )
}

export default Layout
