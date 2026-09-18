import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-foreground/60">
        <Image
          src="/logo.jpg"
          alt="Valmaur Products"
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
        />
        <p className="mt-2 max-w-md">
          Gold plated jewelry and fashion accessories. Necklaces, earrings,
          bracelets, rings and more.
        </p>
        <p className="mt-6">
          © {new Date().getFullYear()} Valmaur. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
