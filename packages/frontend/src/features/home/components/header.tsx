import { IconInfo, IconPlusBox } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import React from "react";

function Header() {
  return (
    <header className="py-14 space-y-10 px-4 absolute w-full bg-gradient-to-b from-white via-85% via-white to-white/20 z-10">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-center text-pretty">
          Hide Your Text <br />
          Behind a Price Tag
        </h1>
        <p className="text-center text-base md:text-lg text-gray-600 leading-4">
          Sell Anything — As Long As It's Text
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button size={"lg"} className="w-full md:w-64 mx-auto">
          <IconPlusBox />
          <span>START SELLING</span>
        </Button>
        <Button
          variant="secondary"
          size={"lg"}
          className="w-full md:w-64 mx-auto"
          asChild
        >
          <Link to="/about">
            <IconInfo />
            <span className="tracking-tight">WTH is HEXIS?</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

export default React.memo(Header);
