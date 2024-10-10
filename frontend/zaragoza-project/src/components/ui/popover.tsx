import React, { useState } from "react";

interface PopoverProps {
  children: [React.ReactNode, React.ReactNode];
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div onClick={togglePopover}>{children[0]}</div>
      {isOpen && (
        <div className="absolute z-10 bg-white border rounded shadow-lg p-4">
          {children[1]}
        </div>
      )}
    </div>
  );
};

export const PopoverTrigger = ({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const PopoverContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export { Popover };
