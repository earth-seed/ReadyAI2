# Strapi Migration Status & Next Steps

## ✅ What We've Completed

### 1. **Strapi Infrastructure Setup**
- ✅ Strapi CMS deployed to Render with PostgreSQL database
- ✅ Cloudinary configured for media storage (images upload to Cloudinary)
- ✅ Email provider (Nodemailer) configured for password resets
- ✅ CORS configured for frontend communication
- ✅ Proxy settings configured for Render deployment
- ✅ Admin bootstrap script working (auto-creates/resets admin users)
- ✅ Session and cookie handling fixed for HTTPS proxy environments

### 2. **Frontend Integration**
- ✅ `/admin` route redirects to Strapi admin panel
- ✅ Environment variable `VITE_STRAPI_URL` configured
- ✅ Admin page shows loading state during redirect

### 3. **Strapi Article Content Type**
- ✅ Article schema created with:
  - `title` (string, required)
  - `slug` (uid, auto-generated from title)
  - `content` (blocks - rich text editor)
  - `featuredImage` (media, required)
  - `metaDescription` (text)
  - `metaKeywords` (text)
  - `publicationDate` (datetime)
  - `author` (relation to admin user)

---

## 🚧 What's Next

### Phase 1: Update Strapi Article Schema
**Goal**: Match current Firebase article structure

**Current Firebase Article Fields:**
- `id`, `title`, `url`, `imgURL`, `docURL`, `timestamp`, `description`, `metaKeywords`

**Action Items:**
1. Add `url` field to Strapi article schema (for backward compatibility with existing URLs)
2. Add `docURL` field (optional, for Word doc references during migration)
3. Ensure `publicationDate` maps to `timestamp`
4. Ensure `metaDescription` maps to `description`

**Files to Update:**
- `readyai-cms/src/api/article/content-types/article/schema.json`

---

### Phase 2: Content Creator Onboarding
**Goal**: Get your team using Strapi

**Action Items:**
1. **Create Admin Users in Strapi**
   - Access: `https://readyai-strapi-cms.onrender.com/admin`
   - Go to Settings → Administration Panel → Users
   - Create accounts for each content creator
   - Assign roles:
     - **Editor**: Can create, edit, and publish articles
     - **Author**: Can create and edit their own articles
     - **Super Admin**: Full access (you only)

