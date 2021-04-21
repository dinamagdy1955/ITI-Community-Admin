// import React, { useEffect, useState } from "react";
import db from "src/firebase";
// import AllGroups from "../views/Groups/All/allGroups";

export function getGroupData() {
  // return db
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
  //     return arr;
  //   });
  return db.collection("Groups");
}

export function addNewGroup(data) {
  return db.collection("Groups").add(data);
}

export function delGroup(id) {
  return db.collection("Groups").doc(id).delete();
}
