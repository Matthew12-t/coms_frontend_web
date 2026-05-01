import ProfileHeader from "../components/settings/ProfileHeader";
import SystemPreferences from "../components/settings/SystemPreferences";
import ApplicationSettings from "../components/settings/ApplicationSettings";

function Settings() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SystemPreferences />
        <ApplicationSettings />
      </div>
    </div>
  );
}

export default Settings;
