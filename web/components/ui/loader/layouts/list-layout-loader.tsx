import { getRandomInt, getRandomLength } from "../utils";

const ListItemRow = () => (
  <div className="flex h-11 items-center justify-between border-b border-custom-border-200 p-3">
    <div className="flex items-center gap-3">
      <span className="h-5 w-10 rounded bg-custom-background-80" />
      <span className={`h-5 w-${getRandomLength(["32", "52", "72"])} rounded bg-custom-background-80`} />
    </div>
    <div className="flex items-center gap-2">
      {[...Array(6)].map((_, index) => (
        <>
          {getRandomInt(1, 2) % 2 === 0 ? (
            <span key={index} className="h-5 w-5 rounded bg-custom-background-80" />
          ) : (
            <span className="h-5 w-16 rounded bg-custom-background-80" />
          )}
        </>
      ))}
    </div>
  </div>
);

const ListSection = ({ itemCount }: { itemCount: number }) => (
  <div className="flex flex-shrink-0 flex-col">
    <div className="sticky top-0 z-[2] w-full flex-shrink-0 border-b border-custom-border-200 bg-custom-background-90 px-3 py-1">
      <div className="flex w-full items-center gap-2 py-1.5">
        <span className="h-6 w-6 rounded bg-custom-background-80" />
        <span className="h-6 w-24 rounded bg-custom-background-80" />
      </div>
    </div>
    <div className="relative h-full w-full">
      {[...Array(itemCount)].map((_, index) => (
        <ListItemRow key={index} />
      ))}
    </div>
  </div>
);

export const ListLayoutLoader = () => (
  <div className="flex flex-shrink-0 animate-pulse flex-col">
    {[6, 5, 2].map((itemCount, index) => (
      <ListSection key={index} itemCount={itemCount} />
    ))}
  </div>
);
