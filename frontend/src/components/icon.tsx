import { cn } from '@/lib/tailwind-utils';

export function IconHome({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-black', className)}
      {...props}
    >
      <path
        d='M29.3997 15.5859V29H19.3997V21H13.3997V29H3.39966V15.5859L16.3997 2.58594L29.3997 15.5859ZM5.39966 16.4141V27H11.3997V19H21.3997V27H27.3997V16.4141L16.3997 5.41406L5.39966 16.4141Z'
        fill='currentColor'
      />
    </svg>
  );
}

export function IconSearch({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-black', className)}
      {...props}
    >
      <path
        d='M12.5999 4.32001C17.0181 4.32001 20.5999 7.90173 20.5999 12.32C20.5999 14.1686 19.9702 15.8687 18.9172 17.2233L29.3069 27.613L27.8928 29.027L17.5032 18.6374C16.1485 19.6903 14.4485 20.32 12.5999 20.32C8.18158 20.32 4.59985 16.7383 4.59985 12.32C4.59985 7.90173 8.18158 4.32001 12.5999 4.32001ZM12.5999 6.32001C9.28614 6.32001 6.59985 9.0063 6.59985 12.32C6.59985 15.6337 9.28614 18.32 12.5999 18.32C15.9136 18.32 18.5999 15.6337 18.5999 12.32C18.5999 9.0063 15.9136 6.32001 12.5999 6.32001Z'
        fill='currentColor'
      />
    </svg>
  );
}

export function IconSignIn({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-black', className)}
      {...props}
    >
      <path
        d='M21.8003 15.32H28.8003V17.32H21.8003V25.1013L21.0425 25.2897L5.04248 29.2897L3.80029 29.6013V7.53876L4.55811 7.35028L20.5581 3.35028L21.8003 3.03876V15.32ZM5.80029 27.0397L12.6792 25.32H5.80029V27.0397ZM5.80029 9.10028V23.32H19.8003V17.32H15.2144L17.5073 19.613L16.0933 21.027L11.3862 16.32L16.0933 11.613L17.5073 13.027L15.2144 15.32H19.8003V5.60028L5.80029 9.10028Z'
        fill='currentColor'
      />
    </svg>
  );
}

export function IconClock({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-black', className)}
      {...props}
    >
      <path
        d='M16.8335 4.32001C23.4609 4.32001 28.8335 9.69259 28.8335 16.32C28.8335 22.9474 23.4609 28.32 16.8335 28.32C10.2061 28.32 4.8335 22.9474 4.8335 16.32C4.8335 9.69259 10.2061 4.32001 16.8335 4.32001ZM16.8335 6.32001C11.3106 6.32001 6.8335 10.7972 6.8335 16.32C6.8335 21.8429 11.3106 26.32 16.8335 26.32C22.3563 26.32 26.8335 21.8429 26.8335 16.32C26.8335 10.7972 22.3563 6.32001 16.8335 6.32001ZM16.8335 16.32H21.8335V18.32H14.8335V11.32H16.8335V16.32Z'
        fill='currentColor'
      />
    </svg>
  );
}

export function IconPlusBox({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-black', className)}
      {...props}
    >
      <path
        d='M29.8335 24.7341L25.2476 29.32H3.8335V7.90594L8.41943 3.32001H29.8335V24.7341ZM5.8335 27.32H23.8335V9.32001H5.8335V27.32ZM25.8335 8.73407V25.9059L27.8335 23.9059V6.73407L25.8335 8.73407ZM15.8335 17.32H20.8335V19.32H15.8335V24.32H13.8335V19.32H8.8335V17.32H13.8335V12.32H15.8335V17.32ZM7.24756 7.32001H24.4194L26.4194 5.32001H9.24756L7.24756 7.32001Z'
        fill='currentColor'
      />
    </svg>
  );
}

export function IconInfo({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-black', className)}
      {...props}
    >
      <path
        d='M16 4.32001C22.6274 4.32001 28 9.69259 28 16.32C28 22.9474 22.6274 28.32 16 28.32C9.37258 28.32 4 22.9474 4 16.32C4 9.69259 9.37258 4.32001 16 4.32001ZM16 6.32001C10.4772 6.32001 6 10.7972 6 16.32C6 21.8429 10.4772 26.32 16 26.32C21.5228 26.32 26 21.8429 26 16.32C26 10.7972 21.5228 6.32001 16 6.32001ZM17 21.32H15V14H17V21.32ZM16 10.32C16.5523 10.32 17 10.7677 17 11.32C17 11.8723 16.5523 12.32 16 12.32C15.4477 12.32 15 11.8723 15 11.32C15 10.7677 15.4477 10.32 16 10.32Z'
        fill='currentColor'
      />
    </svg>
  );
}
