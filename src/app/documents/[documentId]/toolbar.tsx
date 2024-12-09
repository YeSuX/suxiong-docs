'use client'
import { cn } from '@/lib/utils'
import { LucideIcon, Undo2Icon } from 'lucide-react'

interface ToolbarButtonProps {
  icon: LucideIcon
  isActive?: boolean
  onClick: () => void
}

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon />
    </button>
  )
}

const Toolbar = () => {
  const section: {
    icon: LucideIcon
    label: string
    onClick: () => void
    isActive?: boolean
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => console.log('Undo')
      }
    ]
  ]

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {section[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  )
}

export default Toolbar
