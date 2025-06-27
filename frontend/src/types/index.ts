// Type pour représenter un candidat
export interface Candidate {
  id: number;
  firstName: string;        
  lastName: string;        
  birthDate: string;       
  createdAt: string;        
  updatedAt: string;       
  documents: Document[];   
}

// Type pour représenter un document
export interface Document {
  id: number;
  type: DocumentType;      
  status: DocumentStatus;   
  fileName: string;        
  filePath: string;         
  createdAt: string;       
  updatedAt: string;       
  candidateId: number;      
  candidate?: Candidate;   
}

// Enum pour les types de documents
export enum DocumentType {
  CNI = 'CNI',                           
  TITRE_SEJOUR = 'TITRE_SEJOUR',        
  RIB = 'RIB',                          
  JUSTIFICATIF_DOMICILE = 'JUSTIFICATIF_DOMICILE', 
  CARTE_VITALE = 'CARTE_VITALE'         
}

// Enum pour les statuts de validation
export enum DocumentStatus {
  EN_COURS = 'EN_COURS',   
  VALIDE = 'VALIDE',       
  REFUSE = 'REFUSE'        
}

// Type pour l'alerte de titre de séjour
export interface Alert {
  type: 'TITRE_SEJOUR';
  message: string;
  show: boolean;
}

// Type pour la réponse API avec alerte
export interface ApiResponse<T> {
  candidate?: T;
  document?: T;
  alert?: Alert | null;
}

// Type pour la création d'un candidat
export interface CreateCandidateData {
  firstName: string;
  lastName: string;
  birthDate: string;
}

// Type pour la mise à jour d'un candidat
export interface UpdateCandidateData {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
}

// Type pour la création d'un document
export interface CreateDocumentData {
  type: DocumentType;
  fileName: string;
  filePath: string;
}

// Type pour la mise à jour du statut d'un document
export interface UpdateDocumentStatusData {
  status: DocumentStatus;
}

// Type pour les options de sélection
export interface SelectOption {
  value: string;
  label: string;
} 