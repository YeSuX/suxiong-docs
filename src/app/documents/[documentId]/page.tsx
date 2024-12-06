import Editor from "./editor"

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {

    return (
        <div className="size-full bg-gray-100 px-4 overflow-auto print:p-0 print:overflow-visible print:bg-white">
            <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:mx-0 print:w-full">
                <Editor />
            </div>
        </div>
    )
}


export default DocumentIdPage