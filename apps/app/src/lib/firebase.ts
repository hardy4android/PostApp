import firestore from '@react-native-firebase/firestore';

// This is your Firestore database instance
// This creates a single Firestore connection for the whole app
export const db = firestore();