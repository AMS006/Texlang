import React from 'react'

import Layout from '../layout'
import AddProjectForm from '../components/Form/AddProjectForm'

const AddProject = () => {

    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans'>Translate Your Project</h1>
            <div className='border border-blue-500 mt-4'>
                <h3 className='bg-blue-500 text-lg font-sans font-semibold text-white w-full px-4 py-1.5'>Start Your Project</h3>
                <AddProjectForm />
            </div>
        </div>
    )
}
export default Layout(AddProject)
