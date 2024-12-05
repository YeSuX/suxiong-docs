interface DocumentLayoutProps {
    children: React.ReactNode
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
    return (
        <div className="flex flex-col">
            <nav className="w-full h-10 bg-gray-200">document navbar</nav>
            {children}
        </div>
    )
}
export default DocumentLayout