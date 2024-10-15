"use client";

import ItemsList, { OwnedItems } from "@/components/itemsList";
import FridgeSideBar from "@/components/fridgeSideBar";
import WishList from "@/components/wishList";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteRecipes } from "../actions";
import { Recipe } from "@/types/types";
import {
  dummyOwnedItems,
  dummyRecipes,
  ShoppingListProvider,
} from "@/context/shoppingListContext.context";

export default function Page() {
  const { userId } = useAuth();
  console.log("userId: ", userId);

  return (
    <ShoppingListProvider>
      <div className="grid grid-cols-12 gap-4">
        <div id="sideBar" className="col-span-3">
          <FridgeSideBar />
        </div>

        <div id="wishList" className="col-span-6 py-6">
          <WishList />
        </div>

        <div id="itemsList" className="h-screen col-span-3">
          <ItemsList />
        </div>
      </div>
    </ShoppingListProvider>
  );
}
