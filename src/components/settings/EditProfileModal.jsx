import { useState } from "react";
import { X, Loader2 } from "lucide-react";

import Input from "../ui/Input";
import Label from "../ui/Label";
import Button from "../ui/Button";

function EditProfileModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    full_name: initial.full_name ?? "",
    student_id: initial.student_id ?? "",
    major: initial.major ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const setField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ?? err?.message ?? "Failed to save profile."
      );
      setSaving(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Edit Profile</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={form.full_name}
              onChange={setField("full_name")}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="student_id">Student ID (NIM)</Label>
            <Input
              id="student_id"
              value={form.student_id}
              onChange={setField("student_id")}
              placeholder="e.g. 18223096"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="major">Major</Label>
            <Input
              id="major"
              value={form.major}
              onChange={setField("major")}
              placeholder="e.g. Information Systems - ITB"
            />
          </div>

          {errorMessage && (
            <p role="alert" className="text-xs font-medium text-rose-600">
              {errorMessage}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={saving}>
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