2. **Share Access Information**
   - Admin URL: `https://readyai.dev/admin` (redirects to Strapi)
   - Login credentials for each user
   - Brief training on Strapi interface (it's intuitive!)

3. **Test Content Creation**
   - Have a content creator create a test article
   - Verify media uploads to Cloudinary
   - Verify article appears in Strapi API

---

### Phase 3: Migrate Existing Content
**Goal**: Move all existing articles from Firebase to Strapi/Cloudinary

**Current Content Sources:**
- Firebase Firestore: Article metadata (6 articles in `articles.json`)
- Firebase Storage: Word doc files (`.docx` files in `public/articles/`)
- Local images: Article images in `public/assets/images/`

**Migration Strategy Options:**

#### Option A: Full Migration (Recommended)
1. **Create Migration Script** (`readyai-cms/scripts/migrate-articles.js`)
   - Read `public/articles/articles.json`
   - For each article:
     - Upload image from `public/assets/images/` to Cloudinary via Strapi API
     - Upload Word doc to Cloudinary (or convert to Strapi blocks)
     - Create article in Strapi with all metadata
     - Map old `url` field to new `slug` field

2. **Content Conversion**
   - **Option 1**: Keep Word docs in Cloudinary, reference via `docURL`
   - **Option 2**: Convert Word docs to Strapi blocks (rich text) - better long-term
   - **Recommendation**: Option 2 for better content management

#### Option B: Gradual Migration
- Manually recreate articles in Strapi
- Upload images to Cloudinary via Strapi Media Library
- Copy/paste content from Word docs into Strapi blocks editor

**Action Items:**
1. Create migration script (if using Option A)
2. Run migration for all 6 existing articles
3. Verify articles appear in Strapi API
4. Test article display on frontend

---

### Phase 4: Update Frontend to Use Strapi
**Goal**: Replace Firebase with Strapi API calls

**Current State:**
- `InsightsPage.tsx` fetches from Firebase Firestore
- `WordDocParser.tsx` loads Word docs from Firebase Storage

**Action Items:**

1. **Create Strapi API Utility** (`src/utils/strapi.ts`)
   ```typescript
   const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
   
   export const fetchArticles = async () => {
     const response = await fetch(
       `${STRAPI_URL}/api/articles?populate=*&sort=publicationDate:desc`
     );
     const data = await response.json();
     return data.data;
   };
   
   export const fetchArticleBySlug = async (slug: string) => {
     const response = await fetch(
       `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`
     );
     const data = await response.json();
     return data.data[0];
   };
   ```

2. **Update InsightsPage.tsx**
   - Remove Firebase imports
   - Replace `fetchArticles` with Strapi API call
   - Update `Article` type to match Strapi response
   - Map Strapi fields to display:
     - `featuredImage.url` → `imgURL`
     - `slug` → `url` (for routing)
     - `publicationDate` → `timestamp`
     - `metaDescription` → `description`

3. **Update WordDocParser.tsx** (if keeping Word docs)
   - Change `docPath` to use Cloudinary URL from Strapi
   - OR remove entirely if converting to Strapi blocks

4. **Update Article Display**
   - If using Strapi blocks: Render blocks directly (no WordDocParser needed)
   - If keeping Word docs: Update `docURL` to Cloudinary URL

5. **Add Environment Variable**
   - In Netlify: Add `VITE_STRAPI_URL=https://readyai-strapi-cms.onrender.com`

---

### Phase 5: Testing & Validation
**Goal**: Ensure everything works end-to-end

**Checklist:**
- [ ] Content creators can log in to Strapi
- [ ] Content creators can create new articles
- [ ] Images upload to Cloudinary successfully
- [ ] Articles appear in Strapi API (`/api/articles`)
- [ ] Frontend fetches articles from Strapi
- [ ] Article list page displays correctly
- [ ] Individual article pages display correctly
- [ ] SEO meta tags work (Open Graph, etc.)
- [ ] LinkedIn sharing works
- [ ] All 6 migrated articles display correctly

---

## 📋 Implementation Order

### Week 1: Content Creator Setup
1. Update Strapi article schema (add `url` field)
2. Create admin users for content creators
3. Train content creators on Strapi
4. Test creating a new article end-to-end

### Week 2: Content Migration
1. Create migration script (or plan manual migration)
2. Migrate all 6 existing articles
3. Upload images to Cloudinary
4. Convert Word docs to Strapi blocks (or upload to Cloudinary)

### Week 3: Frontend Integration
1. Create Strapi API utility
2. Update InsightsPage to use Strapi
3. Test article display
4. Update environment variables in Netlify
5. Deploy and test

### Week 4: Cleanup & Optimization
1. Remove Firebase dependencies (if no longer needed)
2. Remove WordDocParser (if using Strapi blocks)
3. Update any other pages that reference Firebase articles
4. Monitor and optimize

---

## 🔧 Technical Details

### Strapi API Endpoints
- List articles: `GET /api/articles?populate=*&sort=publicationDate:desc`
- Single article: `GET /api/articles?filters[slug][$eq]=ARTICLE_SLUG&populate=*`
- Create article: `POST /api/articles` (requires authentication)
- Update article: `PUT /api/articles/:id` (requires authentication)

### Strapi Response Format
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Article Title",
        "slug": "article-slug",
        "content": [...blocks...],
        "featuredImage": {
          "data": {
            "attributes": {
              "url": "/uploads/image.jpg"
            }
          }
        },
        "metaDescription": "...",
        "metaKeywords": "...",
        "publicationDate": "2025-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

### Environment Variables Needed

**Strapi (Render):**
- `DATABASE_URL` ✅
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` ✅
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` ✅
- `FRONTEND_URL` ✅
- `PUBLIC_URL` ✅

**Frontend (Netlify):**
- `VITE_STRAPI_URL` (needs to be set)

---

## 🚨 Important Notes

1. **Word Docs**: Decide early whether to convert to Strapi blocks or keep as Cloudinary files
2. **URL Compatibility**: The `url` field in Firebase maps to `slug` in Strapi - ensure routing still works
3. **Image Paths**: Old images are local (`/assets/images/`) - need to upload to Cloudinary
4. **Content Format**: Strapi blocks are different from Word docs - may need content reformatting
5. **Testing**: Test thoroughly before removing Firebase dependencies

---

## 📞 Support

If you encounter issues:
1. Check Strapi logs in Render dashboard
2. Check browser console for API errors
3. Verify environment variables are set correctly
4. Test Strapi API directly: `https://readyai-strapi-cms.onrender.com/api/articles`

