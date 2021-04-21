import {
  // CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGroupData } from "src/Services/GroupServices";

export default function AllGroups() {
  const [group, setGroup] = useState([])
  var arr = []

  useEffect(() => {
    getGroupData().then((res) => {
      res.map((g, i) => {
        var day = new Date(g.data.createdDate * 1000).getDate();
        var month = new Date(g.data.createdDate * 1000).getMonth()
        var year = new Date(g.data.createdDate * 1000).getFullYear() - 1969
        arr.push({
          id: g.id,
          Name: g.data.Name,
          About: g.data.About,
          members: g.data.members.length,
          URL: g.data.imgURL,
          CreatedAt: day + "-" + month + "-" + year
        })
      })
    })
    setGroup(arr)
  }, [])

  const [details, setDetails] = useState([])

  const toggleDetails = (index) => {
    const Position = details.indexOf(index)
    let newDetails = details.slice()
    if (Position !== -1) {
      newDetails.splice(Position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const fields = [
    { key: 'Name', _style: { width: '40%' } },
    'CreatedAt',
    { key: 'members', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  return (
    <>

      <CDataTable
        items={group}
        fields={fields}
        columnFilter
        tableFilter
        itemsPerPageSelect
        itemsPerPage={10}
        hover
        sorter
        pagination
        scopedSlots={{
          'show_details':
            (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => { toggleDetails(index) }}
                  >
                    {details.includes(index) ? 'Hide' : 'Show'}
                  </CButton>
                </td>
              )
            },
          'details':
            (item, index) => {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <h4>
                      {/* {item.Name} */}
                    </h4>

                    <p className="text-muted">User since: { }</p>
                    <Link to={`/Groups/${item.id}`}>
                      <CButton size="sm" color="info">
                        Edit
                      </CButton>
                    </Link>
                    <CButton size="sm" color="danger" className="ml-1">
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
            }
        }}
      />

    </>
  )
}
