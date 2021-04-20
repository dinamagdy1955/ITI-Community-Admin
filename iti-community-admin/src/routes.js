import React from 'react';
// import GroupServices from './Services/GroupServices';

// const Groups = React.lazy(() => import('./Services/GroupServices'))
const Groups = React.lazy(() => import('./views/Groups/All/allGroups'))

const addGroups = React.lazy(() => import('./views/Groups/Add/AddGroup'))
const editGroups = React.lazy(() => import('./views/Groups/Edit/EditGroup'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/groups/All', name: 'Groups', component: Groups },
  { path: '/groups/Add', name: 'Add Group', component: addGroups },
  { path: '/groups/:id', name: 'Edit Group', component: editGroups },

];

export default routes;
