import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = '@notification';
const CHANNEL_ID = 'Reminder';

export const clearLocalNotification = () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );

const createNotification = () => ({
  title: 'Udaci Card Reminder',
  body: "Don't forget your Udaci Card!",
  android: {
    channelId: CHANNEL_ID,
    sticky: false,
    color: 'red',
  },
});

const createChannel = () => {
  return {
    name: 'Udaci Card Reminder',
    description: 'This is a daily reminder for your Udaci Card.',
    priority: 'high',
  };
};

const tomorrowNotification = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);
  return tomorrow;
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY).then((data) => {
    if (!!data) return;
    return Permissions.askAsync(Permissions.NOTIFICATIONS).then((response) => {
      const { status } = response;
      if (status === 'granted') {
        Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
          .then(() => {
            Notifications.cancelAllScheduledNotificationsAsync();
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrowNotification(),
              repeat: 'day',
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          })
      }
    });
  });
};
