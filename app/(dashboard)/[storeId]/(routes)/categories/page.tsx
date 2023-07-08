import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";

export default async function CategoriesPage({
  params
}:{
  params: { storeId: string }
}) {

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map((item)=>({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className="flex">
        <div className="p-8 pt-6 flex-1 space-y-4">
            <CategoryClient data={formattedCategories}/>
        </div>
    </div>
  )
}
