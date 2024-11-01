// import { PrismaClient } from '@prisma/client'
// ^^ikke lov med import?

const { PrismaClient } = require('@prisma/client');
const { se } = require('date-fns/locale');
const crypto = require('crypto');

const prisma = new PrismaClient()

const users = [
    {
      id: crypto.randomUUID(),
      email: 'lars@test.no',
      name: 'Lars',
      role: 'user',
    },
    {
      id: crypto.randomUUID(),
      email: 'simen@test.no',
      name: 'Simen',
      role: 'user',
    },
    {
      id: crypto.randomUUID(),
      email: 'trude@test.no',
      name: 'Trude',
      role: 'admin',
    },
]

async function seedProjects() {
    const finishedStatus = await prisma.projectStatus.findUnique({ where: { name: 'finished' } });
    const ongoingStatus = await prisma.projectStatus.findUnique({ where: { name: 'ongoing' } });
    const notStartedStatus = await prisma.projectStatus.findUnique({ where: { name: 'not-started' } });
    
    const projects = [
        {
            id: crypto.randomUUID(),
            title: 'Project 1', 
            description: 'Description of project 1',
            publishedAt: new Date("2024-01-01"),
            statusId: finishedStatus.id,
            isPublic: true,
            categories: [
                { name: "programmering" },
                { name: "design" },
                { name: "prosjektledelse" }
            ]
        },
        { 
            id: crypto.randomUUID(),
            title: 'Project 2', 
            description: 'Description of project 2', 
            publishedAt: new Date("2024-01-02"),
            statusId: finishedStatus.id,
            isPublic: true,
            categories: [
                { name: "programmering" },
                { name: "design" },
                { name: "prosjektledelse" }
            ]
        },
        {
            id: crypto.randomUUID(),
            title: 'Project 3', 
            description: 'Description of project 3',
            publishedAt: new Date("2024-01-03"),
            statusId: ongoingStatus.id,
            isPublic: false,
            categories: [
                { name: "programmering" },
                { name: "design" },
                { name: "prosjektledelse" }
            ]
        },
        {
            id: crypto.randomUUID(),
            title: 'Project 4', 
            description: 'Description of project 4',
            publishedAt: new Date("2024-01-04"),
            statusId: notStartedStatus.id,
            isPublic: false,
            categories: [
                { name: "programmering" },
                { name: "design" },
                { name: "prosjektledelse" }
            ]
        },
        {
            id: crypto.randomUUID(),
            title: 'Project 5', 
            description: 'Description of project 5',
            publishedAt: new Date("2024-01-05"),
            statusId: finishedStatus.id,
            isPublic: true,
            categories: [
                { name: "programmering" },
                { name: "design" },
                { name: "prosjektledelse" }
            ]
        }
    ]

    await prisma.project.deleteMany({})

    for (const project of projects) {
        const categories = await Promise.all(
            project.categories.map(async (category) => {
            let cat = await prisma.category.findUnique({
            where: { name: category.name },
            });
            if (!cat) {
            cat = await prisma.category.create({
                data: { name: category.name },
            });
            }
            return cat;
            })
        );

        await prisma.project.create({
            data: {
            id: project.id,
            title: project.title,
            description: project.description,
            publishedAt: project.publishedAt,
            statusId: project.statusId,
            isPublic: project.isPublic,
            categories: {
                connect: categories.map((cat) => ({ id: cat.id })),
            },
            },
        });
    }

}

async function seedProjectStatuses() {
    const statuses = [
        { name: 'finished' },
        { name: 'ongoing' },
        { name: 'not-started' }
    ]

    for (const status of statuses) {
        await prisma.projectStatus.upsert({
            where: { name: status.name },
            update: {},
            create: { name: status.name },
        })
    }
}

async function main() {
  console.log('Start seeding ...')

  await seedProjectStatuses()
  await seedProjects()
  await prisma.user.deleteMany({})
  await prisma.user.createMany({
    data: users,
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
