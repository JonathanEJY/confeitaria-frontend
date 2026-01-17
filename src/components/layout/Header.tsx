import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
  title: string;
  subtitle: string;
};

function Header(props: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold">{props.title}</h1>

      <p className="text-muted-foreground">{props.subtitle}</p>

      <Link to={"/dashboard"}>
        <Button className="mb-4">Página inicial</Button>
      </Link>
    </>
  );
}

export default Header;
