import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    return res.status(200).send(users);
  } catch (e) {
    console.error("Error fetching users:", e);
    return res.status(500).send("An error occurred.");
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || validator.isEmpty(firstName.trim())) {
      return res.status(400).send("Name cannot be empty");
    }

    if (!email || validator.isEmpty(email.trim())) {
      return res.status(400).send("Email Address cannot be empty");
    }
    if (!password || validator.isEmpty(password)) {
      return res.status(400).send("Password cannot be empty");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email");
    }

    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      return res
        .status(400)
        .send(
          "Password is not strong enough. It should be at least 8 characters and include uppercase, lowercase, number, and symbol."
        );
    }

    const existingUser = await prisma.users.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Cant add user", error);
  }
};

export { addUser, getUsers };
