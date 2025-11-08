# Benaissa Mohamed - Portfolio

A modern, animated Single Page Application (SPA) portfolio showcasing my projects, skills, and experience. Features a special Web 3D section for interactive 3D project demonstrations.

## Features

- 🎨 **Modern SPA Design** - Smooth scrolling navigation with animated sections
- 🎭 **Advanced Animations** - Powered by Framer Motion with staggered animations and transitions
- 🌙 **Dark Mode** - Toggle between light and dark themes with smooth transitions
- ✨ **Particle Background** - Interactive particle effects that respond to mouse interactions
- 🎯 **Web 3D Section** - Interactive 3D project viewer with animated models (Box, Sphere, Torus, Octahedron)
- 🔍 **Project Filtering** - Search and filter projects by technology stack
- 📸 **Project Overlays** - Hover effects with project preview overlays
- 👤 **Admin Panel** - Upload and manage projects (password protected)
- ⏳ **Loading Screen** - Beautiful animated loading screen on initial load
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🚀 **Vercel Ready** - Pre-configured for Vercel deployment

## Sections

- **About** - Profile, education, and experience
- **Skills** - Technical and soft skills
- **Projects** - Showcase of selected projects
- **Web 3D** - Interactive 3D project demonstrations
- **Contact** - Get in touch information

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment.

## Admin Panel

To access the admin panel:
1. Click the "Admin" button in the navigation
2. Enter the password: `admin123`
3. You can then:
   - Add/edit/delete regular projects
   - Add/edit/delete 3D projects
   - Upload your profile image

**Note:** Change the admin password in `src/components/Navigation.jsx` for security.

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. The `vercel.json` file is already configured for SPA routing

Or deploy using Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics library
- **Three.js** - 3D library
- **@react-three/drei** - Useful helpers for React Three Fiber

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Web3D.jsx
│   │   ├── Contact.jsx
│   │   ├── Navigation.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Customization

### Colors

Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... */
}
```

### Content

- Update personal information in `src/components/About.jsx`
- Modify skills in `src/components/Skills.jsx`
- Add default projects in `src/components/Projects.jsx`

## License

This project is open source and available under the MIT License.

## Contact

**Benaissa Mohamed**
- Email: mohamedbenaissa735@gmail.com
- Phone: +213 0796352552
- GitHub: [github.com/MohamedBenaissamaker](https://github.com/MohamedBenaissamaker)
- Location: Sétif, Algeria

