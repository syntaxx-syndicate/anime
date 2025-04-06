# SyntaxAnime - Anime & Manga Platform

## Overview

SyntaxAnime is a comprehensive anime and manga platform built to provide users with a seamless experience for discovering, tracking, and enjoying their favorite anime and manga content. The platform features a modern UI with responsive design, robust search capabilities, and user collection management.

**Note: This project is currently under active development.**

## Tech Stack

- **Frontend**:
  - React.js (v18)
  - Material-Tailwind for UI components
  - TailwindCSS for styling
  - Phosphor Icons for iconography
  - React Router for navigation


- **APIs**:
  - Jikan API (MyAnimeList data)
  - Custom scraping services for latest chapters
  - Authentication service

## Features (In Progress)

- [x] Responsive design for all device sizes
- [x] Modern UI with dark theme
- [x] Featured manga carousel
- [x] Trending/Popular/Latest manga sections
- [x] News & updates section
- [ ] User authentication (login/signup)
- [ ] User profiles with manga collections
- [ ] Manga reader functionality
- [ ] Favorites and bookmarking
- [ ] Chapter notifications
- [ ] Advanced search and filtering
- [ ] User comments and ratings

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   cd anime
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
SyntaxAnime/
├── frontend/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Application pages
│       ├── context/        # React context providers
│       ├── hooks/          # Custom React hooks
│       ├── services/       # API service integrations
│       ├── utils/          # Utility functions
│       └── App.js          # Main application component
└── README.md               # Project documentation
```

## API Integration

SyntaxAnime integrates with the following APIs:

1. **Jikan API**: Used to fetch anime and manga data from MyAnimeList
   - Top manga listings
   - Manga details and information
   - User reviews and recommendations

2. **Custom Scraping Services** (In Development):
   - Latest chapter updates
   - Release schedules
   - Source specific data

## Roadmap

### Phase 1 (Current)
- Complete core UI components
- Implement basic API integrations
- Set up authentication foundation

### Phase 2
- User account functionality
- Manga reader implementation
- Collections and tracking

### Phase 3
- Community features (comments, forums)
- Notifications system
- Advanced search and discovery

### Phase 4
- Offline reading
- Personalized recommendations

## Contributing

As this project is still in development, we're not currently accepting public contributions. However, feel free to fork the repository and experiment with your own changes!


## Acknowledgments

- [Material-Tailwind](https://material-tailwind.com/) for the UI components
- [Jikan API](https://jikan.moe/) for providing MyAnimeList data
- [Phosphor Icons](https://phosphoricons.com/) for the beautiful iconography

---

© 2025 SyntaxAnime. All rights reserved.