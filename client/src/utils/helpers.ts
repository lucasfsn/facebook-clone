import axios from "axios";
import toast from "react-hot-toast";

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

export type ResponseError = {
  code: string;
  response?: { data: { message: string } };
};

export const handleError = (err: ResponseError) => {
  if (axios.isAxiosError(err)) {
    switch (err.code) {
      case "ERR_NETWORK":
        toast.error("An unexpected error occurred");
        break;
      default:
        toast.error(err.response?.data.message);
    }
  } else {
    toast.error("An unexpected error occurred");
  }
};

export async function loadImageFromUrl(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const base64Url = canvas.toDataURL();
        resolve(base64Url);
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };
    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };
  });
}
