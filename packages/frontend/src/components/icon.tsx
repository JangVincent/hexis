import { cn } from "@/lib/tailwind-utils";

export function IconHome({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-black", className)}
      {...props}
    >
      <path
        d="M29.3997 15.5859V29H19.3997V21H13.3997V29H3.39966V15.5859L16.3997 2.58594L29.3997 15.5859ZM5.39966 16.4141V27H11.3997V19H21.3997V27H27.3997V16.4141L16.3997 5.41406L5.39966 16.4141Z"
        fill="currentColor"
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
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-black", className)}
      {...props}
    >
      <path
        d="M12.5999 4.32001C17.0181 4.32001 20.5999 7.90173 20.5999 12.32C20.5999 14.1686 19.9702 15.8687 18.9172 17.2233L29.3069 27.613L27.8928 29.027L17.5032 18.6374C16.1485 19.6903 14.4485 20.32 12.5999 20.32C8.18158 20.32 4.59985 16.7383 4.59985 12.32C4.59985 7.90173 8.18158 4.32001 12.5999 4.32001ZM12.5999 6.32001C9.28614 6.32001 6.59985 9.0063 6.59985 12.32C6.59985 15.6337 9.28614 18.32 12.5999 18.32C15.9136 18.32 18.5999 15.6337 18.5999 12.32C18.5999 9.0063 15.9136 6.32001 12.5999 6.32001Z"
        fill="currentColor"
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
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-black", className)}
      {...props}
    >
      <path
        d="M21.8003 15.32H28.8003V17.32H21.8003V25.1013L21.0425 25.2897L5.04248 29.2897L3.80029 29.6013V7.53876L4.55811 7.35028L20.5581 3.35028L21.8003 3.03876V15.32ZM5.80029 27.0397L12.6792 25.32H5.80029V27.0397ZM5.80029 9.10028V23.32H19.8003V17.32H15.2144L17.5073 19.613L16.0933 21.027L11.3862 16.32L16.0933 11.613L17.5073 13.027L15.2144 15.32H19.8003V5.60028L5.80029 9.10028Z"
        fill="currentColor"
      />
    </svg>
  );
}
