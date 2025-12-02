import { currencySeed } from '@/generated/data/currency.seed.js'
import { PrismaClient } from '../src/generated/prisma/client.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.currency.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.eventTracker.deleteMany();

  await Promise.all(
    currencySeed.map(async (currency) => {
        await prisma.currency.create({
          data: currency,
        });
      }),
    );

  console.log(`✅ Created ${currencySeed.length} currencies`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
