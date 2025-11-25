// Import from the custom output path specified in your schema.prisma
import { PrismaClient } from '../src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
  // --- Your other seed data can go here ---

  console.log('Seeding parts...');
  const part1 = await prisma.part.upsert({
    where: { partNumber: 'PF-48' }, // Use a unique field like partNumber
    update: {},
    create: {
      name: 'Oil Filter',
      partNumber: 'PF-48', // Add the unique field to the create object
      description: 'OEM oil filter',
      currentPrice: 14.99,
      stockQuantity: 20,
    },
  });

  const part2 = await prisma.part.upsert({
    where: { partNumber: 'AF-22' },
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