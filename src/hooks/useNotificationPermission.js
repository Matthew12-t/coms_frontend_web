import { useEffect, useState } from "react";

export const useNotificationPermission = () => {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  useEffect(() => {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  const notify = (title, options) => {
    if (typeof Notification === "undefined") {
      window.alert(`${title}\n${options?.body ?? ""}`);
      return;
    }
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else {
      window.alert(`${title}\n${options?.body ?? ""}`);
    }
  };

  return { permission, notify };
};
