import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- User ---
  const passwordHash = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash,
      firstName: 'Test',
      lastName: 'User',
      phone: '555-1234',
      address: '123 Main St'
    }
  });

  // --- Vehicle ---
  const vehicle = await prisma.vehicle.create({
    data: {
      userId: user.id,
      make: 'Toyota',
      model: 'Camry',
      year: 2018,
      mileage: 45000
    }
  });

  // --- Mechanic ---
  const mechanic = await prisma.mechanic.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'mechanic@example.com',
      phone: '555-9876',
      department: 'General Repair'
    }
  });

  // --- Service Type ---
  const serviceType = await prisma.serviceType.create({
    data: {
      name: 'Oil Change',
      description: 'Standard oil and filter change',
      estimatedDurationMinutes: 45,
      baseCost: 59.99
    }
  });

  // --- Service ---
  const service = await prisma.service.create({
    data: {
      vehicleId: vehicle.id,
      serviceTypeId: serviceType.id,
      scheduledDate: new Date(),
      status: 'SCHEDULED',
      notes: 'Initial service'
    }
  });

  // --- Service Assignment ---
  await prisma.serviceAssignment.create({
    data: {
      serviceId: service.id,
      mechanicId: mechanic.id,
      hoursWorked: 1.0
    }
  });

  // --- Part ---
  const part = await prisma.part.create({
    data: {
      name: 'Oil Filter',
      description: 'OEM oil filter',
      currentPrice: 14.99,
      stockQuantity: 20
    }
  });

  // --- ServicePart ---
  await prisma.servicePart.create({
    data: {
      serviceId: service.id,
      partId: part.id,
      quantityUsed: 1,
      unitCost: 14.99
    }
  });

  // --- Invoice ---
  await prisma.invoice.create({
    data: {
      serviceId: service.id,
      totalAmount: 74.98,
      taxAmount: 4.76,
      paymentStatus: 'PENDING',
      dueDate: new Date()
    }
  });

  console.log("🌱 Database seeded successfully.");
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
