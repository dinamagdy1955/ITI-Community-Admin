import { db } from "src/firebase";

export function getGroupData() {
  return db.collection("Groups");
}

export function addNewGroup(data) {
  return db.collection("Groups").add(data);
}

export function delGroup(id) {
  return db.collection("Groups").doc(id).delete();
}

export function EditGroup() {
  return db.collection("Groups");
}
