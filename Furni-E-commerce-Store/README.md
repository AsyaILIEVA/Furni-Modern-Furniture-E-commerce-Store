# Furni-Modern-Furniture-E-commerce-Store

## Steps
- [+] Install vite react project
- [+] Clean up the project
- [+] Add assets to public folder
- [+] Add html to App component
- [+] Add root element (or empty tag / fragment)
- [+] Convert html comments to jsx comments
- [+] Fix self closing tags
- [+] Rename class prop to className
- [+] Fix inline styles
- [+] Rename lower case attribute names to camelCase props
- [+] Add index.html header links and scripts
- [+] Extract components by section
- [+] Extract Service Card as reusable component


## 1. Project Overview

**Application Name:** Furni – Modern Furniture E-commerce Store  
**Application Category / Topic:** E-commerce / Furniture Catalog

**Main Purpose:** Furni is a React application for browsing and managing furniture listings. Visitors can explore products, categories, and product details, while registered users can create listings, manage their own products, comment on products, and use a shopping cart. The cart calculates a total but does not place or process orders.

## 2. User Access & Permissions

### Guest (Not Authenticated)
- **Available pages / routes:** Home (`/`), Shop (`/shop`), About (`/about`), Services (`/services`), Blog (`/blog`), Contact (`/contact`), product details (`/products/:productId`), category listings (`/shop/category/:category`), Login (`/login`), and Register (`/register`).
- **Public data shown:** Product cards, product details, categories, and product comments, alongside informational site content.
- Guests can browse products and see comments but must log in to submit comments or access protected pages. The catalog exposes an add-to-cart action, but the cart page itself is private.

### Authenticated User
- **Main sections / pages:** All public pages, plus Cart (`/cart`) and Create Product (`/products/create`). Login and Register become guest-only and redirect authenticated visitors home.
- **Details pages:** Individual product details, including comments and owner-specific controls.
- **Create / Edit / Delete:** A logged-in user can create a product, edit or delete products they own, post comments, and delete their own comments. The edit route is `/products/:productId/edit`. Ownership is checked using the signed-in user's ID. Users can also increase, decrease, and remove cart items.

## 3. Authentication & Session Handling

### Authentication Flow
1. On application load, `AuthProvider` initially sets `loading` to `true` and requests the current Supabase session using `supabase.auth.getSession()`.
2. It sets the shared `user` from the returned session (or `null`) and subscribes to `supabase.auth.onAuthStateChange()` for subsequent authentication changes.
3. Registration uses `supabase.auth.signUp()`. If a session is returned, the user navigates home; otherwise the UI displays a message about possible email confirmation. Login uses `signInWithPassword()` and navigates home on success.
4. The header signs the user out with `supabase.auth.signOut()` and navigates to `/`. The auth subscription updates shared user state.

### Session Persistence
`AuthContext` shares the current user and loading state throughout the React tree. Supabase Auth manages the underlying browser session persistence; the app restores it through `getSession()` after a refresh. The auth-state subscription is unsubscribed when `AuthProvider` unmounts. The cart, by contrast, is held only in React state and is not persisted across refreshes.

## 4. Routing Structure

### Route Guards Logic
`PrivateRoute` displays a loading message while authentication is being checked, redirects unauthenticated users to `/login`, and otherwise renders its children. `GuestRoute` similarly waits for authentication and redirects logged-in users from `/login` and `/register` to `/`.

