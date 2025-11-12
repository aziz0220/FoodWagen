# 🍔 FoodWagen - Meal Discovery ApplicationThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern, pixel-perfect meal discovery web application built with Next.js 16, TypeScript, and custom CSS. Browse, create, edit, and delete meals from various restaurants with a beautiful, responsive UI.## Getting Started


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

- **Framework**: Next.js 16 (App Router)
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