import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './src/firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        console.log(`Found ${querySnapshot.size} total users.`);
        querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data().displayName, " balance: ", doc.data().balance);
        });
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}
run();
