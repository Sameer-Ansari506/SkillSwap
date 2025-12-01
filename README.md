# SkillSwap Frontend

Modern, vibrant React frontend for SkillSwap - a peer-to-peer skill exchange platform.

## Tech Stack

- **React 18** with hooks
- **Redux Toolkit** for state management
- **React Router v6** for routing
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Socket.io-client** for real-time chat
- **Axios** for API calls
- **React Hook Form** + **Yup** for form validation

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API client functions
│   ├── app/              # Redux store setup
│   ├── components/       # Reusable UI components
│   │   ├── forms/        # Form components (SkillsManager, etc.)
│   │   ├── layout/       # Layout components (Header, Footer, Sidebar)
│   │   └── ui/           # UI primitives (Button, Input, Modal, etc.)
│   ├── features/         # Feature-based modules
│   │   ├── auth/         # Login, Register, authSlice
│   │   ├── discover/     # User discovery
│   │   ├── requests/     # Swap requests
│   │   ├── bookings/     # Booking management
│   │   ├── chat/         # Real-time chat
│   │   └── users/        # Profile, EditProfile
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (Landing, Dashboard, etc.)
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env` file in the `frontend/` directory:
   ```env
   # For local development
   VITE_API_URL=http://localhost:4000
   VITE_CLIENT_ID=skillswap-dev
   
   # For production (after deploying backend)
   # VITE_API_URL=https://your-backend.vercel.app
   # VITE_CLIENT_ID=skillswap-production
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Features

### 🎨 Modern, Vibrant UI
- Gradient backgrounds and animated elements
- Glassmorphism effects
- Smooth transitions and hover effects
- Responsive design for all screen sizes

### 🔐 Authentication
- Email/password registration and login
- JWT-based authentication
- Protected routes
- Persistent login with localStorage

### 👥 User Discovery
- Browse users by skills
- Filter by skills to teach/learn
- View user profiles and ratings

### 🤝 Skill Exchange
- Send swap requests to other users
- Accept/decline incoming requests
- View request status in dashboard

### 📅 Booking Management
- Schedule skill exchange sessions
- View upcoming and past bookings
- Booking confirmation flow

### 💬 Real-time Chat
- Chat with connected users
- Real-time message delivery via Socket.io
- Message history

### ⭐ Reviews & Ratings
- Rate and review completed sessions
- View user ratings and feedback

### ✨ Skills Management
- Add skills to teach and learn during signup
- Edit skills in profile
- Skill levels (Beginner, Intermediate, Advanced, Expert)

## Deployment to Vercel

### 1. Create GitHub Repository

```bash
# In the frontend folder
git remote add origin https://github.com/YOUR_USERNAME/skillswap-frontend.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your `skillswap-frontend` repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_API_URL` = `https://your-backend.vercel.app`
   - `VITE_CLIENT_ID` = `skillswap-production`
6. Click "Deploy"

### 3. Update Backend CORS

After deploying, update your backend's `CORS_ORIGIN` environment variable in Vercel to include your frontend URL:

```
CORS_ORIGIN=http://localhost:5173,https://your-frontend.vercel.app
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4000` or `https://api.example.com` |
| `VITE_CLIENT_ID` | Client identifier | `skillswap-dev` or `skillswap-production` |

## Key Components

### Layout Components
- **Header** - Navigation bar with gradient background
- **Footer** - Footer with links and info
- **Sidebar** - Dashboard navigation sidebar

### UI Components
- **Button** - Styled button with variants (primary, secondary, outline)
- **Input** - Form input with validation styling
- **Modal** - Reusable modal dialog
- **Rating** - Star rating display and input
- **Avatar** - User avatar with fallback

### Form Components
- **SkillsManager** - Add/remove skills with levels
- **SkillTag** - Display skill badges
- **SkillInput** - Skill search and selection

## Customization

### Colors

The app uses a vibrant color scheme defined in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* purple shades */ },
  secondary: { /* pink shades */ },
  accent: { /* blue/cyan shades */ },
  // ... more colors
}
```

### Animations

Custom animations are defined in `tailwind.config.js`:
- `fade-in` - Fade in animation
- `slide-up` - Slide up animation
- `bounce-slow` - Slow bounce animation

## Troubleshooting

### CORS Errors
- Ensure backend `CORS_ORIGIN` includes your frontend URL
- Check that `VITE_API_URL` in `.env` is correct

### Socket.io Connection Issues
- Socket.io won't work if backend is on Vercel (serverless limitation)
- For production, deploy backend to Railway, Render, or Heroku

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure all environment variables are set

## License

MIT
