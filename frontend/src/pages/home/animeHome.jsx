import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  Spinner,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import {
  MagnifyingGlass,
  List as ListIcon,
  X,
  ArrowCircleDown,
} from "@phosphor-icons/react";

const AnimeDetails = ({ anime, open, handleOpen }) => {
  if (!anime) return null;

  return (
    <Dialog size="xl" open={open} handler={handleOpen}>
      <DialogHeader className="justify-between">
        <Typography variant="h4">
          {anime.title_english || anime.title}
        </Typography>
        <Chip value={`Rating: ${anime.score}`} className="bg-blue-500" />
      </DialogHeader>
      <DialogBody divider className="h-[32rem] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column - Image */}
          <div>
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="w-full rounded-lg"
            />
            <div className="mt-4 space-y-2">
              <Typography variant="h6">Information</Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex justify-between"
              >
                <span>Episodes:</span> <span>{anime.episodes || "TBA"}</span>
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex justify-between"
              >
                <span>Status:</span> <span>{anime.status}</span>
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex justify-between"
              >
                <span>Aired:</span> <span>{anime.aired.string}</span>
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex justify-between"
              >
                <span>Rating:</span> <span>{anime.rating}</span>
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex justify-between"
              >
                <span>Rank:</span> <span>#{anime.rank}</span>
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="flex justify-between"
              >
                <span>Popularity:</span> <span>#{anime.popularity}</span>
              </Typography>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Synopsis
              </Typography>
              <Typography color="gray">{anime.synopsis}</Typography>
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Genres
              </Typography>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Chip
                    key={genre.mal_id}
                    value={genre.name}
                    variant="outlined"
                  />
                ))}
              </div>
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Studios
              </Typography>
              <div className="flex flex-wrap gap-2">
                {anime.studios.map((studio) => (
                  <Chip
                    key={studio.mal_id}
                    value={studio.name}
                    variant="outlined"
                  />
                ))}
              </div>
            </div>

            {anime.trailer && anime.trailer.embed_url && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Trailer
                </Typography>
                <div className="aspect-video">
                  <iframe
                    src={anime.trailer.embed_url}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

const AnimeContent = () => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("airing");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setAnimeData([]);
    setPage(1);
    setHasMore(true);
    fetchAnimeData(activeTab, 1, true);
  }, [activeTab]);

  const fetchAnimeData = async (category, pageNum, isNewCategory = false) => {
    isNewCategory ? setLoading(true) : setLoadingMore(true);
    try {
      const endpoint =
        category === "top"
          ? "top/anime"
          : category === "airing"
          ? "seasons/now"
          : "seasons/upcoming";

      const response = await fetch(
        `https://api.jikan.moe/v4/${endpoint}?page=${pageNum}`
      );
      const result = await response.json();

      setHasMore(result.pagination?.has_next_page ?? false);

      const newData = result.data || [];
      setAnimeData((prevData) => {
        if (isNewCategory) return newData;

        const existingIds = new Set(prevData.map((anime) => anime.mal_id));

        const uniqueNewData = newData.filter(
          (anime) => !existingIds.has(anime.mal_id)
        );

        return [...prevData, ...uniqueNewData];
      });
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
    isNewCategory ? setLoading(false) : setLoadingMore(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAnimeData(activeTab, nextPage);
  };

  const handleOpen = (anime = null) => {
    setSelectedAnime(anime);
    setOpen(!open);
  };

  return (
    <div className="px-4 py-4 lg:px-8">
      <Tabs value={activeTab} className="mb-2 bg-transparent">
        <TabsHeader className="bg-transparent">
          <Tab value="top" onClick={() => setActiveTab("top")}>
            Top Rated
          </Tab>
          <Tab value="airing" onClick={() => setActiveTab("airing")}>
            Airing
          </Tab>
          <Tab value="upcoming" onClick={() => setActiveTab("upcoming")}>
            Upcoming
          </Tab>
        </TabsHeader>
      </Tabs>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {animeData.map((anime) => (
              <Card
                key={`${anime.mal_id}-${activeTab}`}
                className="overflow-hidden bg-transparent"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="relative h-64"
                >
                  <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title_english || anime.title}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography className="text-center">
                    {anime.title_english || anime.title}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    size="sm"
                    fullWidth={true}
                    onClick={() => handleOpen(anime)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={loadMore}
                disabled={loadingMore}
                className="flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Details Modal */}
      <AnimeDetails anime={selectedAnime} open={open} handleOpen={handleOpen} />
    </div>
  );
};

const AnimeHome = () => {
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
        <Typography as="a" href="/manga" variant="small">
          <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-white hover:bg-white/10 hover:text-white">
            Manga
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
          src="/w6.jpg"
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
            href="/anime"
            className="mr-4 cursor-pointer py-1.5 text-xl font-bold italic text-orange-500"
          >
            kiNgANime
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
      <span className=" fixed bottom-20 animate-bounce flex rounded-full text-white text-xl ml-[30%] sm:ml-[35%] md:ml-[35%] lg:ml-[40%] xl:ml-[45%]">
        <ArrowCircleDown size={32} />
        <span className="mr-3 ml-2"> Scroll Down </span>
      </span>
      <div className="absolute z-0 mt-[80vh] bg-white">
        <AnimeContent />
      </div>
    </div>
  );
};

export default AnimeHome;
