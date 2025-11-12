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

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FoodWagenChallenge.git
   cd FoodWagenChallenge/foodwagen
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow existing code style and conventions
   - Add tests for new features
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm test
   npm run build
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   **Commit Convention:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with details
   - Wait for CI checks to pass
   - Respond to review feedback

### PR Guidelines

- ✅ All tests must pass
- ✅ Code must pass linting
- ✅ Build must succeed
- ✅ Describe what your PR does
- ✅ Link related issues
- ✅ Keep PRs focused and atomic

### Development Workflow

Our GitHub Actions workflow automatically runs on PRs:
- **Lint & Type Check** - Ensures code quality
- **Tests** - Runs all test suites
- **Build** - Verifies production build
- **Security Scan** - Checks for vulnerabilities

### Code Style

- Use TypeScript with strict mode
- Follow existing naming conventions
- Use `food-*` prefix for CSS classes
- Write meaningful comments
- Keep components small and focused
- Use proper TypeScript types (no `any`)

### Need Help?

- 📖 Check existing issues and PRs
- 💬 Ask questions in issue comments
- 📧 Contact: benamoraziz0220@gmail.com

## 👤 Author

**Aziz Ben Amor**
- Email: benamoraziz0220@gmail.com
- GitHub: [@aziz0220](https://github.com/aziz0220)

---