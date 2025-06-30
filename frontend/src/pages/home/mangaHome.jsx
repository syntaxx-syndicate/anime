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
  Card,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Carousel,
  Spinner,
} from "@material-tailwind/react";
import {
  MagnifyingGlass,
  List as ListIcon,
  X,
  Star,
  Clock,
  Fire,
  BookOpen,
} from "@phosphor-icons/react";

const MangaHome = () => {
  const [openNav, setOpenNav] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");
  const [featuredManga, setFeaturedManga] = useState([]);
  const [mangaLists, setMangaLists] = useState({
    trending: [],
    latest: [],
    popular: [],
  });
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState({
    featured: true,
    manga: true,
    news: true,
  });
  const [error, setError] = useState({
    featured: null,
    manga: null,
    news: null,
  });

  useEffect(() => {
    const fetchFeaturedManga = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/top/manga?limit=3"
        );
        const data = await response.json();

        if (data.data) {
          const formattedData = data.data.map((manga) => ({
            id: manga.mal_id,
            title: manga.title,
            image:
              manga.images.jpg.large_image_url || "/api/placeholder/800/400",
            description:
              manga.synopsis?.substring(0, 120) + "..." ||
              "No description available",
            genre: manga.genres?.map((g) => g.name).join(", ") || "Unknown",
            rating: manga.score / 2 || 4.5,
          }));
          setFeaturedManga(formattedData);
        }
      } catch (err) {
        console.error("Error fetching featured manga:", err);
        setError((prev) => ({
          ...prev,
          featured: "Failed to load featured manga",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, featured: false }));
      }
    };

    const fetchMangaLists = async () => {
      try {
        const [trendingRes, popularRes] = await Promise.all([
          fetch(
            "https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=5"
          ),
          fetch("https://api.jikan.moe/v4/top/manga?filter=favorite&limit=5"),
        ]);

        const trendingData = await trendingRes.json();
        const popularData = await popularRes.json();

        setTimeout(async () => {
          try {
            const latestRes = await fetch(
              "https://api.jikan.moe/v4/manga?order_by=start_date&sort=desc&limit=5"
            );
            const latestData = await latestRes.json();

            if (latestData.data) {
              const formattedLatest = latestData.data.map((manga) => ({
                id: manga.mal_id,
                title: manga.title,
                image: manga.images.jpg.image_url || "/api/placeholder/200/300",
                chapters: manga.chapters || "??",
                updated: getRandomTimeAgo(),
              }));

              setMangaLists((prev) => ({
                ...prev,
                latest: formattedLatest,
              }));
            }
          } catch (err) {
            console.error("Error fetching latest manga:", err);
          }
        }, 1000);

        if (trendingData.data && popularData.data) {
          setMangaLists({
            trending: trendingData.data.map((manga) => ({
              id: manga.mal_id,
              title: manga.title,
              image: manga.images.jpg.image_url || "/api/placeholder/200/300",
              chapters: manga.chapters || "??",
              rating: manga.score / 2 || 4.5,
            })),
            latest: [], 
            popular: popularData.data.map((manga) => ({
              id: manga.mal_id,
              title: manga.title,
              image: manga.images.jpg.image_url || "/api/placeholder/200/300",
              chapters: manga.chapters || "??",
              rating: manga.score / 2 || 4.5,
            })),
          });
        }
      } catch (err) {
        console.error("Error fetching manga lists:", err);
        setError((prev) => ({ ...prev, manga: "Failed to load manga lists" }));
      } finally {
        setLoading((prev) => ({ ...prev, manga: false }));
      }
    };

    const fetchNewsItems = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/anime/news");
        const data = await response.json();

        if (data.data) {
          const formattedNews = data.data.slice(0, 3).map((news) => ({
            id: news.mal_id,
            title: news.title,
            date: new Date(news.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            image: news.images?.jpg?.image_url || "/api/placeholder/120/80",
            summary: news.excerpt || "No summary available",
          }));
          setNewsItems(formattedNews);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError((prev) => ({ ...prev, news: "Failed to load news items" }));

        // Fallback to static news if API fails
        setNewsItems([
          {
            id: 1,
            title: "Jujutsu Kaisen Manga Enters Final Arc",
            date: "April 2, 2025",
            image: "/api/placeholder/120/80",
            summary:
              "Creator Gege Akutami announces the popular series is entering its final story arc.",
          },
          {
            id: 2,
            title: "One Piece Live-Action Season 2 Begins Filming",
            date: "March 28, 2025",
            image: "/api/placeholder/120/80",
            summary:
              "Netflix confirms production has started on the second season of the hit adaptation.",
          },
          {
            id: 3,
            title: "Chainsaw Man Part 3 Announced for Fall 2025",
            date: "March 25, 2025",
            image: "/api/placeholder/120/80",
            summary:
              "Tatsuki Fujimoto reveals the next part of his popular manga will begin later this year.",
          },
        ]);
      } finally {
        setLoading((prev) => ({ ...prev, news: false }));
      }
    };

    fetchFeaturedManga();
    fetchMangaLists();
    fetchNewsItems();
  }, []);

  // Helper function to generate random time periods for "updated X time ago"
  const getRandomTimeAgo = () => {
    const times = [
      "1 hour ago",
      "3 hours ago",
      "6 hours ago",
      "12 hours ago",
      "1 day ago",
      "2 days ago",
      "3 days ago",
    ];
    return times[Math.floor(Math.random() * times.length)];
  };

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
    <div className="relative min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[600px]">
        {/* Hero Image */}
        <div className="absolute inset-0">
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
              className="mr-4 cursor-pointer py-1.5 text-xl font-bold italic"
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
              <Button
                variant="outlined"
                size="sm"
                color="white"
                className="ml-2"
              >
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

        {/* Hero Content */}
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <Typography
            variant="h1"
            className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            Discover Your Next Manga Obsession
          </Typography>
          <Typography className="mb-8 max-w-3xl text-lg opacity-80">
            Browse thousands of titles, keep track of your favorites, and read
            the latest chapters all in one place.
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-500">
              Browse Manga
            </Button>
            <Button size="lg" variant="outlined" color="white">
              View Popular
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Manga Carousel */}
        <div className="mb-16">
          <Typography
            variant="h2"
            className="mb-6 text-2xl font-bold text-white"
          >
            Featured This Week
          </Typography>

          {loading.featured ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner className="h-10 w-10 text-blue-500" />
            </div>
          ) : error.featured ? (
            <div className="flex h-64 items-center justify-center">
              <Typography className="text-red-400">{error.featured}</Typography>
            </div>
          ) : (
            <Carousel
              className="rounded-xl"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {featuredManga.map((manga) => (
                <div key={manga.id} className="relative h-96">
                  <img
                    src={manga.image}
                    alt={manga.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-left text-white">
                    <Typography
                      variant="h3"
                      className="mb-2 text-3xl font-bold"
                    >
                      {manga.title}
                    </Typography>
                    <Typography className="mb-4 max-w-lg text-sm">
                      {manga.description}
                    </Typography>
                    <div className="mb-4 flex items-center gap-4">
                      <span className="rounded-full bg-blue-500 px-3 py-1 text-xs">
                        {manga.genre}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star
                          className="h-4 w-4 text-yellow-500"
                          weight="fill"
                        />
                        {manga.rating}
                      </span>
                    </div>
                    <Button size="sm">Read Now</Button>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>

        {/* Manga Tabs */}
        <div className="mb-16">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabsHeader className="bg-gray-800">
              <Tab value="trending" className="text-white">
                <div className="flex items-center gap-2">
                  <Fire size={18} />
                  Trending
                </div>
              </Tab>
              <Tab value="latest" className="text-white">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  Latest Updates
                </div>
              </Tab>
              <Tab value="popular" className="text-white">
                <div className="flex items-center gap-2">
                  <Star size={18} />
                  Most Popular
                </div>
              </Tab>
            </TabsHeader>

            <TabsBody>
              {Object.keys(mangaLists).map((key) => (
                <TabPanel key={key} value={key} className="px-0">
                  {loading.manga ? (
                    <div className="flex h-64 items-center justify-center">
                      <Spinner className="h-10 w-10 text-blue-500" />
                    </div>
                  ) : error.manga ? (
                    <div className="flex h-64 items-center justify-center">
                      <Typography className="text-red-400">
                        {error.manga}
                      </Typography>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {mangaLists[key].map((manga) => (
                        <Card
                          key={manga.id}
                          className="overflow-hidden bg-gray-800 text-white"
                        >
                          <CardBody className="p-0">
                            <div className="relative h-64">
                              <img
                                src={manga.image}
                                alt={manga.title}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute top-2 right-2 rounded bg-blue-500 px-2 py-1 text-xs">
                                {manga.chapters} CH
                              </div>
                            </div>
                            <div className="p-4">
                              <Typography
                                variant="h5"
                                className="truncate font-medium"
                              >
                                {manga.title}
                              </Typography>
                              <div className="mt-2 flex items-center justify-between">
                                {key === "latest" ? (
                                  <Typography
                                    variant="small"
                                    className="flex items-center gap-1 text-gray-400"
                                  >
                                    <Clock size={14} />
                                    {manga.updated}
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="small"
                                    className="flex items-center gap-1 text-yellow-500"
                                  >
                                    <Star size={14} weight="fill" />
                                    {manga.rating}
                                  </Typography>
                                )}
                                <Button
                                  variant="text"
                                  size="sm"
                                  className="p-0"
                                >
                                  Read
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>

        {/* News & Updates Section */}
        <div className="mb-16">
          <Typography
            variant="h2"
            className="mb-6 text-2xl font-bold text-white"
          >
            Latest News & Updates
          </Typography>

          {loading.news ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner className="h-10 w-10 text-blue-500" />
            </div>
          ) : error.news ? (
            <div className="flex h-64 items-center justify-center">
              <Typography className="text-red-400">{error.news}</Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {newsItems.map((news) => (
                <Card key={news.id} className="bg-gray-800 text-white">
                  <CardBody>
                    <div className="flex gap-4">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="h-20 w-32 rounded object-cover"
                      />
                      <div>
                        <Typography variant="h6" className="mb-1 line-clamp-2">
                          {news.title}
                        </Typography>
                        <Typography
                          variant="small"
                          className="mb-2 text-gray-400"
                        >
                          {news.date}
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      variant="paragraph"
                      className="mt-3 line-clamp-3 text-sm text-gray-300"
                    >
                      {news.summary}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button variant="text" className="p-0">
                      Read Full Story
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="rounded-lg bg-gray-800 p-8 text-white">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <Typography variant="h3" className="mb-2 text-2xl font-bold">
                Stay Updated with KingManga
              </Typography>
              <Typography variant="paragraph" className="text-gray-300">
                Subscribe to our newsletter and never miss new manga releases,
                updates, and special offers.
              </Typography>
            </div>
            <div className="flex w-full flex-col gap-2 md:w-1/3 md:pl-6">
              <Input
                type="email"
                label="Your email address"
                className="border-white/50 text-white"
                labelProps={{
                  className: "text-white",
                }}
              />
              <Button size="sm" fullWidth>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <Typography variant="h5" className="mb-4 font-bold">
                kiNgMAnga
              </Typography>
              <Typography variant="small" className="text-gray-400">
                Your ultimate destination for manga and anime content. Read,
                collect, and discover your next favorite series.
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-4 font-bold">
                Explore
              </Typography>
              <List className="p-0">
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Popular Manga
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Latest Updates
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  New Releases
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Genres
                </ListItem>
              </List>
            </div>
            <div>
              <Typography variant="h6" className="mb-4 font-bold">
                Community
              </Typography>
              <List className="p-0">
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Forums
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Events
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Discord
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Manga Awards
                </ListItem>
              </List>
            </div>
            <div>
              <Typography variant="h6" className="mb-4 font-bold">
                Legal
              </Typography>
              <List className="p-0">
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Terms of Service
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Privacy Policy
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  DMCA
                </ListItem>
                <ListItem className="py-1 text-gray-400 hover:text-white">
                  Contact Us
                </ListItem>
              </List>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500">
            <Typography variant="small">
              © 2025 kiNgMAnga. All rights reserved.
            </Typography>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MangaHome;
