import { db } from "src/firebase";

// export function getGroupData() {
//   return db.collection("Groups");
// }

export function getGroupData() {
  return db.collection("Groups2");
}

export function getUsers(id) {
  return db.collection('Groups2').doc(id).collection('Users')
}

export function addNewGroup(data) {
  return db.collection("Groups2").add(data);
}

// export function addNewGroup(data) {
//   return db.collection("Groups").add(data);
// }

export function delGroup(id) {
  return db.collection("Groups2").doc(id).delete();
}

export function delUser(id, user) {
  return db.collection("Groups2").doc(id).collection('Users').doc(user).delete();
}

export function editUser(id, user, role) {
  switch (role) {
    case 'admin':
      return db.collection("Groups2").doc(id).collection('Users').doc(user).update({
        Role: 1
      });
    case 'member':
      return db.collection("Groups2").doc(id).collection('Users').doc(user).update({
        Role: 2
      });
    case 'subs':
      return db.collection("Groups2").doc(id).collection('Users').doc(user).update({
        Role: 0
      });
    default:
      break;
  }
}

export function EditGroup() {
  return db.collection("Groups");
}
