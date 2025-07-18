import { Link } from "@tanstack/react-router";
import styles from "./menu.module.css";
import { cn } from "@/lib/tailwind-utils";
import { IconHome, IconSearch, IconSignIn } from "./icon";
import Logo from "./logo";

export default function Menu() {
  return (
    <nav>
      <Link
        to="/"
        className={cn(
          "h-16 md:h-32 flex justify-center items-center border-b-2",
          styles.background,
        )}
      >
        <Logo
          width={128}
          height={128}
          className="mx-auto relative z-10 border-x-2"
        />
      </Link>

      <menu className="[&>li]:border-b-2">
        <li>
          <MenuItem to="/" icon={IconHome} label="HOME" />
        </li>
        <li>
          <MenuItem to="/search" icon={IconSearch} label="SEARCH" />
        </li>
        <li>
          <MenuItem to="/account/sign-in" icon={IconSignIn} label="SIGN IN" />
        </li>
      </menu>
    </nav>
  );
}

function MenuItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center md:justify-start gap-3 p-4 hover:bg-black group group-hover:[&>path]:fill-black"
    >
      <Icon className="size-6 md:size-8 group-hover:text-white" />
      <span className="hidden md:block text-xl font-bold group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}
