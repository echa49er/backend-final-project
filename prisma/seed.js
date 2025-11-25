import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // --- Your other seed data can go here ---

  console.log('Seeding parts...');
  const part1 = await prisma.part.upsert({
    where: { partNumber: 'PF-48' }, // <-- FIXED: Use a unique field for the 'where' clause
    update: {}, // We don't want to change it if it exists
    create: {
      name: 'Oil Filter',
      partNumber: 'PF-48', // <-- FIXED: Add the unique field to the 'create' object
      description: 'OEM oil filter',
      currentPrice: 14.99,
      stockQuantity: 20,
    },
  });

  const part2 = await prisma.part.upsert({
    where: { partNumber: 'AF-22' }, // Example for a second part
    update: {},
    create: {
      name: 'Air Filter',
      partNumber: 'AF-22',
      description: 'OEM air filter',
      currentPrice: 22.50,
      stockQuantity: 30,
    },
  });

  console.log({ part1, part2 });
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });