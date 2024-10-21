'use client'
import FridgeSideBar from "@/components/fridgeSideBar";
import ItemsList from "@/components/itemsList";
import { useAuth } from "@clerk/nextjs";

export default function ShoppingListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();
  return (user.userId ? (
<div className="grid grid-cols-12 gap-4 h-full">
      <div className="col-span-2">
        <FridgeSideBar />
      </div>
      <div className="col-span-8 py-8 overflow-auto">
        {children}
      </div>
      <div className="col-span-2">
        <ItemsList />
      </div>
    </div>
  ) : (
    <div >
        {children}
    </div>
  ));
}