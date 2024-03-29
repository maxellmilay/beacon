import { getFirestore, setDoc, doc, collection, query, getDocs } from "firebase/firestore";
import app from '@/db/firebase';
import { UserInterface } from '@/interface/authInterface';

const db = getFirestore(app);

export const postInitialUserData = async (user: UserInterface) => {
    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let userAccountAlreadyExists = 0;

    userSnapshot.forEach((u) => {
        const userData = u.data();
        if (userData.email == user.email) {
            userAccountAlreadyExists = 1;
        }
    })

    if (userAccountAlreadyExists) {
        return;
    }

    await setDoc(doc(collection(db, 'users')), {
        name: user.name,
        email: user.email
    })
}
