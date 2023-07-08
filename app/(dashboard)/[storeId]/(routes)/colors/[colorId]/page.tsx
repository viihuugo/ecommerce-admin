import prismadb from "@/lib/prismadb"
import ColorForm from "./components/color-form";

export default async function ColorPage({
    params
}:{
    params: { colorId: string }
}) {
  const color = await prismadb.color.findUnique({
    where: {
        id: params.colorId
    }
  });

  return (
    <div className="flex-col">
        <div className="p-8 pt-6 flex-1 space-y-4">
            <ColorForm initialData={color}/>
        </div>
    </div>
  )
}
