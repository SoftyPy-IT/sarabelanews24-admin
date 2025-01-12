/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import React, { useEffect, useState } from "react";

import { Controller, useFormContext } from "react-hook-form";
import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiCode,
  BiColorFill,
  BiFont,
  BiHighlight,
  BiImage,
  BiItalic,
  BiLink,
  BiListOl,
  BiListUl,
  BiRedo,
  BiTable,
  BiTask,
  BiUnderline,
  BiUndo,
  BiVideo,
} from "react-icons/bi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {} from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AllImages from "@/app/(main)/dashboard/gallery/all-img/_components/AllImages";

const ColorPickerContent = ({
  editor,
  type = "color",
}: {
  editor: any;
  type?: "color" | "highlight";
}) => {
  const colors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
  ];

  const setColor = (color: string) => {
    if (type === "highlight") {
      editor.chain().focus().toggleHighlight({ color }).run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
  };

  return (
    <PopoverContent className="w-64">
      <div className="grid grid-cols-10 gap-1">
        {colors.map((color) => (
          <Button
            key={color}
            className="w-5 h-5 p-0"
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
    </PopoverContent>
  );
};

// Table controls menu component
const TableMenu = ({ editor }: { editor: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant={editor?.isActive("table") ? "default" : "outline"}
        >
          <BiTable className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Table</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Insert Table
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          Add Column Before
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          Add Column After
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          Delete Column
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowBefore().run()}
        >
          Add Row Before
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          Add Row After
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          Delete Row
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          Delete Table
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().mergeCells().run()}
        >
          Merge Cells
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().splitCell().run()}
        >
          Split Cell
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        >
          Toggle Header Row
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          Toggle Header Column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface TextEditorProps {
  name: string;
  rules?: string | object;
  placeholder: string;
  defaultValue?: string;
  readOnly?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  name,
  rules,
  placeholder = "Start typing...",
  defaultValue = "",
  readOnly = false,
  // onImageUpload,
}) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDialog, setLinkDialog] = useState(false);
  const { control, setValue } = useFormContext();
  const lowlight = createLowlight(common);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [videoUrl, setVideoUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg mx-auto",
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full aspect-video rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Superscript,
      Subscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      CodeBlockLowlight.configure({
        lowlight: lowlight,
      }),
      Typography,
      Placeholder.configure({
        placeholder,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline focus:outline-gray-300 max-w-full mx-auto min-h-[200px] bg-white p-3",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(name, editor.getHTML(), { shouldDirty: true });
    },
    content: defaultValue || "",
    editable: !readOnly,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(defaultValue || "");
    }
  }, [defaultValue, editor]);

  if (!editor) {
    return null;
  }

  // const addImage = (url: string) => {
  //   if (editor && url) {
  //     editor.chain().focus().setImage({ src: url }).run();
  //   }
  // };

  const addYoutubeVideo = () => {
    if (editor && videoUrl) {
      editor.chain().focus().setYoutubeVideo({ src: videoUrl }).run();
      setVideoUrl("");
    }
  };

  const addLink = () => {
    if (editor && linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl, target: "_blank" }).run();
      setLinkUrl("");
      setLinkDialog(false);
    }
  };

  const MenuBar = () => {
    if (readOnly) return null;

    return (
      <ScrollArea className="border-b">
        <div className="flex flex-wrap items-center gap-2 p-2">
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {/* Text Formatting */}
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={editor.isActive("bold") ? "default" : "outline"}
                      onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                      <BiBold className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bold</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("italic") ? "default" : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                    >
                      <BiItalic className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Italic</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("underline") ? "default" : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                      }
                    >
                      <BiUnderline className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Underline</TooltipContent>
                </Tooltip>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("heading", { level: 1 }) ||
                        editor.isActive("heading", { level: 2 }) ||
                        editor.isActive("heading", { level: 3 }) ||
                        editor.isActive("heading", { level: 4 }) ||
                        editor.isActive("heading", { level: 5 }) ||
                        editor.isActive("heading", { level: 6 })
                          ? "default"
                          : "outline"
                      }
                    >
                      <BiFont className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Select
                      onValueChange={(value) => {
                        if (value === "paragraph") {
                          editor.chain().focus().setParagraph().run();
                        } else {
                          const level = parseInt(
                            value.replace("heading", ""),
                            10
                          );
                          editor.chain().focus().toggleHeading({ level }).run();
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            editor.isActive("heading", { level: 1 })
                              ? "Heading 1"
                              : editor.isActive("heading", { level: 2 })
                              ? "Heading 2"
                              : editor.isActive("heading", { level: 3 })
                              ? "Heading 3"
                              : editor.isActive("heading", { level: 4 })
                              ? "Heading 4"
                              : editor.isActive("heading", { level: 5 })
                              ? "Heading 5"
                              : editor.isActive("heading", { level: 6 })
                              ? "Heading 6"
                              : "Paragraph"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="heading1">Heading 1</SelectItem>
                        <SelectItem value="heading2">Heading 2</SelectItem>
                        <SelectItem value="heading3">Heading 3</SelectItem>
                        <SelectItem value="heading4">Heading 4</SelectItem>
                        <SelectItem value="heading5">Heading 5</SelectItem>
                        <SelectItem value="heading6">Heading 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
              </div>

              {/* List Formatting */}
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("bulletList") ? "default" : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                    >
                      <BiListUl className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bullet List</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("orderedList") ? "default" : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                    >
                      <BiListOl className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Ordered List</TooltipContent>
                </Tooltip>

                {/* Table */}
                <TableMenu editor={editor} />

                {/* Link */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={editor.isActive("link") ? "default" : "outline"}
                      onClick={() => setLinkDialog(true)}
                    >
                      <BiLink className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Link</TooltipContent>
                </Tooltip>
              </div>

              {/* Text Alignment */}
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive({ textAlign: "left" })
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                      }
                    >
                      <BiAlignLeft className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align Left</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive({ textAlign: "center" })
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                      }
                    >
                      <BiAlignMiddle className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align Center</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive({ textAlign: "right" })
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                      }
                    >
                      <BiAlignRight className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align Right</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive({ textAlign: "justify" })
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().setTextAlign("justify").run()
                      }
                    >
                      <BiAlignJustify className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align Justify</TooltipContent>
                </Tooltip>
              </div>

              {/* Color and Highlight */}
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("highlight") ? "default" : "outline"
                      }
                    >
                      <BiHighlight className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <ColorPickerContent editor={editor} type="highlight" />
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("textStyle") ? "default" : "outline"
                      }
                    >
                      <BiColorFill className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <ColorPickerContent editor={editor} type="color" />
                </Popover>
              </div>

              {/* Code, Task List, and Media */}
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("codeBlock") ? "default" : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                      }
                    >
                      <BiCode className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Code Block</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        editor.isActive("taskList") ? "default" : "outline"
                      }
                      onClick={() =>
                        editor.chain().focus().toggleTaskList().run()
                      }
                    >
                      <BiTask className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Task List</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <BiImage className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Image</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setVideoUrl("https://")}
                    >
                      <BiVideo className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Video</TooltipContent>
                </Tooltip>
              </div>

              {/* Undo/Redo */}
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editor.chain().focus().undo().run()}
                    >
                      <BiUndo className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editor.chain().focus().redo().run()}
                    >
                      <BiRedo className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="border rounded-lg">
      <Controller
        name={name}
        control={control}
        rules={
          typeof rules === "string"
            ? {
                required: rules,
                validate: {
                  notEmpty: (value) => {
                    const isEmpty =
                      !value ||
                      value === "<p></p>" ||
                      value.replace(/<[^>]*>/g, "").trim() === "";
                    return !isEmpty || rules;
                  },
                },
              }
            : rules
        }
        render={({ field, fieldState }) => (
          <>
            <MenuBar />
            <EditorContent editor={editor} value={field.value} />
            {fieldState.error && (
              <p className="text-red-500 text-sm px-3 py-1">
                {fieldState.error.message}
              </p>
            )}

            <div>
              <Sheet open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                <SheetContent side="right" style={{ maxWidth: "800px" }}>
                  <AllImages />
                </SheetContent>
              </Sheet>
            </div>

            <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
              <DialogContent>
                <DialogDescription>
                  <Label>URL</Label>
                  <Input
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />

                  <div className="flex justify-end mt-4">
                    <Button onClick={addLink}>Add Link</Button>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>

            <Dialog open={!!videoUrl} onOpenChange={() => setVideoUrl("")}>
              <DialogContent>
                <DialogDescription>
                  <Label>URL</Label>
                  <Input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />

                  <div className="flex justify-end mt-4">
                    <Button onClick={addYoutubeVideo}>Add Video</Button>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </>
        )}
      />
    </div>
  );
};

export default TextEditor;