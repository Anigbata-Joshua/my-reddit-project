import { ChevronDown, Image, Video, Link, Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Heading1, Sparkles, Smile, AlignLeft} from 'lucide-react';


export default function PostToolbar({ onAddImage }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex items-center gap-1 overflow-x-auto">
                <ToolbarButton icon={<Link size={15} />} label="Insert link" />
                <button
                    type="button"
                    title="Add image"
                    aria-label="Add image"
                    onClick={onAddImage}
                    className="shrink-0 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                >
                    <Image size={15} />
                </button>
                <ToolbarButton icon={<Video size={15} />} label="Add video" />
                <div className="mx-1 h-4 w-px shrink-0 bg-gray-200" />
                <ToolbarButton icon={<Bold size={15} />} label="Bold text" />
                <ToolbarButton icon={<Italic size={15} />} label="Italic text" />
                <ToolbarButton icon={<Strikethrough size={15} />} label="Strikethrough" />
                <ToolbarButton icon={<Code size={15} />} label="Code block" />
                <div className="mx-1 h-4 w-px shrink-0 bg-gray-200" />
                <ToolbarButton icon={<List size={15} />} label="Bulleted list" />
                <ToolbarButton icon={<ListOrdered size={15} />} label="Numbered list" />
                <ToolbarButton icon={<Quote size={15} />} label="Blockquote" />
                <ToolbarButton icon={<Heading1 size={15} />} label="Heading" />
                <ToolbarButton icon={<Smile size={15} />} label="Insert emoji" />
            </div>

            <div className="shrink-0 pl-2">
                <ToolbarButton icon={<AlignLeft size={15} />} label="Extended options" />
            </div>
        </div>
    );
}

function ToolbarButton({ icon, label }) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            className="shrink-0 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
        >
            {icon}
        </button>
    );
}
