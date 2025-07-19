export default function CommonLayout({
  menu,
  children,
}: {
  menu?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-black bg-white w-full max-w-(--max-container-width) overflow-hidden mx-auto min-h-[640px] h-[calc(100svh_-_2px)] mt-px box-border flex -gap-1">
      <div className="border-r-2 basis-(--min-menu-width) md:basis-(--max-menu-width) shrink-0">
        {menu}
      </div>
      <div id="main" className="flex-grow">
        {children}
      </div>
    </div>
  );
}
