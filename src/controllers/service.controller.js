import { prisma } from '../prisma/client.js';

export async function getServices(req, res) {
  try {
    const services = await prisma.service.findMany({
      include: { vehicle: true, serviceType: true }
    });

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getServiceById(req, res) {
  try {
    const id = Number(req.params.id);

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        serviceAssignments: true,
        serviceParts: true,
        invoice: true
      }
    });

    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createService(req, res) {
  try {
    const created = await prisma.service.create({
      data: req.body
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateService(req, res) {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.service.update({
      where: { id },
      data: req.body
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteService(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.service.delete({ where: { id } });

    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
