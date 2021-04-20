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
    name: 'Jobs',
    route: '/jobs',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Jobs',
        to: '/jobs/showjobs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Job',
        to: '/jobs/addjob',
      }]
    }
  ]


export default _nav
