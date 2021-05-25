import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// import GroupServices from './Services/GroupServices';
const UnAcceptAdmin = React.lazy(() =>
  import("./views/Admins/unacceptAdmin/unAcceptAdmin")
);
const Users = React.lazy(() =>
  import("./views/Users/usersRequests/usersRequests")
);
const deleteReportedUsers = React.lazy(() =>
  import("./views/Users/deleteReport/deleteReportedUsers")
);
// const Groups = React.lazy(() => import('./Services/GroupServices'))
const Groups = React.lazy(() => import("./views/Groups/All/allGroups"));

const addGroups = React.lazy(() => import("./views/Groups/Add/AddGroup"));
const editGroups = React.lazy(() => import("./views/Groups/Edit/EditGroup"));

const ShowAll = React.lazy(() => import("./views/Branches/Show-All/showAll"));
const EditBranch = React.lazy(() =>
  import("./views/Branches/Edit-Branch/editBranch")
);
const AddBranch = React.lazy(() =>
  import("./views/Branches/Add-Branch/addBranch")
);

const ShowTracks = React.lazy(() =>
  import("./views/Tracks/Show-Tracks/ShowTracks")
);
const EditTrack = React.lazy(() =>
  import("./views/Tracks/Edit-Track/EditTrack")
);
const AddTrack = React.lazy(() => import("./views/Tracks/Add-Track/AddTrack"));
const ShowJobs = React.lazy(() => import("./views/jobs/All/showJobs"));
const AddJob = React.lazy(() => import("./views/jobs/Add/addJob"));
const EditJob = React.lazy(() => import("./views/jobs/Edit/EditJob"));
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/admins/unaccepted", name: "Admins", component: UnAcceptAdmin },
  { path: "/users/requests", name: "Users", component: Users },
  {
    path: "/users/deleteReported",
    name: "Delete Reported Users",
    component: deleteReportedUsers,
  },
  { path: "/groups/All", name: "Groups", component: Groups },
  { path: "/groups/Add", name: "Add Group", component: addGroups },
  { path: "/groups/:id", name: "Edit Group", component: editGroups },

  { path: "/branches/Show-All", name: "Branches", component: ShowAll },
  { path: "/branches/Add-Branch", name: "Add Branch", component: AddBranch },
  {
    path: "/branches/:id",
    name: "Edit-Branch",
    component: EditBranch,
  },

  { path: "/tracks/Show-Tracks", name: "Tracks", component: ShowTracks },
  { path: "/tracks/Add-Track", name: "Add Track", component: AddTrack },
  { path: "/tracks/:id", name: "Edit Track", component: EditTrack },

  {
    path: "/jobs/showjobs",
    exact: true,
    name: "Jobs",
    component: ShowJobs,
  },
  { path: "/jobs/addjob", exact: true, name: "Add Jobs", component: AddJob },
  { path: "/jobs/:id", exact: true, name: "Edit Job", component: EditJob },
];

export default routes;
