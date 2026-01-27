// src/app/(main)/menu/page.tsx
import { getMenuData } from "@/actions/menu";
import MenuPage from "@/modules/menu/MenuPage";
export default async function Page() {
  
const categories = await getMenuData();
  return (
    <MenuPage initialCategories={categories}/>
  ); 
}