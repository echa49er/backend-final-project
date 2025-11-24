import { prisma } from '../prisma/client.js';

export async function getServiceTypes(req, res) {
  try {
    const types = await prisma.serviceType.findMany();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getServiceTypeById(req, res) {
  try {
    const id = Number(req.params.id);
    const type = await prisma.serviceType.findUnique({ where: { id } });
    res.status(200).json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createServiceType(req, res) {
  try {
    const created = await prisma.serviceType.create({ data: req.body });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateServiceType(req, res) {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.serviceType.update({
      where: { id },
      data: req.body
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteServiceType(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.serviceType.delete({ where: { id } });
    res.status(200).json({ message: 'Service type deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
