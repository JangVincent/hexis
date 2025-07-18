import { cn } from "@/lib/tailwind-utils";
import styles from "./box-graphic.module.css";

export default function BoxGraphic() {
  const cardCount = 6; // Number of cards to display
  const scale = 1;

  return (
    <div
      role="img"
      className={cn("relative", styles.canvas)}
      style={
        {
          "--scale": scale,
        } as React.CSSProperties
      }
    >
      {/* front face */}
      <FaceX
        width={91 * scale}
        height={62 * scale}
        className="absolute"
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
        className="absolute"
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
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
        }}
      />

      {/* right face */}
      <FaceY
        width={68 * scale}
        height={129 * scale}
        className="absolute"
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
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      {Array.from({ length: cardCount }).map((_, index) => (
        <Card
          key={index}
          width={79 * scale}
          height={86 * scale}
          className="absolute hover:-translate-y-3 transition-transform duration-300"
          style={{
            bottom: 54 * scale - 6 * index * scale,
            left: 59 * scale - 6 * index * scale,
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
      width="91"
      height="62"
      viewBox="0 0 91 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="90"
        height="61"
        fill="white"
        stroke="#18181A"
        stroke-linejoin="bevel"
      />
    </svg>
  );
}

function FaceY(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="68"
      height="129"
      viewBox="0 0 68 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M67.5 0.5V61.2939L0.998047 128.291L0.5 127.793V67.207L67.207 0.5H67.5Z"
        fill="white"
        stroke="#18181A"
        stroke-linejoin="bevel"
      />
    </svg>
  );
}

function FaceZ(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="158"
      height="68"
      viewBox="0 0 158 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M157.5 0.5V0.792969L90.793 67.5H0.5V67.207L67.207 0.5H157.5Z"
        fill="white"
        stroke="black"
        stroke-linejoin="bevel"
      />
    </svg>
  );
}

function Card({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="79"
      height="86"
      viewBox="0 0 79 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("group", className)}
      {...props}
    >
      <path
        d="M8.00014 85C4 85 1.00014 82 1.00014 78L1.00011 71.0248C1.00005 54.3636 0.999885 14.2727 1.00014 11C1.00029 9.00007 1.75016 7.25011 3 6.00011C3.66667 4.33341 8.00014 1 11 1H68.0001C74 1 78 4 78 11V75C78 79 75.0001 81 73 83.0001C71.75 84.25 70 85 68.0001 85H8.00014Z"
        fill="white"
      />
      <path
        d="M75.0001 78C75.0001 80 74.2501 81.7501 73 83.0001M75.0001 78L78 75M75.0001 78C75.0001 74.4245 75.0001 26.9025 75.0001 14M75.0001 78V14M8.00014 4C5.99991 3.99997 4.24993 4.75002 3 6.00011M8.00014 4C11.5539 4.00005 52.9895 4.00001 65 4M8.00014 4L11 1M3 6.00011C1.75016 7.25011 1.00029 9.00007 1.00014 11C0.999829 15 1.00014 74 1.00014 78C1.00014 82 4 85 8.00014 85C12.0003 85 64.0003 85 68.0001 85C70 85 71.75 84.25 73 83.0001M3 6.00011C3.66667 4.33341 8.00014 1 11 1M11 1C11 1 62.0003 1 68.0001 1M68.0001 1C74 1 78 4 78 11M68.0001 1L65 4M78 11C78 18 78 71 78 75M78 11L75.0001 14M78 11V75M78 75C78 79 75.0001 81 73 83.0001M75.0001 14C75.0001 12.4683 75.0001 11.4245 75.0001 11C75.0001 7 72 4 68.0001 4C67.5537 4 66.5091 4 65 4"
        stroke="black"
      />

      {/* barcode start */}
      <g id="barcode">
        <path d="M8.51351 15H8L8.0001 4H8.51361L8.51351 15Z" fill="#18181A" />
        <path d="M65 15H64.4865V4H65V15Z" fill="#18181A" />
        <path d="M10.5677 13.8175H10.0541V4H10.5677V13.8175Z" fill="#18181A" />
        <path d="M12.6217 13.8175H11.0812V4H12.6217V13.8175Z" fill="#18181A" />
        <path d="M14.6758 13.8175H13.1352V4H14.6758V13.8175Z" fill="#18181A" />
        <path d="M15.7028 13.8175H15.1893V4H15.7028V13.8175Z" fill="#18181A" />
        <path d="M17.7568 13.8175H16.2163V4H17.7568V13.8175Z" fill="#18181A" />
        <path d="M18.7839 13.8175H18.2703V4H18.7839V13.8175Z" fill="#18181A" />
        <path d="M19.8109 13.8175H19.2974V4H19.8109V13.8175Z" fill="#18181A" />
        <path d="M22.892 13.8175H21.3514V4H22.892V13.8175Z" fill="#18181A" />
        <path d="M23.919 13.8175H23.4055V4H23.919V13.8175Z" fill="#18181A" />
        <path d="M25.973 13.8175H24.4325V4H25.973V13.8175Z" fill="#18181A" />
        <path d="M27.0001 13.8175H26.4866V4H27.0001V13.8175Z" fill="#18181A" />
        <path d="M29.0541 13.8175H27.5136V4H29.0541V13.8175Z" fill="#18181A" />
        <path d="M31.1082 13.8175H30.5947V4H31.1082V13.8175Z" fill="#18181A" />
        <path d="M32.1352 13.8175H31.6217V4H32.1352V13.8175Z" fill="#18181A" />
        <path d="M33.1622 13.8175H32.6487V4H33.1622V13.8175Z" fill="#18181A" />
        <path d="M35.2163 13.8175H34.7028V4H35.2163V13.8175Z" fill="#18181A" />
        <path d="M37.2703 13.8175H35.7298V4H37.2703V13.8175Z" fill="#18181A" />
        <path d="M38.2973 13.8175H37.7838V4H38.2973V13.8175Z" fill="#18181A" />
        <path d="M40.3514 13.8175H38.8109V4H40.3514V13.8175Z" fill="#18181A" />
        <path d="M41.3784 13.8175H40.8649V4H41.3784V13.8175Z" fill="#18181A" />
        <path d="M43.4325 13.8175H41.8919V4H43.4325V13.8175Z" fill="#18181A" />
        <path d="M44.4595 13.8175H43.946V4H44.4595V13.8175Z" fill="#18181A" />
        <path d="M47.5406 13.8175H46V4H47.5406V13.8175Z" fill="#18181A" />
        <path d="M48.5676 13.8175H48.0541V4H48.5676V13.8175Z" fill="#18181A" />
        <path d="M49.5946 13.8175H49.0811V4H49.5946V13.8175Z" fill="#18181A" />
        <path d="M51.6487 13.8175H50.1081V4H51.6487V13.8175Z" fill="#18181A" />
        <path d="M52.6757 13.8175H52.1622V4H52.6757V13.8175Z" fill="#18181A" />
        <path d="M54.7297 13.8175H53.1892V4H54.7297V13.8175Z" fill="#18181A" />
        <path d="M56.7838 13.8175H56.2703V4H56.7838V13.8175Z" fill="#18181A" />
        <path d="M57.8108 13.8175H57.2973V4H57.8108V13.8175Z" fill="#18181A" />
        <path d="M59.8649 13.8175H59.3514V4H59.8649V13.8175Z" fill="#18181A" />
        <path d="M61.9189 13.8175H60.3784V4H61.9189V13.8175Z" fill="#18181A" />
        <path d="M63.973 13.8175H62.4324V4H63.973V13.8175Z" fill="#18181A" />
        {/* barcode end */}
      </g>
    </svg>
  );
}
