import { useState } from "react";
import { Bell } from "lucide-react";

import Button from "../ui/Button";
import { subscribeNotification } from "../../services/notificationService";
import { useAuth } from "../../hooks/useAuth";
import { useNotificationPermission } from "../../hooks/useNotificationPermission";

const DEFAULT_THRESHOLD = 25;

const NotifyMeButton = ({ canteenId, canteenName }) => {
  const { user } = useAuth();
  const { notify } = useNotificationPermission();
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleClick = async () => {
    if (!user) {
      window.alert("Please sign in to receive alerts.");
      return;
    }
    setSubmitting(true);
    try {
      await subscribeNotification(canteenId, DEFAULT_THRESHOLD);
      setSubscribed(true);
      notify("You're subscribed", {
        body: `We'll alert you when ${canteenName} drops below ${DEFAULT_THRESHOLD} people.`,
      });
    } catch (err) {
      window.alert(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={submitting || subscribed}>
      <Bell size={14} />
      {subscribed ? "Subscribed" : "Notify me when quieter"}
    </Button>
  );
};

export default NotifyMeButton;
