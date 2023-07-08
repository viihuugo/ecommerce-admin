import prismadb from "@/lib/prismadb"
import CategoryForm from "./components/category-form";

export default async function BillboardPage({
    params
}:{
    params: { categoryId: string, storeId: string }
}) {
  const category = await prismadb.category.findUnique({
    where: {
        id: params.categoryId
    }
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
        <div className="p-8 pt-6 flex-1 space-y-4">
            <CategoryForm initialData={category} billboards={billboards}/>
        </div>
    </div>
  )
}
