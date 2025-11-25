import { prisma } from '../prisma/client.js';
import bcrypt from 'bcrypt';

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
export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
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

export async function createUser(req, res) {
  try {
    const { email, password, firstName, lastName, phone, address } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        address
      }
    });

    res.status(201).json(newUser);  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);

    const deletedUser = await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({ message: 'User deleted', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

