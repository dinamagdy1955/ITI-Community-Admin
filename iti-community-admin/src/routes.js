import React from 'react';
// import GroupServices from './Services/GroupServices';

// const Groups = React.lazy(() => import('./Services/GroupServices'))
const Groups = React.lazy(() => import('./views/Groups/All/allGroups'))

const addGroups = React.lazy(() => import('./views/Groups/Add/AddGroup'))
const editGroups = React.lazy(() => import('./views/Groups/Edit/EditGroup'))

const ShowAll= React.lazy(() => import('./views/Branches/Show-All/showAll'))
const EditBranch = React.lazy(() => import('./views/Branches/Edit-Branch/editBranch'))
const AddBranch = React.lazy(() => import('./views/Branches/Add-Branch/addBranch'))

const ShowTracks= React.lazy(() => import('./views/Tracks/Show-Tracks/ShowTracks'))
const EditTrack = React.lazy(() => import('./views/Tracks/Edit-Track/EditTrack'))
const AddTrack = React.lazy(() => import('./views/Tracks/Add-Track/AddTrack'))




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/groups/All', name: 'Groups', component: Groups },
  { path: '/groups/Add', name: 'Add Group', component: addGroups },
  { path: '/groups/:id', name: 'Edit Group', component: editGroups },

  { path: '/branches/Show-All', name: 'Show All', component:ShowAll },
  { path: '/branches/Add-Branche', name: 'Add Branch', component:AddBranch },
  { path: '/branches/Edit-Branche', name: 'Edit-Branch', component:EditBranch },

  { path: '/tracks/Show-Tracks', name: 'Show Tracks', component:ShowTracks},
  { path: '/tracks/Add-Track', name: 'Add Track', component:AddTrack },
  { path: '/tracks/Edit-Track', name: 'Edit Track', component:EditTrack },

];

export default routes;
