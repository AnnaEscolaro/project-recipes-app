export default function getDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  let month: string | number = now.getMonth() + 1;
  let day: string | number = now.getDate();
  let hour: string | number = now.getHours();
  let minute: string | number = now.getMinutes();
  let second: string | number = now.getSeconds();

  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  if (day.toString().length === 1) {
    day = `0${day}`;
  }
  if (hour.toString().length === 1) {
    hour = `0${hour}`;
  }
  if (minute.toString().length === 1) {
    minute = `0${minute}`;
  }
  if (second.toString().length === 1) {
    second = `0${second}`;
  }
  const dateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  return dateTime;
}
