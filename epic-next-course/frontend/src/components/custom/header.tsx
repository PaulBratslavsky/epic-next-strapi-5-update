import Link from "next/link";
import type { THeader } from "@/types"
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";

export function Header({ data }: { data: THeader | undefined }) {
  if (!data) return null;
  const { logoText, ctaButton } = data;
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.label} />
      <div className="flex items-center gap-4">
        <Link href={ctaButton.href}>
          <Button>{ctaButton.label}</Button>
        </Link>
      </div>
    </div>
  );
}
