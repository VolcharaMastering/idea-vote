const fs = require('fs/promises');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
async function main() {
    const filePath = path.resolve(process.cwd(), 'src/prisma/ideas.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);

    if (!data.ideas || !Array.isArray(data.ideas)) {
        throw new Error('JSON должен содержать массив ideas');
    }
    const existingIdeas = await prisma.idea.findMany({
        select: {
            name: true,
        },
    });

    const existingNames = existingIdeas.map((i) => i.name);

    // Фильтруем идеи, оставляя только те, названий которых ещё нет в базе
    const ideasToCreate = data.ideas.filter(
        (i) => !existingNames.includes(i.name),
    );

    if (ideasToCreate.length > 0) {
        // Используем createMany для пакетного добавления
        // Поле voteCount будет заполнено значением по умолчанию (0), заданным в модели
        await prisma.idea.createMany({
            data: ideasToCreate.map((i) => ({
                name: i.name,
                idea: i.idea,
                // voteCount: 0, // Явно указывать не нужно, если в модели есть @default(0)
            })),
            skipDuplicates: true, // Дополнительная страховка на случай конфликта
        });
        console.log(`Добавлено новых идей: ${ideasToCreate.length}`);
    } else {
        console.log('Новых идей для добавления не найдено.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        const prisma = new PrismaClient();
        await prisma.$disconnect();
    });
