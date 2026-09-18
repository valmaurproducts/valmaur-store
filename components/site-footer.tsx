export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-foreground/60">
        <p className="font-semibold tracking-widest text-foreground">
          VALMAUR
        </p>
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
