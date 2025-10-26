import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Project, Service, TeamMember, Testimonial, MediaAsset, SiteSettings } from '../types';

// Tipos para upload
export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Coleções do Firestore
const COLLECTIONS = {
  PROJECTS: 'projects',
  SERVICES: 'services',
  TEAM: 'team',
  TESTIMONIALS: 'testimonials',
  MEDIA: 'media',
  CONTACTS: 'contacts',
  SETTINGS: 'settings',
} as const;

// Classe principal do serviço Firebase
export class FirebaseService {
  // ==================== PROJETOS ====================
  
  static async getProjects(): Promise<Project[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.PROJECTS), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Garantir que images e videos são arrays
          images: data.images || [],
          videos: data.videos || [],
          // Converter timestamps
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        } as Project;
      });
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    }
  }

  static async getProject(id: string): Promise<Project | null> {
    try {
      const docSnap = await getDoc(doc(db, COLLECTIONS.PROJECTS, id));
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(),
        } as Project;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      throw error;
    }
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTIONS.PROJECTS), {
        ...project,
        // Garantir que images e videos são arrays
        images: project.images || [],
        videos: project.videos || [],
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    try {
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      // Se images ou videos estão sendo atualizados, garantir que são arrays
      if (updates.images !== undefined) {
        updateData.images = updates.images || [];
      }
      if (updates.videos !== undefined) {
        updateData.videos = updates.videos || [];
      }

      await updateDoc(doc(db, COLLECTIONS.PROJECTS, id), updateData);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      throw error;
    }
  }

  static async deleteProject(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
    } catch (error) {
      console.error('Erro ao eliminar projeto:', error);
      throw error;
    }
  }

  // ==================== SERVIÇOS ====================
  
  static async getServices(): Promise<Service[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.SERVICES), orderBy('order', 'asc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  }

  static async createService(service: Omit<Service, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SERVICES), service);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      throw error;
    }
  }

  static async updateService(id: string, updates: Partial<Service>): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTIONS.SERVICES, id), updates);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      throw error;
    }
  }

  static async deleteService(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SERVICES, id));
    } catch (error) {
      console.error('Erro ao eliminar serviço:', error);
      throw error;
    }
  }

  // ==================== EQUIPA ====================
  
  static async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.TEAM), orderBy('order', 'asc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as TeamMember[];
    } catch (error) {
      console.error('Erro ao buscar equipa:', error);
      throw error;
    }
  }

  static async createTeamMember(member: Omit<TeamMember, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.TEAM), member);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar membro da equipa:', error);
      throw error;
    }
  }

  static async updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTIONS.TEAM, id), updates);
    } catch (error) {
      console.error('Erro ao atualizar membro da equipa:', error);
      throw error;
    }
  }

  static async deleteTeamMember(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.TEAM, id));
    } catch (error) {
      console.error('Erro ao eliminar membro da equipa:', error);
      throw error;
    }
  }

  // ==================== TESTEMUNHOS ====================
  
  static async getTestimonials(): Promise<Testimonial[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.TESTIMONIALS), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as Testimonial[];
    } catch (error) {
      console.error('Erro ao buscar testemunhos:', error);
      throw error;
    }
  }

  static async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.TESTIMONIALS), {
        ...testimonial,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar testemunho:', error);
      throw error;
    }
  }

  static async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTIONS.TESTIMONIALS, id), updates);
    } catch (error) {
      console.error('Erro ao atualizar testemunho:', error);
      throw error;
    }
  }

  static async deleteTestimonial(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.TESTIMONIALS, id));
    } catch (error) {
      console.error('Erro ao eliminar testemunho:', error);
      throw error;
    }
  }

  // ==================== MEDIA ====================
  
  static async uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.({
              progress,
              status: 'uploading',
            });
          },
          (error) => {
            onProgress?.({
              progress: 0,
              status: 'error',
              error: error.message,
            });
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              onProgress?.({
                progress: 100,
                status: 'completed',
                url: downloadURL,
              });
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  }

  static async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Erro ao eliminar ficheiro:', error);
      throw error;
    }
  }

  static async createMediaAsset(asset: Omit<MediaAsset, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MEDIA), {
        ...asset,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar asset de media:', error);
      throw error;
    }
  }

  static async getMediaAssets(): Promise<MediaAsset[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.MEDIA), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as MediaAsset[];
    } catch (error) {
      console.error('Erro ao buscar assets de media:', error);
      throw error;
    }
  }

  static async deleteMediaAsset(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.MEDIA, id));
    } catch (error) {
      console.error('Erro ao eliminar asset de media:', error);
      throw error;
    }
  }

  // ==================== CONFIGURAÇÕES ====================
  
  static async getSettings(): Promise<SiteSettings | null> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.SETTINGS));
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        } as SiteSettings;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      throw error;
    }
  }

  static async updateSettings(settings: Partial<SiteSettings>): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.SETTINGS));
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, settings);
      } else {
        await addDoc(collection(db, COLLECTIONS.SETTINGS), settings);
      }
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      throw error;
    }
  }

  // ==================== CONTACTOS ====================
  
  static async getContacts(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.CONTACTS), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      }));
    } catch (error) {
      console.error('Erro ao buscar contactos:', error);
      throw error;
    }
  }

  static async createContact(contact: any): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), {
        ...contact,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar contacto:', error);
      throw error;
    }
  }

  static async updateContact(id: string, updates: any): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTIONS.CONTACTS, id), {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Erro ao atualizar contacto:', error);
      throw error;
    }
  }

  static async deleteContact(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CONTACTS, id));
    } catch (error) {
      console.error('Erro ao eliminar contacto:', error);
      throw error;
    }
  }
}

export default FirebaseService;
