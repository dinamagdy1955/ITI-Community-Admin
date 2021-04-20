
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable, CRow,CButton} from '@coreui/react'
  import React, { Suspense, useState } from 'react'
  import Button from 'react-bootstrap/Button'
  import BranchServices from 'src/Services/BranchService'
   import { Link } from 'react-router-dom'

export default function ShowAll({ br }) {

  BranchServices()
    const usersData = [
        { id: 0, name: 'John Doe', Adress: '2018/01/01', NO_Tracks: 'Guest', NO_Students: 'Pending', NO_Instructors: 'Guest',Manager:'bni'},
        { id: 1, name: 'Samppa Nori', Adress: '2018/01/01', NO_Tracks: 'Member', NO_Students: 'Active', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 2, name: 'Estavan Lykos', Adress: '2018/02/01', NO_Tracks: 'Staff', NO_Students: 'Banned', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 3, name: 'Chetan Mohamed', Adress: '2018/02/01', NO_Tracks: 'Admin', NO_Students: 'Inactive', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 4, name: 'Derick Maximinus', Adress: '2018/03/01', NO_Tracks: 'Member', NO_Students: 'Pending', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 5, name: 'Friderik Dávid', Adress: '2018/01/21', NO_Tracks: 'Staff', NO_Students: 'Active', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 6, name: 'Yiorgos Avraamu', Adress: '2018/01/01', NO_Tracks: 'Member', NO_Students: 'Active',NO_Instructors: 'Guest',Manager:'bni' },
        { id: 7, name: 'Friderik Dávid', Adress: '2018/01/21', NO_Tracks: 'Staff', NO_Students: 'Active', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 8, name: 'Yiorgos Avraamu', Adress: '2018/01/01', NO_Tracks: 'Member', NO_Students: 'Active',NO_Instructors: 'Guest',Manager:'bni' },
        { id: 9, name: 'Friderik Dávid', Adress: '2018/01/21', NO_Tracks: 'Staff', NO_Students: 'Active', NO_Instructors: 'Guest',Manager:'bni' },
        { id: 10, name: 'Yiorgos Avraamu', Adress: '2018/01/01', NO_Tracks: 'Member', NO_Students: 'Active',NO_Instructors: 'Guest',Manager:'bni' },
  
        { id: 11, name: 'Ford Prefect', Adress: '2001/05/25', NO_Tracks: 'Alien', NO_Students: 'Don\'t panic!', NO_Instructors: 'Guest',Manager:'bni' }
    ]
    const getBadge = NO_Students => {
        switch (NO_Students) {
          case 'Active': return 'success'
          case 'Inactive': return 'secondary'
          case 'Pending': return 'warning'
          case 'Banned': return 'danger'
          default: return 'primary'
        }
      }

  
  
      const fields = ['name','Adress', 'NO_Tracks', 'NO_Students','NO_Instructors','Manager','Edit_Delete']
//console.log(br)
    return (
        <>
         <h1>firebase data</h1>{console.log(br)}
  <CRow>
      
        <CCol>
          <CCard>
            <CCardHeader>
            Branches
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'NO_Students':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.NO_Students)}>
                        {item.NO_Students}
                      </CBadge>
                      
                    </td>
                    
                
                  )
              }}
              scopedSlots = {{ 'Edit_Delete':
              (item)=>(
                <td>
                  
                  <Button variant="success">Edit</Button>{' '}
                  <Button variant="danger">Delete</Button>{' '}
                 
                </td>
              )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


        </>
    )


}
