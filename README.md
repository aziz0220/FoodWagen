# 🍔 FoodWagen - Meal Discovery ApplicationThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern, pixel-perfect meal discovery web application built with Next.js 14, TypeScript, and custom CSS. Browse, create, edit, and delete meals from various restaurants with a beautiful, responsive UI.## Getting Started



## 🌟 FeaturesFirst, run the development server:



- ✅ **CRUD Operations**: Create, Read, Update, and Delete meals```bash

- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobilenpm run dev

- ✅ **Custom CSS**: No Tailwind - pure custom CSS with `food-` prefix# or

- ✅ **Type Safety**: Full TypeScript support with strict modeyarn dev

- ✅ **State Management**: Zustand for global state# or

- ✅ **API Integration**: React Query for efficient data fetchingpnpm dev

- ✅ **Form Validation**: Client-side validation with error messages# or

- ✅ **Modal System**: Three modals with exact Figma specificationsbun dev

- ✅ **Tested**: 44 passing tests with Jest and React Testing Library```

- ✅ **Accessible**: Semantic HTML and ARIA labels

- ✅ **Modular**: Reusable components with clean separationOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## 🎨 Design SystemYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



### Modals (Pixel-Perfect)This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Add Modal**: 934×840px, 6 fields without labels, "Add " button (with space)

- **Edit Modal**: 934×1132px, 6 fields WITH labels above, "Save" button, pre-filled styling## Learn More

- **Delete Modal**: 712×325px, warning message, "Yes"/"Cancel" buttons (orange, not red)

To learn more about Next.js, take a look at the following resources:

### Components

- **MealCard**: 357×463px with food image, rating, restaurant info, status badge- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **Button**: Primary/secondary variants with hover animations- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Input**: With optional label and error message support

- **Dropdown**: Restaurant status selectionYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- **Badge**: Status indicator (Open Now/Closed)

## Deploy on Vercel

## 🚀 Getting Started

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Prerequisites

- Node.js 18+ and npmCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aziz0220/FoodWagenChallenge.git
   cd FoodWagenChallenge/foodwagen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Test Results
```
Test Suites: 3 passed, 3 total
Tests:       44 passed, 44 total
```

## 📝 API Integration

### Data Structure

```typescript
interface Meal {
  id?: string;
  food_name: string;           // REQUIRED
  food_rating: number;          // REQUIRED (0-5)
  food_image: string;           // REQUIRED (URL)
  restaurant_name: string;      // REQUIRED
  restaurant_logo: string;      // REQUIRED (URL)
  restaurant_status: "Open Now" | "Closed"; // REQUIRED
}
```

## 🔧 Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Custom CSS (NO Tailwind)
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Testing**: Jest + React Testing Library
- **Fonts**: Open Sans + Source Sans Pro
- **Deployment**: Vercel

## 👤 Author

**Aziz Ben Amor**
- Email: benamoraziz0220@gmail.com
- GitHub: [@aziz0220](https://github.com/aziz0220)

---

**Built with ❤️ for the A2SV challenge**
