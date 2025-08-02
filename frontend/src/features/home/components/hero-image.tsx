import BoxGraphic, {
  type BoxGraphicProps,
} from '@/components/graphic/box-graphic';
import Marquee from 'react-fast-marquee';

import { useEthPrice } from '@/requests/eth-price';

export default function HeroImage() {
  const { data: ethPrice } = useEthPrice();

  const price = ethPrice || 0;

  const scale = 2; // Adjust the scale as needed
  const cardGap = 8; // Adjust the gap between cards as needed

  const items: BoxGraphicProps[] = [
    {
      title: 'MAMA PEARL’s SOUL FOOD RECIPE',
      ethPrice: 'Ξ0.05',
      usdPrice: `$${(price * 0.05).toFixed(2)}`,
      cardCount: 3,
      cardGap,
      scale,
    },
    {
      title: 'EXCLUSIVE THINGS 4 MY 𝕏 FOLLOWERS',
      ethPrice: 'Ξ0.09',
      usdPrice: `$${(price * 0.09).toFixed(2)}`,
      cardCount: 4,
      cardGap,
      scale,
    },
    {
      title: 'MY FURRY EROTIC FANFICTION VOL.3',
      ethPrice: 'Ξ0.004',
      usdPrice: `$${(price * 0.004).toFixed(2)}`,
      cardCount: 1,
      cardGap,
      scale,
    },
    {
      title: 'MY ESSAY ABOUT CURRENT ECONOMY',
      ethPrice: 'Ξ0.003',
      usdPrice: `$${(price * 0.003).toFixed(2)}`,
      cardCount: 3,
      cardGap,
      scale,
    },
    {
      title: 'MY SECRET DIARY <ONLY ME CAN SEE IT>',
      titleStyle: {
        letterSpacing: '-0.3px',
      },
      ethPrice: 'NOT FOR SALE',
      ethPriceStyle: {
        fontSize: 6,
        lineHeight: 1.5,
      },
      usdPrice: 'Price not set',
      cardCount: 2,
      cardGap,
      scale,
    },
    {
      title: 'ROCK FESTIVAL TICKET in LA, SEND ME A DM',
      titleStyle: {
        letterSpacing: '-0.23px',
      },
      ethPrice: 'Ξ0.07',
      usdPrice: `$${(price * 0.07).toFixed(2)}`,
      cardCount: 2,
      cardGap,
      scale,
    },
    {
      title: 'MY DONATION LINK: SUPPORT ME',
      titleStyle: {
        letterSpacing: '-0.23px',
      },
      ethPrice: 'Ξ0.01',
      usdPrice: `$${(price * 0.01).toFixed(2)}`,
      cardCount: 6,
      cardGap,
      scale,
    },
    {
      title: 'GENERAL CHEMISTRY 101 CLASS NOTES',
      titleStyle: {
        letterSpacing: '-0.23px',
      },
      ethPrice: 'Ξ0.008',
      usdPrice: `$${(price * 0.008).toFixed(2)}`,
      cardCount: 3,
      cardGap,
      scale,
    },
  ];

  return (
    <div className='w-full max-w-(--max-main-width) overflow-hidden'>
      <Marquee speed={40} className='w-full'>
        {items.map((item, index) => (
          <BoxGraphic key={index} {...item} className='-ml-28 z-0' />
        ))}
      </Marquee>
    </div>
  );
}
