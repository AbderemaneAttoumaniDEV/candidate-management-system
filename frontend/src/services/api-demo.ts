import { 
  Candidate, 
  Document, 
  CreateCandidateData, 
  UpdateCandidateData,
  CreateDocumentData, 
  UpdateDocumentStatusData,
  ApiResponse 
} from '@/types';

// Données de démonstration pour GitHub Pages
const demoCandidates: Candidate[] = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "0123456789",
    address: "123 Rue de la Paix, Paris",
    dateOfBirth: "1990-05-15",
    nationality: "Française",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    documents: []
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@email.com",
    phone: "0987654321",
    address: "456 Avenue des Champs, Lyon",
    dateOfBirth: "1985-08-22",
    nationality: "Française",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
    documents: []
  }
];

const demoDocuments: Document[] = [
  {
    id: 1,
    candidateId: 1,
    type: "CNI",
    status: "Validé",
    filePath: "/documents/cni_jean.pdf",
    uploadDate: "2024-01-15T10:30:00Z",
    expiryDate: "2034-01-15T10:30:00Z",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    candidateId: 1,
    type: "Titre de séjour",
    status: "En cours",
    filePath: "/documents/titre_jean.pdf",
    uploadDate: "2024-01-16T09:15:00Z",
    expiryDate: "2025-01-16T09:15:00Z",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-16T09:15:00Z"
  }
];

// Simulation de délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Service API de démonstration
export const demoApiService = {

  // === CANDIDATS ===

  async getCandidates(): Promise<ApiResponse<Candidate>[]> {
    await delay(500); // Simulation délai réseau
    return {
      success: true,
      data: demoCandidates.map(candidate => ({
        ...candidate,
        documents: demoDocuments.filter(doc => doc.candidateId === candidate.id)
      })),
      message: "Candidats récupérés avec succès (Mode Démo)"
    };
  },

  async getCandidate(id: number): Promise<ApiResponse<Candidate>> {
    await delay(300);
    const candidate = demoCandidates.find(c => c.id === id);
    if (!candidate) {
      throw new Error("Candidat non trouvé");
    }
    return {
      success: true,
      data: {
        ...candidate,
        documents: demoDocuments.filter(doc => doc.candidateId === id)
      },
      message: "Candidat récupéré avec succès (Mode Démo)"
    };
  },

  async createCandidate(data: CreateCandidateData): Promise<ApiResponse<Candidate>> {
    await delay(400);
    const newCandidate: Candidate = {
      id: Math.max(...demoCandidates.map(c => c.id)) + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: []
    };
    demoCandidates.push(newCandidate);
    return {
      success: true,
      data: newCandidate,
      message: "Candidat créé avec succès (Mode Démo)"
    };
  },

  async updateCandidate(id: number, data: UpdateCandidateData): Promise<ApiResponse<Candidate>> {
    await delay(400);
    const index = demoCandidates.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error("Candidat non trouvé");
    }
    demoCandidates[index] = {
      ...demoCandidates[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return {
      success: true,
      data: demoCandidates[index],
      message: "Candidat mis à jour avec succès (Mode Démo)"
    };
  },

  async deleteCandidate(id: number): Promise<{ message: string; deletedCandidate: Candidate }> {
    await delay(300);
    const index = demoCandidates.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error("Candidat non trouvé");
    }
    const deletedCandidate = demoCandidates.splice(index, 1)[0];
    return {
      message: "Candidat supprimé avec succès (Mode Démo)",
      deletedCandidate
    };
  },

  // === DOCUMENTS ===

  async getCandidateDocuments(candidateId: number): Promise<Document[]> {
    await delay(300);
    return demoDocuments.filter(doc => doc.candidateId === candidateId);
  },

  async getDocument(id: number): Promise<Document> {
    await delay(200);
    const document = demoDocuments.find(d => d.id === id);
    if (!document) {
      throw new Error("Document non trouvé");
    }
    return document;
  },

  async createDocument(candidateId: number, data: CreateDocumentData): Promise<ApiResponse<Document>> {
    await delay(400);
    const newDocument: Document = {
      id: Math.max(...demoDocuments.map(d => d.id)) + 1,
      candidateId,
      ...data,
      uploadDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    demoDocuments.push(newDocument);
    return {
      success: true,
      data: newDocument,
      message: "Document ajouté avec succès (Mode Démo)"
    };
  },

  async updateDocumentStatus(id: number, data: UpdateDocumentStatusData): Promise<Document> {
    await delay(300);
    const document = demoDocuments.find(d => d.id === id);
    if (!document) {
      throw new Error("Document non trouvé");
    }
    document.status = data.status;
    document.updatedAt = new Date().toISOString();
    return document;
  },

  async deleteDocument(id: number): Promise<{ message: string; deletedDocument: Document }> {
    await delay(300);
    const index = demoDocuments.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error("Document non trouvé");
    }
    const deletedDocument = demoDocuments.splice(index, 1)[0];
    return {
      message: "Document supprimé avec succès (Mode Démo)",
      deletedDocument
    };
  },

  // === UTILITAIRES ===

  async healthCheck(): Promise<{ status: string; message: string }> {
    await delay(100);
    return {
      status: "demo",
      message: "Service de démonstration actif (GitHub Pages)"
    };
  },
}; 