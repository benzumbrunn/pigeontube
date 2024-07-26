import * as React from "react"

export default function Subtitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <h2 className="pt-8 font-semibold">
      {children}
    </h2>
  );
}