export default function PostPageSkeleton() {
    return (
        <div className="space-y-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 h-3 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="mt-4 h-48 animate-pulse rounded-xl bg-gray-100" />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
            </div>
        </div>
    );
}
