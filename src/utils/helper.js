export const getDate = (createdAt) => {
  const dateCalled = new Date(createdAt);

  return dateCalled.toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getTime = (createdAt) => {
  const time = new Date(createdAt);

  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getDurationOfCall = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const remainingSeconds = duration % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
