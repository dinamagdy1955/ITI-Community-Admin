import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import jobsData from './jobsData'
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['position','postedDate', 'level','company','level', 'status']

const showjobs = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Jobs
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={jobsData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
        </CRow>
        </>
  )}
  export default showjobs;