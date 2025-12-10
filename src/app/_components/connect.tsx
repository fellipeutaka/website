import Link from "next/link";
import { Icons } from "~/components/ui/icons";
import { socialLinks } from "~/config/site";

export function Connect() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Link className="size-4" />
        <h2 className="font-light text-sm">Connect</h2>
      </div>
      <div className="flex flex-col gap-4 px-2">
        {socialLinks.map((link) => (
          <Link
            className="flex items-center gap-3 text-muted-fg transition-colors hover:text-fg"
            href={link.href}
            key={link.href}
          >
            <link.icon className="size-4" />
            <h2 className="font-light">{link.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
