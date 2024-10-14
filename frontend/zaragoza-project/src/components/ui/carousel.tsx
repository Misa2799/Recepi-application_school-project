import React, { useState } from "react";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white p-2"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white p-2"
      >
        Next
      </button>
    </div>
  );
};

export const CarouselItem: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={`flex-shrink-0 w-full ${className}`}>{children}</div>
);

export const CarouselContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => <div className={className}>{children}</div>;

interface CarouselButtonProps {
  className?: string;
  onClick: () => void;
}

export const CarouselPrevious: React.FC<CarouselButtonProps> = ({
  className,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`bg-yellow-400 text-white hover:bg-yellow-500 ${className}`}
  >
    Previous
  </button>
);

export const CarouselNext: React.FC<CarouselButtonProps> = ({
  className,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`bg-yellow-400 text-white hover:bg-yellow-500 ${className}`}
  >
    Next
  </button>
);
