export const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${
      (d.getMonth() + 1).toString().padStart(2, '0')
    }/${d.getFullYear().toString().slice(-2)}`;
};

// export const formatDateTime = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleString('en-US',{
//     timeZone: 'America/New_York',
//     day: '2-digit',
//     month: "2-digit",
//     year: "2-digit"
//   });
// };