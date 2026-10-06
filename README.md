# Nexora — Main Client Website

Premium client-facing website for a partner-network platform.

## Included

- Premium public landing page
- Email/password authentication UI
- Google authentication UI
- Firebase user profile creation
- Partner-code verification flow
- Client dashboard
- Projects and project detail UI
- Partner workspace connection
- Chat interface
- Services
- Notifications
- Profile/settings
- About, Contact, Terms and Privacy starter pages
- Responsive desktop/mobile layout
- Firebase Firestore integration hooks

## Important

This is the **Main Client Website** only. The Admin Website will be a separate project and should use the same Firebase project.

## Firebase setup

1. Create a Firebase project.
2. Add a Web App.
3. Copy the Web App configuration into:
   `assets/js/firebase-config.js`
4. Enable Authentication:
   - Email/Password
   - Google
5. Create Firestore Database.
6. Deploy restrictive Firestore Security Rules.
7. Create your first partner documents and partner-code documents from the future Admin Panel.

Example partner code document:

Collection: `partnerCodes`

Document ID:
`RAHULX27`

Fields:
```text
partnerId: "PT1007"
partnerName: "Rahul Sharma"
status: "active"
```

Example partner document:

Collection: `partners`

Document ID:
`PT1007`

Fields:
```text
name: "Rahul Sharma"
role: "Web Developer"
status: "active"
```

## Run locally

Because Firebase modules are imported from HTTPS, use a local web server rather than opening HTML files directly.

For example with VS Code Live Server, serve this folder and open `index.html`.

## Production checklist

- Replace all placeholder Firebase config values.
- Configure Firebase Authentication authorized domains.
- Configure Google OAuth consent details.
- Apply strict Firestore rules.
- Add Storage rules if file uploads are enabled.
- Connect real-time chat to Firestore.
- Connect projects, quotations, invoices and payments to Firestore.
- Add server-side/Cloud Functions validation for sensitive operations.
- Replace starter legal pages with your actual legal documents.
- Add your real brand name/logo/domain.
- Do not store plaintext passwords anywhere.
