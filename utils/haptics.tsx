import * as Haptics from 'expo-haptics';

export const successHaptic = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

export const errorHaptic = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