### Main Routes
| Route | Page | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/shop` | Shop / product catalog | Public |
| `/about` | About | Public |
| `/services` | Services | Public |
| `/blog` | Blog | Public |
| `/contact` | Contact | Public |
| `/products/:productId` | Product details and comments | Public |
| `/shop/category/:category` | Category-specific products | Public |
| `/login` | Login | Guest only |
| `/register` | Registration | Guest only |
| `/cart` | Shopping cart | Authenticated |
| `/products/create` | Create product | Authenticated |
| `/products/:productId/edit` | Edit product | Authenticated; ownership checked in page |

### Nested & Parameterized Routes
`App.jsx` declares the routes under `BrowserRouter` and uses guard components as wrappers for protected elements; it does not define a nested layout route with `<Outlet />`. `Header` and `Footer` are shared outside `Routes`. The `:productId` parameter identifies a product for its details and edit screens, while `:category` selects the category listing. These values are read with `useParams()`.

## 5. List → Details Flow

### Catalog / List Page
`ProductList` fetches records from Supabase's `products` table and renders reusable `ProductCard` components. The shop provides category navigation; `CategoryProducts` reads the URL category and filters records with `.ilike("category", category)`. There is no implemented general search or sorting control in the inspected catalog.

### Details Page
Product-card navigation leads to `/products/:productId`. `ProductDetails` uses `useParams()` to obtain `productId`, fetches the matching database record, and displays its information and comments. When the current user owns the record, edit and delete controls are available. Navigation uses React Router links and `useNavigate()` where appropriate.

## 6. Data Source & Backend

**Backend Type:** Supabase (hosted backend with PostgreSQL database and Supabase Authentication), accessed using `@supabase/supabase-js`. This project does not contain a custom Express/MongoDB server.

The client is configured in `src/lib/supabase.js` using the Vite environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Product records are stored in `products`, and comments in `comments`. Database access and authorization also depend on the policies configured in the Supabase project; those server-side policies are not included in the uploaded source.

## 7. Data Operations (CRUD)

The primary CRUD collection is **products**. Supabase client methods correspond to database-backed API operations.

### Create (POST)
An authenticated user completes the form at `/products/create`. After validating the fields, `ProductCreate` calls `supabase.from("products").insert(...)`, including the current user's ID as `owner_id`. On success, the app navigates to `/shop`.

### Read (GET)
`ProductList` reads products with `.select("*")`. The details page retrieves an individual product by its URL ID, and `CategoryProducts` fetches matching products by category. `ProductComments` separately reads comments for the selected product, ordered newest first.

### Update (PUT/PATCH)
At `/products/:productId/edit`, `ProductEdit` loads the existing record, checks that its `owner_id` matches the logged-in user, and pre-fills the form. Submitting calls `.update(...)` filtered by both product ID and owner ID. After a successful update, navigation to `/products/:productId` causes the details page to fetch and display the updated record.

### Delete (DELETE)
On the details page, the owner can request deletion. The app asks for confirmation using `window.confirm()`, then calls `.delete()` with both the product ID and `owner_id` filters. After confirmed deletion, it navigates back to `/shop`, whose list fetches the remaining records.

**Additional operations:** Logged-in users can insert comments, and comment authors can delete their own comments. After insertion, the new comment is prepended to local state; after deletion, the deleted comment is filtered out. The shopping cart's quantity changes and removals update local React state rather than the database.

## 8. Forms & Validation

### Forms Used
- Login form: email and password.
- Registration form: email, password, and password confirmation.
- Create Product form: name, price, image URL, category, and description.
- Edit Product form: the same product fields, pre-filled from the saved record.
- Product comment form: comment text.

### Validation Rules
- **Email:** Required and entered through an HTML `type="email"` input; whitespace is trimmed before submission.
- **Password:** Required; registration requires at least six characters.
- **Confirm password:** Required and must exactly match the registration password.
- **Product name:** Required, nonblank after trimming, and limited to 100 characters by the form.
- **Product price:** Required, must convert to a finite number, and must be greater than zero.
- **Other product fields:** Image URL, category, and description must be nonblank. This is a nonempty-field check, not a guarantee that the image URL resolves.
- **Comment:** Required, must not be blank after trimming, and has an HTML maximum length of 1,000 characters.

Submission errors are displayed in the corresponding forms, and buttons use loading/submitting states to discourage repeated requests.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle
- `useState` stores form inputs, request status, errors, products, comments, menu state, and the cart.
- `useEffect` fetches sessions, products, product details, category results, and comments when components mount or relevant parameters change.
- `useContext`, wrapped by the custom `useAuth()` hook, provides shared authentication state.
- `useParams` reads product and category parameters; `useNavigate` handles programmatic redirects.
- **Lifecycle example:** `AuthProvider` checks the session on mount and subscribes to auth changes; on unmount its effect cleanup calls `subscription.unsubscribe()`. Comment fetching also uses an `active` flag in effect cleanup to avoid updating state after its effect becomes obsolete.

### Context API
`AuthContext` provides `{ user, loading }`. Route guards, the header, product management screens, and product comments consume this shared state. Cart state is instead owned by `App` and passed to relevant child components through props.

### Component Styling
The app uses regular CSS assets, custom CSS, and Bootstrap classes. Its UI is divided into reusable components such as `Header`, `Footer`, `ProductCard`, `ProductList`, and `ProductComments`. The project is built with React and Vite.

## 10. Typical User Flow

1. A visitor opens the home page, browses the shop, optionally selects a furniture category, and opens a product's details.
2. The visitor registers or logs in. Supabase authenticates the account and the shared auth state updates.
3. The authenticated user adds furniture to the cart, reviews quantities and the calculated total, and may leave a comment on a product.
4. The user can create a furniture listing, open their own listing, edit its details, or delete it after confirmation. The app returns to the relevant product or shop page after successful operations.

## 11. Error & Edge Case Handling

### Authentication Errors
Login and registration display returned Supabase errors and validation messages. Guards show a loading state until session checking finishes, preventing premature redirects. A guest trying to visit a private route is redirected to login; a logged-in user trying to open login or registration is redirected home.

### Network or Data Errors
Product creation, editing, deletion, and comment operations catch or check Supabase errors and display appropriate messages. The category and details screens handle fetch errors. The general `ProductList` currently logs fetch errors to the console rather than displaying a dedicated error message; this is a current limitation.

### Empty or Missing Data States
The cart displays an empty-cart message and a link back to the shop. Category pages handle categories with no matching products. The comments section displays a message when no comments exist. Product details and edit screens account for unavailable records, and the edit screen rejects records not owned by the signed-in user. Delete/update operations check the returned rows so that an operation affecting no matching record is not treated as a successful change.

---

### Local Setup

## Installation and Configuration

### Live Application

The deployed application can be accessed using the following link:

**Live Demo:** [Insert your Vercel deployment URL here]

### Run Locally

From the `Furni-E-commerce-Store` application directory, install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root and configure your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with your actual Supabase project URL and publishable key. Do not commit your `.env` file to GitHub.

The connected Supabase project must contain the required `products` and `comments` tables, along with appropriate authentication and database security policies.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### Deployment

The application is deployed on Vercel and uses Supabase for authentication and database operations. The deployed version uses environment variables configured in the Vercel project settings.

No local `.env` file is required to access the live application.