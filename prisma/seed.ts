import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting DB seed...")

  // Create default Owner account
  const hashedPassword = await bcrypt.hash("OwnerDirect123!", 10)

  const owner = await prisma.user.upsert({
    where: { email: "admin@direct2campus.com" },
    update: {},
    create: {
      name: "D2C Master Admin",
      email: "admin@direct2campus.com",
      password: hashedPassword,
      role: "OWNER",
    },
  })

  console.log(`Upserted Default Owner: ${owner.email}`)
  console.log("DB seed finished successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
