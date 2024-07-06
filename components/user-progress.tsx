import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';

type Props = {
  activeCourse: { imgSrc: string; title: string };
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const UserProgress = ({
  activeCourse: { imgSrc, title },
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className='flex item-center justify-between gap-x-2 w-full'>
      <Link href='/courses'>
        <Button variant='ghost'>
          <Image
            src={`/images/${imgSrc}`}
            alt={title}
            width={32}
            height={32}
            className='rounded-md border'
          />
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant='ghost' className='text-orange-500'>
          <Image
            src='/images/points.svg'
            height={28}
            width={28}
            alt='Points'
            className='mr-2'
          />
          {points}
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant='ghost' className='text-rose-500'>
          <Image
            src='/images/heart.svg'
            height={28}
            width={28}
            alt='Hearts'
            className='mr-2'
          />
          {hasActiveSubscription ? (
            <InfinityIcon className='h-4 w-4 stroke-[3]' />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
