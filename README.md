# Admin 
email: admin@gmail.com
password: 1234567

#User
email: user@gmail.com
password: 1234

# Startup Benefits Platform

**Exclusive SaaS deals and benefits platform for startups — manage startup perks, deals, and claims efficiently, access and claim SaaS deals, with a dashboard for employee benefits and startup deals.**

---

## 🚀 Features

- Browse **exclusive SaaS deals** for startups.
- **Claim deals** and track their status.
- **Admin dashboard** to approve or reject claims.
- **Create new deals** (admin-only).
- **User authentication** with role-based access.
- Responsive layout with **sticky footer**.
- Built with **Next.js, TypeScript, and Tailwind CSS**.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 13+, TypeScript, Tailwind CSS  
- **Backend API:** Node.js / Express (assumed)  
- **Authentication:** Context API + JWT  
- **Database:** MongoDB (assumed)  
- **Build Tools:** npm, Turbopack

---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/startup-benefits-platform.git
cd startup-benefits-platform/frontend
2. Install dependencies
npm install

3. Set up environment variables

Create a .env.local file in the frontend folder:

NEXT_PUBLIC_API_URL=http://localhost:5000/api


Add any other required environment variables for authentication or API.

4. Run in development mode
npm run dev


Open http://localhost:3000
 in your browser.

5. Build for production
npm run build
npm start


Your app will run in production mode at http://localhost:3000
.

⚡ Usage

Users: Browse deals, claim them, track status.

Admins: Approve/reject claims, create new deals, manage users.

📁 Folder Structure
frontend/
├─ app/               # Next.js App Router pages
├─ components/        # React components (Header, Footer, DealCard)
├─ context/           # Auth context
├─ styles/            # Tailwind CSS & global styles
├─ utils/             # API helpers
├─ public/            # Static assets
├─ package.json
├─ tsconfig.json
└─ next.config.js

📌 Contributing

Fork the repository.

Create a new branch: git checkout -b feature-name

Make your changes.

Commit: git commit -m "Add some feature"

Push: git push origin feature-name

Open a Pull Request.

📝 License

This project is MIT licensed.
