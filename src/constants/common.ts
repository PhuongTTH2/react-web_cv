export const monthDiff = (date1: any, date2: any) => {
  let diff = Math.floor(date1.getTime() - date2.getTime());
  let day = 1000 * 60 * 60 * 24;
  let days = Math.floor(diff / day);
  let months = Math.floor(days / 31);
  let years = Math.floor(months / 12);

  let message = days + " days ";
  if (months !== 0) {
    message += months + " months ";
  }
  if (years !== 0) {
    message += years + " years ago";
  }

  return message;
};

export const timeDiff = (date1: any, date2: any) => {
  let diff = Math.floor(date1.getTime() - date2.getTime());
  let day = 1000 * 60 * 60 * 24;
  let minute = Math.floor(diff / (1000 * 60));
  if (minute === 0) {
    return "Just now";
  }
  if (minute < 60) {
    return minute + " mins ago";
  }

  let hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return hours + " hours ago";
  }

  let days = Math.floor(diff / day);

  let months = Math.floor(days / 31);
  let years = Math.floor(months / 12);

  if (days < 31) {
    return days + " days ago";
  }
  if (months !== 0 && months <= 12) {
    return months + " months ago";
  }
  if (years !== 0) {
    return years + " years ago";
  }
};
