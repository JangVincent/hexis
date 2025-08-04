import Header from '../components/header';
import HeroImage from '../components/hero-image';

export default function HomePage() {
  return (
    <main className='h-full relative'>
      <Header />

      <div className='max-w-full absolute bottom-4 left-0 right-0'>
        <HeroImage />
      </div>
    </main>
  );
}
