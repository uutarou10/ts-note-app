import { firestore } from 'firebase';
import Note from '../../model/note';
import { getDB } from '../firebase';

const notesCollectionRef = getDB().collection('notes');

export default {
  getAll: async (): Promise<Note[]> => {
    const snapshot = await notesCollectionRef.get()
    const result: Note[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      result.push(new Note(
        doc.id,
        data.title,
        data.body,
        data.createdAt.toDate(),
        data.updatedAt.toDate()
      ));
    });

    return result;
  },

  create: async (title: string): Promise<Note> => {
    const docRef = await notesCollectionRef.add({
      title,
      body: '',
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp()
    });

    const snapshot = await docRef.get()
    const data = snapshot.data() as firestore.DocumentData;
    return new Note(
      snapshot.id,
      data.title,
      data.body,
      data.createdAt.toDate(),
      data.updatedAt.toDate()
    );
  },

  update: async (id: string, title: string, body: string): Promise<Note> => {
    await notesCollectionRef.doc(id).update({
      title,
      body,
      updatedAt: firestore.FieldValue.serverTimestamp()
    });

    const snapshot = await notesCollectionRef.doc(id).get();
    const data = snapshot.data() as firestore.DocumentData;
    return new Note(
      snapshot.id,
      data.title,
      data.body,
      data.createdAt.toDate(),
      data.updatedAt.toDate()
    );
  },

  delete: (note: Note): Promise<void> => {
    return notesCollectionRef.doc(note.id).delete();
  }
}