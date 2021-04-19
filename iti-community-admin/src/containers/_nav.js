import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Groups',
    route: '/groups',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Groups',
        to: '/Groups/All'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Group',
        to: '/Groups/Add'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Edit Groups',
        to: '/Groups/:id'
      }
    ]
  }

]

export default _nav
