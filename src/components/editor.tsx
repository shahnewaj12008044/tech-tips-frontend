import Quill, {type QuillOptions } from "quill";

import "quill/dist/quill.snow.css";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { ImageIcon, Smile, XIcon } from "lucide-react";
import { Hint } from "./hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import { EmojiPopover } from "./emoji-popover";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

type EditorValue = {
  title: string;
  images: File[] | null;
  body: string;
  category: string;
  isPremium: boolean;
};

interface EditorProps {
  onSubmit: ({ images, body, title, category, isPremium }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

const PostEditor = ({
  onSubmit,
  onCancel,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageElementRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: isToolbarVisible
          ? [
            ["bold", "italic", "strike", "underline"],
              ["link"],
              [{ list: "ordered" }, { list: "bullet" }],
            ]
          : false,
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText();
                const isEmpty = !images.length && text.trim().length === 0;

                if (isEmpty) return;

                const body = JSON.stringify(quill.getContents());
                submitRef.current?.({ title, body, images, category, isPremium });
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const isEmpty = !images.length && text.trim().length === 0;
  const isTitleValid = title !== "";
  const isCategoryValid = category !== "";
  return (
    <div className="flex flex-col max-w-[280px] md:max-w-lg">
    {/* Title Input */}
    <Input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter the title"
      className="mb-2" 
      disabled={disabled}
    />
    <div className="flex gap-5">
    <div className="w-96 mb-2">
      <Select
        name="category"
        onValueChange={setCategory} // Update category state on selection
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="software engineering">
              Software Engineering
            </SelectItem>
            <SelectItem value="AI">AI</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
    </div>
    {/* Premium Checkbox */}
    <div className="mt-1">
      <label className="inline-flex items-center text-sm">
        <input
          type="checkbox"
          checked={isPremium} // Binds the checkbox state to isPremium
          onChange={(e) => setIsPremium(e.target.checked)} // Updates isPremium based on checkbox status
          className="mr-2"
        />
        Mark as Premium
      </label>
      
      </div>
    </div>

      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={handleImageChange}
        className="hidden"
        multiple
      />
      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {!!images.length && (
          <div className="p-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
                <div
                key={index}
                className="relative size-[62px] flex items-center justify-center group/image"
              >
                <Hint label="Remove image">
                  <button
                    onClick={() => removeImage(index)}
                    className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </Hint>
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Upload"
                  fill
                  className="rounded-xl overflow-hidden border object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "Hide formatting" : "Show formatting"}
          >
            <Button
              disabled={disabled}
              variant="ghost"
              size="icon"
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} variant="ghost" size="icon">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                disabled={disabled}
                variant="ghost"
                size="icon"
                onClick={() => imageElementRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                disabled={disabled || isEmpty}
                onClick={() => {
                  onSubmit({
                    title,
                    body: JSON.stringify(quillRef.current?.getContents()),
                    images,
                    category,
                    isPremium
                  });
                }}
                size="sm"
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
            className={cn(
              "ml-auto",
              isEmpty || !isTitleValid || !isCategoryValid
                ? "bg-white hover:bg-white text-muted-foreground"
                : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            )}
              size="icon"
              disabled={disabled || isEmpty}
              onClick={() => {
                onSubmit({
                  title,
                  body: JSON.stringify(quillRef.current?.getContents()),
                  images,
                  category,
                  isPremium,
                  
                });
              }}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
            !isEmpty && "opacity-100"
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default PostEditor;