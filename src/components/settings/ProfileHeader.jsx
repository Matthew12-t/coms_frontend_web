import { useState, useEffect } from "react";
import { Pencil, Camera, User } from "lucide-react";

import { fetchProfile, updateProfile } from "../../services/profileService";
import EditProfileModal from "./EditProfileModal";

function ProfileHeader() {
  const [profile, setProfile] = useState({ full_name: null, student_id: null, major: null });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => {});
  }, []);

  const handleSave = async (form) => {
    const updated = await updateProfile(form);
    setProfile(updated);
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-amber-100 text-amber-500">
              <User size={36} />
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-900 text-white"
            >
              <Camera size={12} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {profile.full_name ?? "-"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Student ID (NIM): {profile.student_id ?? "-"}
            </p>
            <p className="text-xs text-slate-500">
              Major: {profile.major ?? "-"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Pencil size={14} />
          Edit Profile
        </button>
      </div>

      {editing && (
        <EditProfileModal
          initial={profile}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}

export default ProfileHeader;
