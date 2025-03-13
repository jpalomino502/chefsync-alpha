import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
  >(({ children, className, ...props }, ref) => {
    return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border border-white bg-black px-8 py-3 text-center font-semibold min-w-[200px] dark:border-white dark:bg-black",
        className,
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 pl-2 transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0 text-white">
        {children}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black opacity-0 transition-all duration-500 group-hover:-translate-x-1 group-hover:opacity-100 dark:text-white">
        <span>{children}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-white transition-all duration-500 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-white dark:bg-black dark:group-hover:bg-black"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;
