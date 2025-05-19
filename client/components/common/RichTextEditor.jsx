"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { clsx } from "clsx";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Code2,
  Quote,
  Heading1,
  Link as LinkIcon,
  FileCode2,
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function RichTextEditor({
  initialContent = "<p>Start writing...</p>",
  value,
  onChange,
  onSubmit,
  loading,
  submitButtonText = "Submit",
  placeholder = "Start writing...",
  showSubmitButton = true,
}) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [content, setContent] = useState(value ?? initialContent);
  const [showInsertHtmlInput, setShowInsertHtmlInput] = useState(false);
  const [htmlToInsert, setHtmlToInsert] = useState("");

  const handleEditorChange = (updatedContent) => {
    setContent(updatedContent);
    if (onChange) {
      onChange(updatedContent);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-500 underline",
        },
      }),
    ],
    content: value ?? initialContent,
    editorProps: {
      attributes: {
        class: clsx(
          "min-h-[400px] focus:outline-none w-full",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ul]:space-y-2",
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2",
          "[&_code]:bg-gray-800 [&_code]:text-white [&_code]:p-2 [&_code]:rounded",
          "[&_a]:text-blue-500 [&_a]:underline [&_a]:cursor-pointer",
          "[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:border-gray-300",
          "[&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-semibold"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      setContent(updatedContent);
      if (onChange) {
        onChange(updatedContent);
      }
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const insertHtml = () => {
    if (!htmlToInsert.trim()) return alert("Please enter some HTML.");
    editor.chain().focus().insertContent(htmlToInsert).run();
    setHtmlToInsert("");
    setShowInsertHtmlInput(false);
  };

  const addLink = () => {
    if (!linkUrl) return;
    const validLink =
      linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
        ? linkUrl
        : `https://${linkUrl}`;

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: validLink })
      .run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  if (!editor) return null;

  return (
    <div className="space-y-4 border rounded-lg p-4 w-full max-w-3xl mx-auto">
      <ToggleGroup type="multiple" className="flex flex-wrap gap-2">
        <ToggleGroupItem
          value="heading"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-pressed={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-pressed={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-pressed={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-pressed={editor.isActive("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bulletList"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="orderedList"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="code"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="link"
          onClick={() => setShowLinkInput(!showLinkInput)}
          aria-pressed={showLinkInput}
        >
          <LinkIcon className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="insertHTML"
          aria-pressed={showInsertHtmlInput}
          onClick={() => setShowInsertHtmlInput(!showInsertHtmlInput)}
        >
          <FileCode2 className="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      {showLinkInput && (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="https://yourlink.com"
            className="border rounded w-full"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addLink();
                e.preventDefault();
              }
            }}
          />
          <Button size="lg" className="cursor-pointer" onClick={addLink}>
            Add
          </Button>
        </div>
      )}

      {showInsertHtmlInput && (
        <div className="mt-2 p-2 border-2 rounded">
          <Textarea
            className="w-full p-2 border-2 rounded !h-24"
            rows={10}
            placeholder="Paste your HTML here"
            value={htmlToInsert}
            onChange={(e) => setHtmlToInsert(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setShowInsertHtmlInput(false)}
            >
              Cancel
            </Button>
            <Button className="cursor-pointer" onClick={insertHtml}>
              Insert
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-md p-4 min-h-[400px] bg-background">
        <EditorContent editor={editor} className="prose" />
      </div>

      {showSubmitButton && (
        <Button
          className="cursor-pointer px-8 py-5 hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 ease-in-out"
          onClick={async () => {
            const html = editor.getHTML();
            if (!html || html === `<p>${placeholder}</p>`) {
              alert("Please write something before submitting.");
              return;
            }
            await onSubmit(html);
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : submitButtonText}
        </Button>
      )}
    </div>
  );
}
