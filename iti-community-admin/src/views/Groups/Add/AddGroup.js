import { CButton, CCardFooter, CForm, CFormGroup, CInput, CLabel, CTextarea } from '@coreui/react'
import React from 'react'

const AddGroup = () => {

    return (
        <>
            <div className='container'>
                <CForm>
                    <CFormGroup className='mx-auto w-50'>
                        <CLabel htmlFor="name" className='pt-2'>Group Name:</CLabel>
                        <CInput id="name" placeholder="Enter Group name" required />
                        <CLabel htmlFor="textarea-input" className='pt-2'>Description:</CLabel>
                        <CTextarea
                            name="textarea-input"
                            id="textarea-input"
                            rows="9"
                            placeholder="Content..."
                        />
                        <CLabel htmlFor="img" className='pt-2'>Img URL:</CLabel>
                        <CInput id="img" placeholder="Enter Group Img URL" required />
                        <CCardFooter className='mt-3 rounded'>
                            <div className='text-center'>
                                <CButton type='submit' color="info" size="sm" className='w-25 mx-1'>
                                    Add
                                </CButton>
                                <CButton type="reset" size="sm" color="danger" className='w-25 mx-1'>
                                    Reset
                                </CButton>
                            </div>
                        </CCardFooter>
                    </CFormGroup>
                </CForm>
            </div>
        </>
    )
}

export default AddGroup