import { prisma } from '../prisma/client.js';

export async function getMechanics(req, res) {
  try {
    const mechanics = await prisma.mechanic.findMany({
      include: { serviceAssignments: true }
    });

    res.status(200).json(mechanics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMechanicById(req, res) {
  try {
    const id = Number(req.params.id);

    const mechanic = await prisma.mechanic.findUnique({
      where: { id },
      include: { serviceAssignments: true }
    });

    res.status(200).json(mechanic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createMechanic(req, res) {
  try {
    const created = await prisma.mechanic.create({
      data: req.body
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateMechanic(req, res) {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.mechanic.update({
      where: { id },
      data: req.body
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteMechanic(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.mechanic.delete({ where: { id } });

    res.status(200).json({ message: 'Mechanic deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
