export default function convertFaceBookToMessengerLink(link: string) {
  const messenger = "https://m.me/" + link.split(".com/")[1].split("/?")[0];
  return messenger;
}
