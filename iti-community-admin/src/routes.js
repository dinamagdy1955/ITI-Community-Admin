import React from 'react';

const ShowJobs = React.lazy(() => import('./../src/views/pages/jobs/showJobs'));
const AddJob = React.lazy(() => import('./../src/views/pages/jobs/addJob'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/jobs/showjobs', exact: true, name: 'Show Jobs', component:ShowJobs},
  { path: '/jobs/addjob', exact: true, name: 'Add Jobs', component:AddJob},

];

export default routes;
