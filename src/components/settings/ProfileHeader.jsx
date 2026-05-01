import { Pencil, Camera } from "lucide-react";

import { profile } from "../../lib/mockData";

function ProfileHeader() {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-amber-200" />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-900 text-white"
          >
            <Camera size={12} />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
          <p className="mt-1 text-xs text-slate-500">
            Student ID (NIM): {profile.studentId}
          </p>
          <p className="text-xs text-slate-500">Major: {profile.major}</p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        <Pencil size={14} />
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileHeader;
