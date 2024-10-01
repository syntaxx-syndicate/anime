
function HomePage() {
  return (
    <>
      <div className="diff aspect-[16/9]">
        <div className="diff-item-1">
          <img alt="daisy" src="/bg-bw.jpeg" />
          <div className="text-primary-content text-9xl font-black grid place-content-center">
            MANGA
          </div>
        </div>
        <div className="diff-item-2">
          <img alt="daisy" src="/colored.jpeg" />
          <div className="text-white text-9xl font-black grid place-content-center">
            ANIME
          </div>
        </div>
        <div className="diff-resizer"></div>
      </div>
    </>
  );
}

export default HomePage;
