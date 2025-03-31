import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
} from "@material-tailwind/react";
import { MagnifyingGlass, List as ListIcon, X } from "@phosphor-icons/react";

const MangaHome = () => {
  const [openNav, setOpenNav] = useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    });
  }, []);

  const navList = (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="div"
        variant="small"
        className="flex items-center gap-2 px-1"
      >
        <Typography as="a" href="/anime" variant="small" color="white">
          <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-white hover:bg-white/10 hover:text-white">
            Anime
          </ListItem>
        </Typography>
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-white hover:bg-white/10 hover:text-white">
          Favourites
        </ListItem>
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-white hover:bg-white/10 hover:text-white">
          News
        </ListItem>
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-white hover:bg-white/10 hover:text-white">
          Downloads
        </ListItem>
      </Typography>
    </List>
  );

  return (
    <div className="relative min-h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/w3.webp"
          alt="Anime Hero"
          className="h-full w-full object-cover brightness-50"
        />
      </div>

      {/* Navbar */}
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none border-none bg-transparent px-4 py-2 lg:px-8 lg:py-4"
        shadow={false}
      >
        <div className="flex items-center justify-between text-white">
          {/* Logo */}
          <Typography
            as="a"
            href="/manga"
            className="mr-4 cursor-pointer py-1.5 text-xl font-bold italic "
          >
            kiNgMAnga
          </Typography>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">{navList}</div>

          {/* Search and Auth Buttons */}
          <div className="hidden gap-2 lg:flex lg:items-center">
            <div className="w-72">
              <Input
                type="search"
                label="Search anime..."
                className="border-white/50 text-white"
                icon={<MagnifyingGlass className="h-5 w-5" />}
                labelProps={{
                  className: "text-white",
                }}
                containerProps={{
                  className: "min-w-[100px]",
                }}
              />
            </div>
            <Button variant="outlined" size="sm" color="white" className="ml-2">
              Login
            </Button>
            <Button size="sm" className="ml-2">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            variant="text"
            color="white"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <X className="h-6 w-6" />
            ) : (
              <ListIcon className="h-6 w-6" />
            )}
          </IconButton>
        </div>

        {/* Mobile Menu */}
        <Collapse open={openNav}>
          <div className="lg:hidden">
            {navList}
            <div className="flex w-full flex-col gap-2">
              <div className="w-full">
                <Input
                  type="search"
                  label="Search anime..."
                  className="border-white/50 text-white"
                  icon={<MagnifyingGlass className="h-5 w-5" />}
                  labelProps={{
                    className: "text-white",
                  }}
                />
              </div>
              <Button variant="outlined" size="sm" color="white" fullWidth>
                Login
              </Button>
              <Button size="sm" fullWidth className="mb-2">
                Get Started
              </Button>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MangaHome;
