import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Admins",
    route: "/admins",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Admins",
        to: "/admins/All",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Unaccepted Admins",
      //   to: "/admins/unaccepted",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Register New Admin",
        to: "/register",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Users",
    route: "/users",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Users",
        to: "/users/show",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Unaccepted Users",
        to: "/users/requests",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Delete Reported Users",
        to: "/users/deleteReported",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Groups",
    route: "/groups",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Groups",
        to: "/Groups/All",
      },
      {
        _tag: "CSidebarNavItem",
        name: "New Group",
        to: "/Groups/Add",
      },
    ],
  },
  //////////////////////////////////////
  {
    _tag: "CSidebarNavDropdown",
    name: "Branches",
    route: "/branches",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Show All",
        to: "/branches/Show-All",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Branch",
        to: "/branches/Add-Branch",
      },
    ],
  },
  //////////////////////////////
  //////////////////////////////////////
  {
    _tag: "CSidebarNavDropdown",
    name: "Tracks",
    route: "/tracks",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Show Tracks",
        to: "/tracks/Show-Tracks",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Track",
        to: "/tracks/Add-Track",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Jobs",
    route: "/jobs",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Show Jobs",
        to: "/jobs/showjobs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Job",
        to: "/jobs/addjob",
      },
    ],
  },
  //////////////////////////////
];

export default _nav;
