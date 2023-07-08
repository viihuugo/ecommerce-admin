import prismadb from "@/lib/prismadb";

import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import ColorClient from "./components/client";

export default async function ColorsPage({
  params
}:{
  params: { storeId: string }
}) {

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map((item)=>({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className="flex">
        <div className="p-8 pt-6 flex-1 space-y-4">
            <ColorClient data={formattedColors}/>
        </div>
    </div>
  )
}
