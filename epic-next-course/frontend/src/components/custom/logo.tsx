import Link from "next/link";

const styles = {
  link: "flex items-center gap-2",
  icon: "h-6 w-6 text-pink-500",
  text: {
    base: "text-lg font-semibold",
    light: "text-slate-900",
    dark: "text-white",
  },
};

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

interface ILogo {
  text: string;
  dark?: boolean;
}

export function Logo({
  text,
  dark = false,
}: Readonly<ILogo>) {
  return (
    <Link className={styles.link} href="/">
      <MountainIcon className={styles.icon} />
      <span className={`${styles.text.base} ${dark ? styles.text.dark : styles.text.light}`}>
        {text}
      </span>
    </Link>
  );
}
