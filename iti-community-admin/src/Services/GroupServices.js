import React, { useEffect, useState } from "react";
import db from "src/firebase";
import AllGroups from "../views/Groups/All/allGroups";

export default function GroupServices() {
  const [group, setGroup] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await db
        .collection("Groups")
        .get()
        .then((res) => {
          var arr = [];
          console.log(res);
          res.forEach((e) => {
            arr.push({
              id: e.id,
              data: e.data(),
            });
          });
          setGroup(arr);
        });
    };
  }, []);

  for (let i = 0; i < group.length; i++) {
    console.log(group[i].data);
    console.log(group[i].id);
  }

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
  return (
    <>
      <AllGroups grp={group} />
    </>
  );
}
