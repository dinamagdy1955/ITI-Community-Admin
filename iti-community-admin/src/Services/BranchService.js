import React, { useEffect, useState } from "react";
import { db } from "src/firebase";
import ShowAll from "../views/Branches/Show-All/showAll";

export default function BranchServices() {
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await db
        .collection("Branches")
        .get()
        .then((res) => {
          var arr = [];
          res.forEach((e) => {
            arr.push({
              id: e.id,
              data: e.data(),
            });
          });
          setBranch(arr);
        });
    };
  }, []);

  // const getData = () => {
  //     const resp = db.collection('Branches').get()
  //         .then(function (snapshot) {
  //             var branches = []
  //             snapshot.forEach(function (child) {
  //                 var id = child.id;
  //                 var data = child.data()
  //                 branches.push({ id: id, data });
  //             })
  //             console.log(branches);
  //         })
  // }

  return (
    <>
      <ShowAll br={branch} />
    </>
  );
}
