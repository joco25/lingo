import FeedWrapper from '@/components/feed-wrapper';
import Promo from '@/components/promo';
import StickyWrapper from '@/components/sticky-wrapper';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import UserProgress from '@/components/user-progress';
import { quests } from '@/constants';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  const isPro = !!userSubscription?.isActive;
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        ></UserProgress>
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image src='/quests.svg' height={90} width={90} alt='Quests' />
          <h1 className='text-2xl font-bold text-center text-neutral-600 mt-6'>
            Quests
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            Complete quests by earning points.
          </p>
          <ul className='w-full'>
            {quests.map((quest, index) => {
              const progress = (userProgress.points / quest.value) * 100;
              return (
                <div
                  key={quest.title}
                  className='flex items-center w-full p-4 gap-x-4 border-t-2'
                >
                  <Image
                    src='/points.svg'
                    height={60}
                    width={60}
                    alt='Points'
                  />
                  <div className='flex flex-col gap-y-2 w-full'>
                    <p className='text-neutral-700 text-xl font-bold'>
                      {quest.title}
                    </p>
                    <Progress value={progress} className='h-3' />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
