import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = () => {
    const [collapsed, setCollapsed] = React.useState(true)
    const [showElements, setShowElements] = React.useState(true)

    return (
        <>
            <CRow>
                <CCol xs="12" sm="6">
                    <CCard>
                        <CForm action="" method="post" className="form-horizontal" >
                            <CFormGroup>


                                <CCardHeader>
                                    Add a Job
              <small> Form</small>
                                    
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Position</CLabel>
                                                <CInput id="name" placeholder="Enter the position of the annonounced job" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Posted Date</CLabel>
                                                <CInput id="name" placeholder="Enter the posted date" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Company</CLabel>
                                                <CInput id="name" placeholder="Enter the company name" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Level</CLabel>
                                                <CInput id="name" placeholder="Enter the position level" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Description</CLabel>
                                                <CInput id="name" placeholder="Enter the description" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Status</CLabel>
                                                <CInput id="name" placeholder="Enter the job status" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                                <CCardFooter>
                                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
                                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                                </CCardFooter>
                            </CFormGroup>
                        </CForm>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default BasicForms;