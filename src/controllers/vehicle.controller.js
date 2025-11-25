import { prisma } from '../prisma/client.js';

export async function getVehicles(req, res) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { user: true, services: true }
    });

    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getVehicleById(req, res) {
  try {
    const id = Number(req.params.id);

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { services: true }
    });

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createVehicle(req, res) {
  try {
    const created = await prisma.vehicle.create({
      data: req.body
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateVehicle(req, res) {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.vehicle.update({
      where: { id },
      data: req.body
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteVehicle(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.vehicle.delete({ where: { id } });

    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}