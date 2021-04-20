import db from "src/firebase";

export async function getUnAcceptedUsers() {
  // return db.collection("users-basics").onSnapshot
  return await db
    .collection("users-basics")
    .get()
    .then((res) => {
      var arr = [];
      res.forEach((e) => {
        if (e.data().isAccepted == false) {
          db.collection("users-details")
            .doc(e.id)
            .get()
            .then((response) => {
              //   console.log(e.id);
              //   console.log(e.data());
              //   console.log(response.data());

              let d = {
                id: e.id,
                name:
                  response.data().firstName + " " + response.data().lastName,
                nationalID: response.data().nationalID,
                track: response.data().track,
                branch: response.data().branch,
                email: e.data().email,
              };
              arr.push(d);
            });
          //console.log(arr);
        }
        console.log(arr[0]);
      });
      console.log(arr);
      //   arr.map((u) => {
      //     console.log(u);
      //   });
      return arr;
    });
}
