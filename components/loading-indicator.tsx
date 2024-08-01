import spinner from "@/public/spinner.svg";
import Image from "next/image";

export default function LoadingIndicator() {
  return <Image
    width={100}
    priority
    src={spinner}
    alt="loading spinner"
  />
}
