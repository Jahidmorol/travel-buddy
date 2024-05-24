import * as bcrypt from "bcrypt";
import { prisma } from "./shared/prisma";
import { UserRole } from "../prisma/generated/client";

const seedSuperAdmin = async () => {
  try {
    const isExistAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (isExistAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin00@11", 12);

    const adminData = await prisma.user.create({
      data: {
        email: "super@admin.com",
        password: hashedPassword,
        role: UserRole.ADMIN,
        name: "Admin",
        userProfile: {
          create: {
            age: 24,
            bio: "is admin",
          },
        },
      },
    });

    console.log("Admin Created Successfully!", adminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
