import prismadb from "@/lib/prismadb";

import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/client";

export default async function SizesPage({
  params
}:{
  params: { storeId: string }
}) {

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = sizes.map((item)=>({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className="flex">
        <div className="p-8 pt-6 flex-1 space-y-4">
            <SizeClient data={formattedSizes}/>
        </div>
    </div>
  )
}
