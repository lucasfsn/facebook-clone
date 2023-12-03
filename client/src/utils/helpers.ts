export const getMonths = () => {
  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  return months;
};

export const getYears = () =>
  Array.from(new Array(119), (_, i) => new Date().getFullYear() - i);

export const getDays = (year: number, month: number) => {
  return Array.from(
    new Array(new Date(year, month, 0).getDate()),
    (_, i) => i + 1,
  );
};

export const imageToBlob = (dataURI: string): Blob => {
  const [header, data] = dataURI.split(",");

  const byteString = header.includes("base64") ? atob(data) : unescape(data);

  const mimeString = header.split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length).map((_, i) =>
    byteString.charCodeAt(i),
  );

  return new Blob([ia], { type: mimeString });
};
