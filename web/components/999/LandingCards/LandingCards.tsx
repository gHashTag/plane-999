import React from "react";

import { cn } from "@/services/supabase/999-utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";

type CardsProps = {
  type?: string;
  title?: string;
  children: JSX.Element;
  className?: string;
  url?: string;
};

const LandingCards: React.FC<CardsProps> = ({ children, title, type, className, url }) => {
  const { push } = useRouter();

  return (
    <div
      className={cn("flex w-full rounded-lg border border-yellow-600 p-6", className)}
      onClick={() => {
        if (url) push(url);
      }}
    >
      <div className="flex items-center gap-5">
        {type && (
          <Image
            src={`/images/${type}.png`}
            alt={type ?? "landing- card"}
            width={40}
            height={40}
            className="object-contain"
          />
        )}
        <div className="text-rgb-2 text-xl font-medium" style={{ color: "lime" }}>
          {title}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
export default React.memo(LandingCards);
