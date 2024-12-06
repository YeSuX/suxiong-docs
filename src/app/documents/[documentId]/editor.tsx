'use client'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {
  const editor = useEditor({
    editorProps:{
        attributes: {
            style: 'padding-left: 56px; padding-right: 56px;',
            class: 'focus:outline-none print:border-none bg-white border border-gray-200 flex flex-col min-h-[1054px] pt-10 pr-14 pb-10 cursor-text',
        },
    },
    extensions: [StarterKit],
    content: '<p>Hello World</p>',
  })
  return (
    <div className="size-full bg-gray-100">
        <EditorContent editor={editor} />
    </div>
  )
}
export default Editor