import Link from "next/link"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/documents/1">Document 1</Link>
    </div>
  )
}
export default Home