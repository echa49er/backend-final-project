import { prisma } from '../prisma/client.js';

// All services for a user across their vehicles
export async function getUserServiceHistory(req, res) {
  try {
    const userId = Number(req.params.userId);

    const services = await prisma.service.findMany({
      where: { vehicle: { userId } },
      include: { vehicle: true, serviceType: true, invoice: true }
    });

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Upcoming scheduled services
export async function getUpcomingServices(req, res) {
  try {
    const now = new Date();

    const services = await prisma.service.findMany({
      where: {
        scheduledDate: { gte: now },
        status: 'SCHEDULED'
      },
      include: { vehicle: true, serviceType: true }
    });

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Overdue invoices
export async function getOverdueInvoices(req, res) {
  try {
    const now = new Date();

    const invoices = await prisma.invoice.findMany({
      where: {
        paymentStatus: 'OVERDUE',
        dueDate: { lt: now }
      },
      include: { service: { include: { vehicle: true } } }
    });

    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
