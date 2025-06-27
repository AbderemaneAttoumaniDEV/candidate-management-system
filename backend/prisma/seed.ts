import { PrismaClient, DocumentType, DocumentStatus } from '@prisma/client';

// Script de seed pour initialiser la base de données avec des données de test
// Ce script crée des candidats et documents d'exemple pour tester l'application
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding de la base de données...');

  // Supprimer toutes les données existantes
  console.log('🗑️  Suppression des données existantes...');
  await prisma.document.deleteMany();
  await prisma.candidate.deleteMany();

  // Créer des candidats de test
  console.log('👥 Création des candidats de test...');
  
  const candidate1 = await prisma.candidate.create({
    data: {
      firstName: 'Jean',
      lastName: 'Dupont',
      birthDate: new Date('1990-05-15'),
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      firstName: 'Marie',
      lastName: 'Martin',
      birthDate: new Date('1985-12-03'),
    },
  });

  const candidate3 = await prisma.candidate.create({
    data: {
      firstName: 'Ahmed',
      lastName: 'Benali',
      birthDate: new Date('1992-08-22'),
    },
  });

  // Créer des documents pour le premier candidat
  console.log('📄 Création des documents pour Jean Dupont...');
  await prisma.document.createMany({
    data: [
      {
        candidateId: candidate1.id,
        type: DocumentType.CNI,
        status: DocumentStatus.VALIDE,
        fileName: 'cni_jean_dupont.pdf',
        filePath: '/uploads/cni_jean_dupont.pdf',
      },
      {
        candidateId: candidate1.id,
        type: DocumentType.RIB,
        status: DocumentStatus.EN_COURS,
        fileName: 'rib_jean_dupont.pdf',
        filePath: '/uploads/rib_jean_dupont.pdf',
      },
      {
        candidateId: candidate1.id,
        type: DocumentType.JUSTIFICATIF_DOMICILE,
        status: DocumentStatus.VALIDE,
        fileName: 'justificatif_domicile_jean.pdf',
        filePath: '/uploads/justificatif_domicile_jean.pdf',
      },
    ],
  });

  // Créer des documents pour le deuxième candidat
  console.log('📄 Création des documents pour Marie Martin...');
  await prisma.document.createMany({
    data: [
      {
        candidateId: candidate2.id,
        type: DocumentType.CARTE_VITALE,
        status: DocumentStatus.VALIDE,
        fileName: 'carte_vitale_marie.pdf',
        filePath: '/uploads/carte_vitale_marie.pdf',
      },
      {
        candidateId: candidate2.id,
        type: DocumentType.RIB,
        status: DocumentStatus.REFUSE,
        fileName: 'rib_marie_martin.pdf',
        filePath: '/uploads/rib_marie_martin.pdf',
      },
    ],
  });

  // Créer des documents pour le troisième candidat (avec titre de séjour pour tester l'alerte)
  console.log('📄 Création des documents pour Ahmed Benali (avec titre de séjour)...');
  await prisma.document.createMany({
    data: [
      {
        candidateId: candidate3.id,
        type: DocumentType.TITRE_SEJOUR,
        status: DocumentStatus.VALIDE,
        fileName: 'titre_sejour_ahmed.pdf',
        filePath: '/uploads/titre_sejour_ahmed.pdf',
      },
      {
        candidateId: candidate3.id,
        type: DocumentType.RIB,
        status: DocumentStatus.EN_COURS,
        fileName: 'rib_ahmed_benali.pdf',
        filePath: '/uploads/rib_ahmed_benali.pdf',
      },
      {
        candidateId: candidate3.id,
        type: DocumentType.JUSTIFICATIF_DOMICILE,
        status: DocumentStatus.VALIDE,
        fileName: 'justificatif_domicile_ahmed.pdf',
        filePath: '/uploads/justificatif_domicile_ahmed.pdf',
      },
    ],
  });

  console.log('✅ Seeding terminé avec succès !');
  console.log(`📊 Données créées :`);
  console.log(`   - ${await prisma.candidate.count()} candidats`);
  console.log(`   - ${await prisma.document.count()} documents`);
  console.log('');
  console.log('🎯 Test de l\'alerte titre de séjour :');
  console.log('   - Ahmed Benali a un titre de séjour et devrait déclencher une alerte');
  console.log('');
  console.log('🚀 Vous pouvez maintenant lancer l\'application !');
}

// Fonction principale avec gestion d'erreur
main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 