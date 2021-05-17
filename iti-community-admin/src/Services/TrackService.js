import { db } from "src/firebase";


export function getTracks() {
    return db.collection('Tracks');
}