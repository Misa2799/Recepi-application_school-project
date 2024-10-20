'use client'
import FridgeSideBar from "@/components/fridgeSideBar";
import ItemsList from "@/components/itemsList";

export default function ShoppingListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      <div className="col-span-3">
        <FridgeSideBar />
      </div>
      <div className="col-span-6 py-6 overflow-auto">
        {children}
      </div>
      <div className="col-span-3">
        <ItemsList />
      </div>
    </div>
  );
}