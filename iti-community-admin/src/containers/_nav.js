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
        name: "Unaccepted Admins",
        to: "/admins/unaccepted",
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
      {
        _tag: "CSidebarNavItem",
        name: "Edit Groups",
        to: "/Groups/:id",
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
        to: "/branches/Add-Branche",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Edit Branch",
        to: "/branches/Edit-Branche",
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
      {
        _tag: "CSidebarNavItem",
        name: "Edit Track",
        to: "/tracks/Edit-Track",
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
  {
    _tag: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Login",
        to: "/login",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register",
        to: "/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 404",
        to: "/404",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 500",
        to: "/500",
      },
    ],
  },
  //////////////////////////////
];

export default _nav;
