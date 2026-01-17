# How to Add Images to the Gallery

## Steps to Add Gallery Images:

### 1. Upload Your Images
   - Upload your gallery images to the `src/assets/` folder
   - Name them clearly, e.g.: `gallery-1.jpg`, `gallery-2.jpg`, `gallery-reception.jpg`, etc.

### 2. Open `src/pages/Gallery.tsx`

### 3. Import Your Images at the Top
   Add import statements for each image:
   ```typescript
   import gallery1 from '../assets/gallery-1.jpg';
   import gallery2 from '../assets/gallery-2.jpg';
   import galleryReception from '../assets/gallery-reception.jpg';
   ```

### 4. Add Images to the Array
   Update the `galleryImages` array with your imported images:
   ```typescript
   const galleryImages = [
     {
       id: 1,
       title: 'Reception Area',
       description: 'Our modern reception area',
       image: gallery1, // Use your imported variable here
     },
     {
       id: 2,
       title: 'Waiting Area',
       description: 'Comfortable waiting space',
       image: gallery2, // Use your imported variable here
     },
     // Add more as needed...
   ];
   ```

### 5. Save and View
   The images will automatically appear in the gallery grid!

## Image Recommendations:
- **Format**: JPG, PNG, or WebP
- **Size**: Optimize images to 500KB or less for faster loading
- **Dimensions**: Any aspect ratio (the gallery uses square crop/display)
- **Quality**: 80-85% quality is good for web

## Current Gallery Setup:
The gallery displays images in a responsive grid:
- 1 column on mobile
- 2 columns on tablets
- 3 columns on desktop
- 4 columns on extra-large screens

Each image shows a hover effect with the title and description.

