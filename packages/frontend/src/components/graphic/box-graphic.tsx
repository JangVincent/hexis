import { cn } from '@/lib/tailwind-utils';
import styles from './box-graphic.module.css';

export interface BoxGraphicProps {
  cardCount: number;
  scale: number;
  cardGap: number;
  title: string;
  ethPrice: string;
  ethPriceStyle?: React.CSSProperties;
  usdPrice: string;
  titleStyle?: React.CSSProperties;
  className?: string;
}

export default function BoxGraphic({
  cardCount = 6,
  scale = 1,
  cardGap = 6,
  title,
  ethPrice,
  ethPriceStyle,
  usdPrice,
  titleStyle,
  className,
}: BoxGraphicProps) {
  return (
    <div
      role='img'
      className={cn('relative select-none', styles.canvas, className)}
      style={
        {
          '--scale': scale,
        } as React.CSSProperties
      }
    >
      {/* front face */}
      <FaceX
        width={91 * scale}
        height={62 * scale}
        className='absolute'
        style={{
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      {/* back face */}
      <FaceX
        width={91 * scale}
        height={62 * scale}
        className='absolute [&>rect]:fill-gray-100'
        style={{
          bottom: 67 * scale,
          left: 67 * scale,
          zIndex: 0,
        }}
      />

      {/* left face */}
      <FaceY
        width={68 * scale}
        height={129 * scale}
        className='absolute [&>path]:fill-gray-50'
        style={{
          bottom: 0,
          left: 0,
        }}
      />

      {/* right face */}
      <FaceY
        width={68 * scale}
        height={129 * scale}
        className='absolute'
        style={{
          bottom: 0,
          left: 90 * scale,
          zIndex: 1,
        }}
      />

      {/* bottom face */}
      <FaceZ
        width={158 * scale}
        height={68 * scale}
        className='absolute'
        style={{
          bottom: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      <PriceTag
        title={title}
        titleStyle={titleStyle}
        ethPrice={ethPrice}
        ethPriceStyle={ethPriceStyle}
        usdPrice={usdPrice}
        className='absolute'
        $scale={scale}
        style={{
          bottom: 3 * scale,
          left: 8 * scale,
          zIndex: 1,
        }}
      />

      {Array.from({ length: cardCount }).map((_, index) => (
        <Card
          key={index}
          width={79 * scale}
          height={86 * scale}
          className='absolute hover:-translate-y-5 focus:-translate-y-5 active:-translate-y-2 transition-transform duration-300'
          style={{
            bottom: 54 * scale - cardGap * index * scale,
            left: 59 * scale - cardGap * index * scale,
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}

function FaceX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='91'
      height='62'
      viewBox='0 0 91 62'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x='0.5'
        y='0.5'
        width='90'
        height='61'
        fill='white'
        stroke='#18181A'
        stroke-linejoin='bevel'
      />
    </svg>
  );
}

function FaceY(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='68'
      height='129'
      viewBox='0 0 68 129'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M67.5 0.5V61.2939L0.998047 128.291L0.5 127.793V67.207L67.207 0.5H67.5Z'
        fill='white'
        stroke='#18181A'
        stroke-linejoin='bevel'
      />
    </svg>
  );
}

function FaceZ(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='158'
      height='68'
      viewBox='0 0 158 68'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M157.5 0.5V0.792969L90.793 67.5H0.5V67.207L67.207 0.5H157.5Z'
        fill='white'
        stroke='black'
        stroke-linejoin='bevel'
      />
    </svg>
  );
}

function Card({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='79'
      height='86'
      viewBox='0 0 79 86'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('group', className)}
      {...props}
    >
      <path
        d='M8.00014 85C4 85 1.00014 82 1.00014 78L1.00011 71.0248C1.00005 54.3636 0.999885 14.2727 1.00014 11C1.00029 9.00007 1.75016 7.25011 3 6.00011C3.66667 4.33341 8.00014 1 11 1H68.0001C74 1 78 4 78 11V75C78 79 75.0001 81 73 83.0001C71.75 84.25 70 85 68.0001 85H8.00014Z'
        fill='white'
      />
      <path
        d='M75.0001 78C75.0001 80 74.2501 81.7501 73 83.0001M75.0001 78L78 75M75.0001 78C75.0001 74.4245 75.0001 26.9025 75.0001 14M75.0001 78V14M8.00014 4C5.99991 3.99997 4.24993 4.75002 3 6.00011M8.00014 4C11.5539 4.00005 52.9895 4.00001 65 4M8.00014 4L11 1M3 6.00011C1.75016 7.25011 1.00029 9.00007 1.00014 11C0.999829 15 1.00014 74 1.00014 78C1.00014 82 4 85 8.00014 85C12.0003 85 64.0003 85 68.0001 85C70 85 71.75 84.25 73 83.0001M3 6.00011C3.66667 4.33341 8.00014 1 11 1M11 1C11 1 62.0003 1 68.0001 1M68.0001 1C74 1 78 4 78 11M68.0001 1L65 4M78 11C78 18 78 71 78 75M78 11L75.0001 14M78 11V75M78 75C78 79 75.0001 81 73 83.0001M75.0001 14C75.0001 12.4683 75.0001 11.4245 75.0001 11C75.0001 7 72 4 68.0001 4C67.5537 4 66.5091 4 65 4'
        stroke='black'
      />

      {/* barcode start */}
      <g id='barcode'>
        <path d='M8.51351 15H8L8.0001 4H8.51361L8.51351 15Z' fill='#18181A' />
        <path d='M65 15H64.4865V4H65V15Z' fill='#18181A' />
        <path d='M10.5677 13.8175H10.0541V4H10.5677V13.8175Z' fill='#18181A' />
        <path d='M12.6217 13.8175H11.0812V4H12.6217V13.8175Z' fill='#18181A' />
        <path d='M14.6758 13.8175H13.1352V4H14.6758V13.8175Z' fill='#18181A' />
        <path d='M15.7028 13.8175H15.1893V4H15.7028V13.8175Z' fill='#18181A' />
        <path d='M17.7568 13.8175H16.2163V4H17.7568V13.8175Z' fill='#18181A' />
        <path d='M18.7839 13.8175H18.2703V4H18.7839V13.8175Z' fill='#18181A' />
        <path d='M19.8109 13.8175H19.2974V4H19.8109V13.8175Z' fill='#18181A' />
        <path d='M22.892 13.8175H21.3514V4H22.892V13.8175Z' fill='#18181A' />
        <path d='M23.919 13.8175H23.4055V4H23.919V13.8175Z' fill='#18181A' />
        <path d='M25.973 13.8175H24.4325V4H25.973V13.8175Z' fill='#18181A' />
        <path d='M27.0001 13.8175H26.4866V4H27.0001V13.8175Z' fill='#18181A' />
        <path d='M29.0541 13.8175H27.5136V4H29.0541V13.8175Z' fill='#18181A' />
        <path d='M31.1082 13.8175H30.5947V4H31.1082V13.8175Z' fill='#18181A' />
        <path d='M32.1352 13.8175H31.6217V4H32.1352V13.8175Z' fill='#18181A' />
        <path d='M33.1622 13.8175H32.6487V4H33.1622V13.8175Z' fill='#18181A' />
        <path d='M35.2163 13.8175H34.7028V4H35.2163V13.8175Z' fill='#18181A' />
        <path d='M37.2703 13.8175H35.7298V4H37.2703V13.8175Z' fill='#18181A' />
        <path d='M38.2973 13.8175H37.7838V4H38.2973V13.8175Z' fill='#18181A' />
        <path d='M40.3514 13.8175H38.8109V4H40.3514V13.8175Z' fill='#18181A' />
        <path d='M41.3784 13.8175H40.8649V4H41.3784V13.8175Z' fill='#18181A' />
        <path d='M43.4325 13.8175H41.8919V4H43.4325V13.8175Z' fill='#18181A' />
        <path d='M44.4595 13.8175H43.946V4H44.4595V13.8175Z' fill='#18181A' />
        <path d='M47.5406 13.8175H46V4H47.5406V13.8175Z' fill='#18181A' />
        <path d='M48.5676 13.8175H48.0541V4H48.5676V13.8175Z' fill='#18181A' />
        <path d='M49.5946 13.8175H49.0811V4H49.5946V13.8175Z' fill='#18181A' />
        <path d='M51.6487 13.8175H50.1081V4H51.6487V13.8175Z' fill='#18181A' />
        <path d='M52.6757 13.8175H52.1622V4H52.6757V13.8175Z' fill='#18181A' />
        <path d='M54.7297 13.8175H53.1892V4H54.7297V13.8175Z' fill='#18181A' />
        <path d='M56.7838 13.8175H56.2703V4H56.7838V13.8175Z' fill='#18181A' />
        <path d='M57.8108 13.8175H57.2973V4H57.8108V13.8175Z' fill='#18181A' />
        <path d='M59.8649 13.8175H59.3514V4H59.8649V13.8175Z' fill='#18181A' />
        <path d='M61.9189 13.8175H60.3784V4H61.9189V13.8175Z' fill='#18181A' />
        <path d='M63.973 13.8175H62.4324V4H63.973V13.8175Z' fill='#18181A' />
        {/* barcode end */}
      </g>
    </svg>
  );
}

function PriceTag({
  $scale,
  title,
  titleStyle,
  ethPrice,
  ethPriceStyle,
  usdPrice,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  $scale?: number;
  title: string;
  titleStyle?: React.CSSProperties;
  ethPrice: string;
  ethPriceStyle?: React.CSSProperties;
  usdPrice: string;
}) {
  const scale = $scale || 1;

  return (
    <svg
      width={75 * scale}
      height={56 * scale}
      viewBox='0 0 75 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect x='0.25' y='0.25' width='74.5' height='55.5' fill='#D8D8D8' />
      <rect
        x='0.25'
        y='0.25'
        width='74.5'
        height='55.5'
        stroke='#18181A'
        stroke-width='0.5'
      />

      {/* Title */}
      <foreignObject width='67' height='12' x='4' y='4'>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 6,
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1',
            whiteSpace: 'pre-line',
            ...titleStyle,
          }}
        >
          {title}
        </div>
      </foreignObject>

      <rect width='46' height='25' transform='translate(4 18)' fill='white' />

      {/* Price and USD */}
      <foreignObject width='42' height='10' x='6' y='23'>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            lineHeight: '1',
            textAlign: 'center',
            ...ethPriceStyle,
          }}
        >
          {ethPrice}
        </div>
      </foreignObject>

      <foreignObject width='42' height='4' x='6' y='34'>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 4,
            lineHeight: '1',
            textAlign: 'center',
          }}
        >
          {usdPrice}
        </div>
      </foreignObject>
      <g clip-path='url(#qr)'>
        <path
          d='M69.36 37.86H70V38.5H69.36V37.86ZM67.44 37.86H68.08V38.5H67.44V37.86ZM65.52 37.86H66.16V38.5H65.52V37.86ZM64.24 37.86H64.88V38.5H64.24V37.86ZM62.32 37.86H62.96V38.5H62.32V37.86ZM60.4 37.86H61.68V38.5H60.4V37.86ZM54 37.86H58.48V38.5H54V37.86ZM69.36 37.22H70V37.86H69.36V37.22ZM66.16 37.22H67.44V37.86H66.16V37.22ZM62.96 37.22H64.88V37.86H62.96V37.22ZM59.12 37.22H59.76V37.86H59.12V37.22ZM57.84 37.22H58.48V37.86H57.84V37.22ZM54 37.22H54.64V37.86H54V37.22ZM69.36 36.58H70V37.22H69.36V36.58ZM67.44 36.58H68.72V37.22H67.44V36.58ZM61.04 36.58H64.24V37.22H61.04V36.58ZM57.84 36.58H58.48V37.22H57.84V36.58ZM55.28 36.58H57.2V37.22H55.28V36.58ZM54 36.58H54.64V37.22H54V36.58ZM68.72 35.94H70V36.58H68.72V35.94ZM64.88 35.94H66.16V36.58H64.88V35.94ZM63.6 35.94H64.24V36.58H63.6V35.94ZM57.84 35.94H58.48V36.58H57.84V35.94ZM55.28 35.94H57.2V36.58H55.28V35.94ZM54 35.94H54.64V36.58H54V35.94ZM69.36 35.3H70V35.94H69.36V35.3ZM68.08 35.3H68.72V35.94H68.08V35.3ZM62.96 35.3H67.44V35.94H62.96V35.3ZM61.04 35.3H61.68V35.94H61.04V35.3ZM59.76 35.3H60.4V35.94H59.76V35.3ZM57.84 35.3H58.48V35.94H57.84V35.3ZM55.28 35.3H57.2V35.94H55.28V35.3ZM54 35.3H54.64V35.94H54V35.3ZM66.8 34.66H67.44V35.3H66.8V34.66ZM64.24 34.66H64.88V35.3H64.24V34.66ZM62.32 34.66H62.96V35.3H62.32V34.66ZM61.04 34.66H61.68V35.3H61.04V34.66ZM59.76 34.66H60.4V35.3H59.76V34.66ZM57.84 34.66H58.48V35.3H57.84V34.66ZM54 34.66H54.64V35.3H54V34.66ZM69.36 34.02H70V34.66H69.36V34.02ZM66.8 34.02H67.44V34.66H66.8V34.02ZM65.52 34.02H66.16V34.66H65.52V34.02ZM64.24 34.02H64.88V34.66H64.24V34.02ZM61.04 34.02H61.68V34.66H61.04V34.02ZM59.12 34.02H60.4V34.66H59.12V34.02ZM54 34.02H58.48V34.66H54V34.02ZM66.8 33.38H67.44V34.02H66.8V33.38ZM64.24 33.38H64.88V34.02H64.24V33.38ZM62.96 33.38H63.6V34.02H62.96V33.38ZM61.68 33.38H62.32V34.02H61.68V33.38ZM59.12 33.38H60.4V34.02H59.12V33.38ZM68.08 32.74H68.72V33.38H68.08V32.74ZM64.24 32.74H67.44V33.38H64.24V32.74ZM62.32 32.74H62.96V33.38H62.32V32.74ZM60.4 32.74H61.68V33.38H60.4V32.74ZM55.92 32.74H59.76V33.38H55.92V32.74ZM54 32.74H54.64V33.38H54V32.74ZM69.36 32.1H70V32.74H69.36V32.1ZM67.44 32.1H68.72V32.74H67.44V32.1ZM65.52 32.1H66.8V32.74H65.52V32.1ZM63.6 32.1H64.24V32.74H63.6V32.1ZM62.32 32.1H62.96V32.74H62.32V32.1ZM59.12 32.1H61.68V32.74H59.12V32.1ZM57.2 32.1H57.84V32.74H57.2V32.1ZM55.28 32.1H55.92V32.74H55.28V32.1ZM54 32.1H54.64V32.74H54V32.1ZM68.72 31.46H70V32.1H68.72V31.46ZM66.16 31.46H68.08V32.1H66.16V31.46ZM61.04 31.46H64.24V32.1H61.04V31.46ZM59.76 31.46H60.4V32.1H59.76V31.46ZM57.84 31.46H58.48V32.1H57.84V31.46ZM54 31.46H54.64V32.1H54V31.46ZM68.72 30.82H69.36V31.46H68.72V30.82ZM66.16 30.82H66.8V31.46H66.16V30.82ZM61.04 30.82H65.52V31.46H61.04V30.82ZM59.12 30.82H59.76V31.46H59.12V30.82ZM56.56 30.82H57.84V31.46H56.56V30.82ZM54 30.82H55.28V31.46H54V30.82ZM69.36 30.18H70V30.82H69.36V30.18ZM65.52 30.18H66.8V30.82H65.52V30.18ZM64.24 30.18H64.88V30.82H64.24V30.18ZM62.32 30.18H63.6V30.82H62.32V30.18ZM61.04 30.18H61.68V30.82H61.04V30.18ZM57.84 30.18H60.4V30.82H57.84V30.18ZM55.92 30.18H57.2V30.82H55.92V30.18ZM69.36 29.54H70V30.18H69.36V29.54ZM66.8 29.54H68.08V30.18H66.8V29.54ZM64.24 29.54H66.16V30.18H64.24V29.54ZM62.96 29.54H63.6V30.18H62.96V29.54ZM60.4 29.54H61.04V30.18H60.4V29.54ZM58.48 29.54H59.76V30.18H58.48V29.54ZM56.56 29.54H57.2V30.18H56.56V29.54ZM54.64 29.54H55.28V30.18H54.64V29.54ZM68.72 28.9H70V29.54H68.72V28.9ZM67.44 28.9H68.08V29.54H67.44V28.9ZM64.88 28.9H66.16V29.54H64.88V28.9ZM63.6 28.9H64.24V29.54H63.6V28.9ZM61.68 28.9H62.32V29.54H61.68V28.9ZM57.2 28.9H59.12V29.54H57.2V28.9ZM55.92 28.9H56.56V29.54H55.92V28.9ZM54.64 28.9H55.28V29.54H54.64V28.9ZM66.16 28.26H69.36V28.9H66.16V28.26ZM62.96 28.26H64.24V28.9H62.96V28.26ZM58.48 28.26H61.68V28.9H58.48V28.26ZM68.72 27.62H70V28.26H68.72V27.62ZM64.88 27.62H65.52V28.26H64.88V27.62ZM62.96 27.62H63.6V28.26H62.96V27.62ZM61.04 27.62H61.68V28.26H61.04V27.62ZM57.84 27.62H59.76V28.26H57.84V27.62ZM54.64 27.62H55.28V28.26H54.64V27.62ZM62.32 26.98H62.96V27.62H62.32V26.98ZM65.52 26.34H70V26.98H65.52V26.34ZM64.24 26.34H64.88V26.98H64.24V26.34ZM62.96 26.34H63.6V26.98H62.96V26.34ZM61.68 26.34H62.32V26.98H61.68V26.34ZM60.4 26.34H61.04V26.98H60.4V26.34ZM59.12 26.34H59.76V26.98H59.12V26.34ZM54 26.34H58.48V26.98H54V26.34ZM69.36 25.7H70V26.34H69.36V25.7ZM65.52 25.7H66.16V26.34H65.52V25.7ZM64.24 25.7H64.88V26.34H64.24V25.7ZM61.68 25.7H63.6V26.34H61.68V25.7ZM57.84 25.7H58.48V26.34H57.84V25.7ZM54 25.7H54.64V26.34H54V25.7ZM69.36 25.06H70V25.7H69.36V25.06ZM66.8 25.06H68.72V25.7H66.8V25.06ZM65.52 25.06H66.16V25.7H65.52V25.06ZM64.24 25.06H64.88V25.7H64.24V25.06ZM62.32 25.06H62.96V25.7H62.32V25.06ZM60.4 25.06H61.68V25.7H60.4V25.06ZM57.84 25.06H58.48V25.7H57.84V25.06ZM55.28 25.06H57.2V25.7H55.28V25.06ZM54 25.06H54.64V25.7H54V25.06ZM69.36 24.42H70V25.06H69.36V24.42ZM66.8 24.42H68.72V25.06H66.8V24.42ZM65.52 24.42H66.16V25.06H65.52V24.42ZM62.96 24.42H64.88V25.06H62.96V24.42ZM59.76 24.42H60.4V25.06H59.76V24.42ZM57.84 24.42H58.48V25.06H57.84V24.42ZM55.28 24.42H57.2V25.06H55.28V24.42ZM54 24.42H54.64V25.06H54V24.42ZM69.36 23.78H70V24.42H69.36V23.78ZM66.8 23.78H68.72V24.42H66.8V23.78ZM65.52 23.78H66.16V24.42H65.52V23.78ZM64.24 23.78H64.88V24.42H64.24V23.78ZM62.96 23.78H63.6V24.42H62.96V23.78ZM60.4 23.78H61.68V24.42H60.4V23.78ZM57.84 23.78H58.48V24.42H57.84V23.78ZM55.28 23.78H57.2V24.42H55.28V23.78ZM54 23.78H54.64V24.42H54V23.78ZM69.36 23.14H70V23.78H69.36V23.14ZM65.52 23.14H66.16V23.78H65.52V23.14ZM62.32 23.14H62.96V23.78H62.32V23.14ZM60.4 23.14H61.04V23.78H60.4V23.14ZM59.12 23.14H59.76V23.78H59.12V23.14ZM57.84 23.14H58.48V23.78H57.84V23.14ZM54 23.14H54.64V23.78H54V23.14ZM65.52 22.5H70V23.14H65.52V22.5ZM62.96 22.5H63.6V23.14H62.96V22.5ZM60.4 22.5H61.68V23.14H60.4V22.5ZM59.12 22.5H59.76V23.14H59.12V22.5ZM54 22.5H58.48V23.14H54V22.5Z'
          fill='#18181A'
        />
      </g>
      <path
        d='M4.5 51V45H4.64313V51H4.5ZM4.9294 51V45H5.3588V51H4.9294ZM5.50194 51V45H5.7882V51H5.50194Z'
        fill='#18181A'
      />
      <path
        d='M6.07485 51V45H6.64738V51H6.07485ZM6.93365 51V45H7.07678V51H6.93365ZM7.36305 51V45H7.50618V51H7.36305Z'
        fill='#18181A'
      />
      <path
        d='M7.64969 51V45H8.07909V51H7.64969ZM8.36536 51V45H8.50849V51H8.36536ZM8.65163 51V45H8.9379V51H8.65163Z'
        fill='#18181A'
      />
      <path
        d='M9.22454 51V45H9.5108V51H9.22454ZM9.79707 51V45H9.94021V51H9.79707ZM10.0833 51V45H10.5127V51H10.0833Z'
        fill='#18181A'
      />
      <path
        d='M10.7994 51V45H11.2288V51H10.7994ZM11.5151 51V45H11.6582V51H11.5151ZM11.8013 51V45H12.0876V51H11.8013Z'
        fill='#18181A'
      />
      <path
        d='M12.3742 51V45H12.8036V51H12.3742ZM12.9468 51V45H13.0899V51H12.9468ZM13.3762 51V45H13.6624V51H13.3762Z'
        fill='#18181A'
      />
      <path
        d='M13.9491 51V45H14.0922V51H13.9491ZM14.3785 51V45H14.8079V51H14.3785ZM14.951 51V45H15.2373V51H14.951Z'
        fill='#18181A'
      />
      <path
        d='M15.5239 51V45H15.9533V51H15.5239ZM16.0965 51V45H16.2396V51H16.0965ZM16.5259 51V45H16.8121V51H16.5259Z'
        fill='#18181A'
      />
      <path
        d='M17.0988 51V45H17.385V51H17.0988ZM17.6713 51V45H17.8144V51H17.6713ZM18.1007 51V45H18.5301V51H18.1007Z'
        fill='#18181A'
      />
      <path
        d='M18.6736 51V45H18.8167V51H18.6736ZM19.2461 51V45H19.5324V51H19.2461ZM19.6755 51V45H19.8187V51H19.6755Z'
        fill='#18181A'
      />
      <path
        d='M20.2485 51V45H20.6779V51H20.2485ZM20.821 51V45H20.9641V51H20.821ZM21.2504 51V45H21.5367V51H21.2504Z'
        fill='#18181A'
      />
      <path
        d='M21.8233 51V45H22.2527V51H21.8233ZM22.3958 51V45H22.539V51H22.3958ZM22.8252 51V45H23.1115V51H22.8252Z'
        fill='#18181A'
      />
      <path
        d='M23.3981 51V45H23.8275V51H23.3981ZM23.9707 51V45H24.1138V51H23.9707ZM24.4001 51V45H24.6863V51H24.4001Z'
        fill='#18181A'
      />
      <path
        d='M24.973 51V45H25.1161V51H24.973ZM25.5455 51V45H25.6887V51H25.5455ZM26.1181 51V45H26.4043V51H26.1181Z'
        fill='#18181A'
      />
      <path
        d='M26.5478 51V45H26.691V51H26.5478ZM27.1204 51V45H27.2635V51H27.1204ZM27.4066 51V45H27.6929V51H27.4066Z'
        fill='#18181A'
      />
      <path
        d='M28.1227 51V45H28.4089V51H28.1227ZM28.5521 51V45H28.9815V51H28.5521ZM29.2677 51V45H29.4109V51H29.2677Z'
        fill='#18181A'
      />
      <path
        d='M29.6975 51V45H29.8407V51H29.6975ZM30.2701 51V45H30.4132V51H30.2701ZM30.5563 51V45H30.8426V51H30.5563Z'
        fill='#18181A'
      />
      <path
        d='M31.2724 51V45H31.5586V51H31.2724ZM31.7018 51V45H32.1312V51H31.7018ZM32.4174 51V45H32.5606V51H32.4174Z'
        fill='#18181A'
      />
      <path
        d='M32.8472 51V45H32.9903V51H32.8472ZM33.5629 51V45H33.706V51H33.5629ZM33.8492 51V45H34.1354V51H33.8492Z'
        fill='#18181A'
      />
      <path
        d='M34.4221 51V45H34.5652V51H34.4221ZM34.8515 51V45H35.2809V51H34.8515ZM35.5671 51V45H35.8534V51H35.5671Z'
        fill='#18181A'
      />
      <path
        d='M35.9969 51V45H36.2832V51H35.9969ZM36.5694 51V45H36.9988V51H36.5694ZM37.2851 51V45H37.4282V51H37.2851Z'
        fill='#18181A'
      />
      <path
        d='M37.5718 51V45H37.858V51H37.5718ZM38.1443 51V45H38.5737V51H38.1443ZM38.7168 51V45H38.86V51H38.7168Z'
        fill='#18181A'
      />
      <path
        d='M39.1466 51V45H39.4329V51H39.1466ZM39.7191 51V45H40.1485V51H39.7191ZM40.4348 51V45H40.5779V51H40.4348Z'
        fill='#18181A'
      />
      <path
        d='M40.7214 51V45H41.0077V51H40.7214ZM41.294 51V45H41.4371V51H41.294ZM41.7234 51V45H42.1528V51H41.7234Z'
        fill='#18181A'
      />
      <path
        d='M42.2963 51V45H42.4394V51H42.2963ZM42.7257 51V45H43.1551V51H42.7257ZM43.2982 51V45H43.5845V51H43.2982Z'
        fill='#18181A'
      />
      <path
        d='M43.8711 51V45H44.1574V51H43.8711ZM44.4437 51V45H44.5868V51H44.4437ZM44.8731 51V45H45.3025V51H44.8731Z'
        fill='#18181A'
      />
      <path
        d='M45.446 51V45H45.7322V51H45.446ZM46.0185 51V45H46.1616V51H46.0185ZM46.3048 51V45H46.7342V51H46.3048Z'
        fill='#18181A'
      />
      <path
        d='M47.0208 51V45H47.4502V51H47.0208ZM47.7365 51V45H47.8796V51H47.7365ZM48.0228 51V45H48.309V51H48.0228Z'
        fill='#18181A'
      />
      <path
        d='M48.5957 51V45H48.7388V51H48.5957ZM49.0251 51V45H49.4545V51H49.0251ZM49.5976 51V45H49.8839V51H49.5976Z'
        fill='#18181A'
      />
      <path
        d='M50.1705 51V45H50.4568V51H50.1705ZM50.5999 51V45H51.0293V51H50.5999ZM51.3156 51V45H51.4587V51H51.3156Z'
        fill='#18181A'
      />
      <path
        d='M51.7454 51V45H52.0316V51H51.7454ZM52.3179 51V45H52.461V51H52.3179ZM52.7473 51V45H53.1767V51H52.7473Z'
        fill='#18181A'
      />
      <path
        d='M53.3202 51V45H53.4633V51H53.3202ZM53.7496 51V45H53.8927V51H53.7496ZM54.4653 51V45H54.7515V51H54.4653Z'
        fill='#18181A'
      />
      <path
        d='M54.8951 51V45H55.1813V51H54.8951ZM55.3245 51V45H55.7539V51H55.3245ZM56.0401 51V45H56.1833V51H56.0401Z'
        fill='#18181A'
      />
      <path
        d='M56.4699 51V45H56.8993V51H56.4699ZM57.0424 51V45H57.3287V51H57.0424ZM57.4718 51V45H57.9012V51H57.4718Z'
        fill='#18181A'
      />
      <path
        d='M58.0447 51V45H58.1879V51H58.0447ZM58.6173 51V45H58.7604V51H58.6173ZM59.1898 51V45H59.4761V51H59.1898Z'
        fill='#18181A'
      />
      <path
        d='M59.6196 51V45H59.7627V51H59.6196ZM60.049 51V45H60.4784V51H60.049ZM60.7647 51V45H61.0509V51H60.7647Z'
        fill='#18181A'
      />
      <path
        d='M61.1944 51V45H61.3376V51H61.1944ZM61.6238 51V45H62.0532V51H61.6238ZM62.1964 51V45H62.4826V51H62.1964Z'
        fill='#18181A'
      />
      <path
        d='M62.7693 51V45H62.9124V51H62.7693ZM63.1987 51V45H63.6281V51H63.1987ZM63.9143 51V45H64.2006V51H63.9143Z'
        fill='#18181A'
      />
      <path
        d='M64.3441 51V45H64.6304V51H64.3441ZM64.9167 51V45H65.0598V51H64.9167ZM65.2029 51V45H65.6323V51H65.2029Z'
        fill='#18181A'
      />
      <path
        d='M65.919 51V45H66.3484V51H65.919ZM66.4915 51V45H66.6346V51H66.4915ZM66.9209 51V45H67.2072V51H66.9209Z'
        fill='#18181A'
      />
      <path
        d='M67.4938 51V45H67.6369V51H67.4938ZM68.0663 51V45H68.3526V51H68.0663ZM68.4958 51V45H68.6389V51H68.4958Z'
        fill='#18181A'
      />
      <path
        d='M69.0687 51V45H69.4981V51H69.0687ZM69.6412 51V45H69.9275V51H69.6412ZM70.0706 51V45H70.5V51H70.0706Z'
        fill='#18181A'
      />
      <defs>
        <clipPath id='qr'>
          <rect
            width='16'
            height='16'
            fill='white'
            transform='translate(54 22.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
