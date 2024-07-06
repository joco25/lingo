import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import Header from './header';
import UserProgress from '@/components/user-progress';

const LearnPage = () => {
  return (
    <div className='flex flex-row-reverse ga-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: 'Spanish', imgSrc: 'es.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        ></UserProgress>
      </StickyWrapper>
      <FeedWrapper>
        <Header title='Spanish'></Header>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
