export default function CommonLayout({
  menu,
  children,
}: {
  menu?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-black bg-white w-full max-w-(--max-container-width) mx-auto min-h-screen box-border flex gap-0">
      <div className="border-r-2 basis-(--min-menu-width) md:basis-(--max-menu-width) shrink-0">
        {menu}
      </div>
      <div>{children}</div>
    </div>
  );
}
