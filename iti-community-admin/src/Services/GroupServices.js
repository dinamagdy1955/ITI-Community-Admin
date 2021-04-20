import React, { useEffect, useState } from "react";
import db from "src/firebase";
import AllGroups from "../views/Groups/All/allGroups";

export function getGroupData() {
  return db
    .collection("Groups")
    .get()
    .then((res) => {
      var arr = [];
      res.forEach((e) => {
        arr.push({
          id: e.id,
          data: e.data(),
        });
      });
      return arr;
    });
}
// export default function GroupServices() {
//   const [group, setGroup] = useState([]);
//   useEffect(() => {
//     getData();
//   }, []);

  // const getData = async () => {
  //   await db
  //   .collection("Groups")
  //   .get()
  //   .then((res) => {
  //     var arr = [];
  //     res.forEach((e) => {
  //       arr.push({
  //         id: e.id,
  //         data: e.data(),
  //       });
  //     });
  //     setGroup(arr);
  //   });
  // };
  // const getData = () => {
  //     const resp = db.collection('Groups').get()
  //         .then(function (snapshot) {
  //             var groups = []
  //             snapshot.forEach(function (child) {
  //                 var id = child.id;
  //                 var data = child.data()
  //                 groups.push({ id: id, data });
  //             })
  //             console.log(groups);
  //         })
  // }
  // return (
  //   <>
  //     <AllGroups grp={group} />
  //   </>
  // );
// }
