import axios from 'axios';
import { 
  Candidate, 
  Document, 
  CreateCandidateData, 
  UpdateCandidateData,
  CreateDocumentData, 
  UpdateDocumentStatusData,
  ApiResponse 
} from '@/types';

// Configuration d'Axios pour communication avec l'API backend
const api = axios.create({
  baseURL: 'http://localhost:3001', // URL du backend NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gère les appels API vers le backend
export const apiService = {

  // === CANDIDATS ===

  // Récupération de tous les candidats avec leurs documents
  async getCandidates(): Promise<ApiResponse<Candidate>[]> {
    const response = await api.get('/candidates');
    return response.data;
  },

  // Récupération candidat par son ID
  async getCandidate(id: number): Promise<ApiResponse<Candidate>> {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },

  // Création nouveau candidat
  async createCandidate(data: CreateCandidateData): Promise<ApiResponse<Candidate>> {
    const response = await api.post('/candidates', data);
    return response.data;
  },

  // MAJ candidat existant
  async updateCandidate(id: number, data: UpdateCandidateData): Promise<ApiResponse<Candidate>> {
    const response = await api.put(`/candidates/${id}`, data);
    return response.data;
  },

  // Supprimer un candidat
  async deleteCandidate(id: number): Promise<{ message: string; deletedCandidate: Candidate }> {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
  },

  // === DOCUMENTS ===

  // Récupération de tous les documents d'un candidat
  async getCandidateDocuments(candidateId: number): Promise<Document[]> {
    const response = await api.get(`/documents/candidate/${candidateId}`);
    return response.data;
  },

  // Récupération d'un document par son ID
  async getDocument(id: number): Promise<Document> {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  // Ajout d'un document à un candidat
  async createDocument(candidateId: number, data: CreateDocumentData): Promise<ApiResponse<Document>> {
    const response = await api.post(`/documents/${candidateId}`, data);
    return response.data;
  },

  // MAJ statut d'un document
  async updateDocumentStatus(id: number, data: UpdateDocumentStatusData): Promise<Document> {
    const response = await api.put(`/documents/${id}/status`, data);
    return response.data;
  },

  // Suppression un document
  async deleteDocument(id: number): Promise<{ message: string; deletedDocument: Document }> {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },

  // === UTILITAIRES ===

  // Vérification de l'API
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await api.get('/health');
    return response.data;
  },
};

// Intercepteur qui gère les erreurs 
api.interceptors.response.use(
  (response) => response, // Si la réponse est OK, la retourner telle quelle
  (error) => {
    // En cas d'erreur, afficher des informations utiles pour le débogage
    console.error('Erreur API:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    
    // Relancer l'erreur pour qu'elle soit gérée par le composant appelant
    return Promise.reject(error);
  }
);

export default api; 