import React from "react";
type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps) => (
  <header className="container p-5">
    <h1>{title}</h1>
  </header>
);

export default Header;
