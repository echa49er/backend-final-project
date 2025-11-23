import { prisma } from '../prisma/client.js';

export async function getUser(req, res) {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      include: { vehicles: true }
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.user.update({
      where: { id },
      data: req.body
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
