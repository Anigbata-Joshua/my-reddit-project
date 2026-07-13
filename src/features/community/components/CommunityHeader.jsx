export default function CommunityHeader({ communityName, community, hasJoined, user, onJoin, onLeave }) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h1 className="m-0 text-2xl font-semibold text-gray-900">r/{communityName}</h1>

        {user && (
          hasJoined ? (
            <button
              onClick={onLeave}
              className="cursor-pointer rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              Leave
            </button>
          ) : (
            <button
              onClick={onJoin}
              className="cursor-pointer rounded-full bg-orange-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-orange-700"
            >
              Join
            </button>
          )
        )}
      </div>

      {community?.description && <p className="mt-2 text-sm text-gray-700">{community.description}</p>}
      <p className="mt-2 text-xs text-gray-500">
        {community?.memberCount === 1 ? '1 member' : `${community?.memberCount?.toLocaleString() || 0} members`}
      </p>
    </div>
  );
}
