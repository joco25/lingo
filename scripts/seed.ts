import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding database');
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: 'Spanish', imageSrc: '/es.svg' },
      { id: 2, title: 'French', imageSrc: '/fr.svg' },
      { id: 3, title: 'Italian', imageSrc: '/it.svg' },
      { id: 4, title: 'Croatian', imageSrc: '/hr.svg' },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: 'Unit 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
      {
        id: 2,
        courseId: 2,
        title: 'Unit 1',
        description: 'Learn the basics of French',
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, title: 'Nouns', order: 1 },
      { id: 2, unitId: 1, title: 'Verbs', order: 2 },
      { id: 3, unitId: 1, title: 'Verbs', order: 3 },
      { id: 4, unitId: 1, title: 'Nouns', order: 4 },
      { id: 5, unitId: 1, title: 'Verbs', order: 5 },
      { id: 6, unitId: 1, title: 'Nouns', order: 6 },
      { id: 7, unitId: 1, title: 'Verbs', order: 7 },
      { id: 8, unitId: 2, title: 'Nouns', order: 1 },
      { id: 9, unitId: 2, title: 'Verbs', order: 2 },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        order: 1,
        question: 'which one of these is the "the man"?',
      },
      {
        id: 2,
        lessonId: 1,
        type: 'ASSIST',
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        order: 3,
        question: 'which one of these is the "robot"?',
      },
    ]);
    // Option for challenge 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: '/man.svg',
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/robot.svg',
        correct: false,
        text: 'la robot',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    // Option for challenge 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'la robot',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    // Option for challenge 3
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: '/man.svg',
        correct: false,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/robot.svg',
        correct: true,
        text: 'la robot',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
};

main();
