import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Quiz from './quiz';

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const useSubscriptionData = getUserSubscription();
  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    useSubscriptionData,
  ]);
  if (!lesson || !userProgress) {
    redirect('/learn');
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialPercentage={initialPercentage}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
