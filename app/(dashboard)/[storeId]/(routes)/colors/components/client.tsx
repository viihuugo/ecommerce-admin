'use client'

import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface ColorClientProps {
  data: ColorColumn[]
}

export default function ColorClient({data}:ColorClientProps) {

  const router = useRouter();
  const params = useParams();
  
  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Colors (${data.length})`} description="Manage colors for your products"/>
            <Button onClick={()=> router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="h-4 w-4 mr-2"/>
                Add new
            </Button>
        </div>        
        <Separator/>
        <DataTable searchKey='name' columns={columns} data={data}/>
        <Heading title="API" description="API calls for Colors"/>
        <Separator/>
        <ApiList entityName="colors" entityIdName="colorId"/>
    </>
  )
}
