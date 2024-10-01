import {
  Input,
  Button,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

function AnimeHome() {
  return (
    <>
      <div className="h-full -z-10 ">
        <img src="/" className="h-[500px] w-full"></img>
      </div>
      <header className="absolute top-0 w-full">
        <div className="flex justify-between md:items-center gap-y-4 flex-col md:flex-row">
            <div> king anime </div>
          <List>
            <Typography className="flex items-center gap-2">
              <ListItem className="w-[70%] text-center">Home</ListItem>
              <ListItem className="w-[100%] text-center"> Catalog</ListItem>
              <ListItem className="w-[70%] text-center">News</ListItem>
              <ListItem className="w-[130%] text-center">Collections</ListItem>
            </Typography>
          </List>
          <div className="flex gap-4">
            <div className="lg:w-96">
              <Input
                label="Search"
                icon={<MagnifyingGlass className="h-5 w-5" color="white" />}
                color="white"
                className=""
              />
            </div>
            <Button variant="outlined" color="white">
              Login
            </Button>
            <Button> Get Started </Button>
          </div>
        </div>
      </header>{" "}
      <hr />
    </>
  );
}

export default AnimeHome;
