'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import useEditorStore from '@/store/use-editor-store'
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageCircleIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react'

import { type Level } from '@tiptap/extension-heading'

const HeadingLevelButton = () => {
  const { editor } = useEditorStore()

  const headingLevels = [
    { label: 'Normal', value: '0', fontSize: '16px' },
    { label: 'Heading 1', value: '1', fontSize: '32px' },
    { label: 'Heading 2', value: '2', fontSize: '24px' },
    { label: 'Heading 3', value: '3', fontSize: '20px' },
    { label: 'Heading 4', value: '4', fontSize: '18px' },
    { label: 'Heading 5', value: '5', fontSize: '16px' }
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level < headingLevels.length; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`
      }
    }

    return 'Normal'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
          <span className='text-xs'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='w-3 h-3' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {headingLevels.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            className={cn(
              'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
              (value === '0' && !editor?.isActive('heading')) ||
                (editor?.isActive('heading', { level: Number(value) }) &&
                  'bg-neutral-200/80')
            )}
            onClick={() => {
              if (value === '0') {
                editor?.chain().focus().setParagraph().run()
              } else {
                editor?.chain().focus().toggleHeading({ level: Number(value) as Level }).run()
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore()

  const fonts = [
    {
      label: 'Arial',
      value: 'Arial'
    },
    {
      label: 'Times New Roman',
      value: 'Times New Roman'
    },
    {
      label: 'Courier New',
      value: 'Courier New'
    },
    {
      label: 'Georgia',
      value: 'Georgia'
    },
    {
      label: 'Impact',
      value: 'Impact'
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
          <span className='text-xs'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='w-3 h-3' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === value &&
                'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
            onClick={()=>{}}
          >
            <span className='text-xs'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
  const { editor } = useEditorStore()

  console.log(editor)

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
        onClick: () => editor?.chain().focus().undo().run()
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run()
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print()
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck')
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false'
          )
        }
      }
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run()
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run()
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run()
      }
    ],
    [
      {
        label: 'Comment',
        icon: MessageCircleIcon,
        onClick: () => {},
        isActive: false
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive('taskList')
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      }
    ]
  ]

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {section[0].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Font Family */}
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Heading */}
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Font Size */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Font Color */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Background Color */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {section[1].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {section[2].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  )
}

export default Toolbar
