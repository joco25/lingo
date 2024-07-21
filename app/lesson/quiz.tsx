'use client';
import { challengeOptions, challenges } from '@/db/schema';
import React from 'react';
import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';
import Footer from './footer';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { toast } from 'sonner';
import { reduceHearts } from '@/actions/user-progress';
import { useAudio, useWindowSize } from 'react-use';
import Image from 'next/image';
import ResultCard from './result-card';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useHeartsModal } from '@/store/use-hearts-modal';

type Props = {
  initialLessonId: number;
  initialPercentage: number;
  initialHearts: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any;
};

const Quiz = ({
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
  initialLessonId,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();

  const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/incorrect.wav',
  });
  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true });
  const { width, height } = useWindowSize();
  const router = useRouter();

  const [lessonId] = React.useState(initialLessonId);
  const [pending, startTransition] = React.useTransition();
  const [hearts, setHearts] = React.useState(initialHearts);
  const [percentage, setPercentage] = React.useState(initialPercentage);
  const [challenges, setChallenges] = React.useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = React.useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = React.useState<number>();
  const [status, setStatus] = React.useState<'correct' | 'wrong' | 'none'>(
    'none'
  );

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);
    if (!correctOption) {
      console.error('Correct option not found!');
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal();
              return;
            }
            correctControls.play();
            setStatus('correct');
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((error) => {
            toast.error('Something went wrong, please try again');
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal();
              return;
            }
            incorrectControls.play();
            setStatus('wrong');
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch((error) => {
            toast.error('Something went wrong, please try again');
          });
      });
    }
  };

  const onSelect = (id: number) => {
    if (status !== 'none') return;
    setSelectedOption(id);
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className='flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full'>
          <Image
            src='/finish.svg'
            alt='Finish'
            width={100}
            height={100}
            className='hidden lg:block'
          />
          <Image
            src='/finish.svg'
            alt='Finish'
            width={50}
            height={50}
            className='block lg:hidden'
          />
          <h1 className='text-xl lg:text-3xl font-bold text-neutral-700'>
            Great job! <br /> You&apos; have completed the lesson.
          </h1>
          <div className='flex items-center gap-x-4 w-full'>
            <ResultCard variant='points' value={challenges.length * 10} />
            <ResultCard variant='hearts' value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status='completed'
          onCheck={() => router.push('/learn')}
        />
      </>
    );
  }

  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className='flex-1'>
        <div className='h-full flex items-center justify-center'>
          <div className='lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12'>
            <h1 className='text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700'>
              {title}
            </h1>
            <div className=''>
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
