type Props = {
  title: string;
  subtitle: string;
};

function Header(props: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold">{props.title}</h1>

      <p className="text-muted-foreground">{props.subtitle}</p>
    </>
  );
}

export default Header;
