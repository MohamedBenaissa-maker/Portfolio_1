# Troubleshooting Guide

If the portfolio is not working, follow these steps:

## 1. Install Dependencies
```bash
npm install
```

## 2. Check for Errors
Run the development server:
```bash
npm run dev
```

Check the browser console for any errors.

## 3. Common Issues

### Particles Not Loading
- The particle background might fail to load on some browsers
- This is handled gracefully - the site will work without particles
- Check browser console for particle-related errors

### 3D Models Not Displaying
- Ensure WebGL is enabled in your browser
- Check browser console for Three.js errors
- Some older browsers may not support WebGL

### Dark Mode Not Working
- Clear browser localStorage: `localStorage.clear()`
- Refresh the page

### Admin Panel Not Opening
- Default password is: `admin123`
- Check browser console for JavaScript errors

## 4. Build for Production
```bash
npm run build
```

## 5. Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may have particle issues)
- Older browsers: May not support all features

## 6. If Still Not Working
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npm run dev`

