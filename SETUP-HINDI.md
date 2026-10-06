# Main Website — Hindi Setup Guide

## 1. सबसे पहले Firebase Project बनाइए

Firebase Console में नया project बनाइए और उसमें Web App add करें।

## 2. Authentication चालू करें

Authentication → Sign-in method:

- Email/Password → Enable
- Google → Enable

Google login के लिए Firebase में authorized domains सही रखें।

## 3. Firebase Config डालें

`assets/js/firebase-config.js` खोलें और Firebase Web App से मिले values भरें।

यहाँ कभी भी Firebase Admin SDK की private key या service-account JSON नहीं डालना है।

## 4. Firestore बनाइए

Firestore Database create करें।

Main website जिन collections की तैयारी करती है:

- users
- partnerCodes
- partners
- projects
- projectMessages
- quotes
- payments
- notifications
- reviews
- services

## 5. Partner Code

Admin website बनने के बाद Admin से partner create होगा और code generate होगा।

Example:

Partner:
Rahul Sharma

Partner ID:
PT1007

Code:
RAHULX27

Firestore:
`partnerCodes/RAHULX27`

## 6. Client Flow

Client:

Website → Register/Login → Partner Code → Verify → Dashboard

अगर client Google से login करता है, तब भी Firebase UID के आधार पर उसका user document बनाया जाएगा।

## 7. Password

Client का password Admin Panel में कभी save/display नहीं करना है।

Firebase Authentication password को securely handle करेगा।

Admin में login activity के लिए केवल आवश्यक metadata रखें, जैसे:

- UID
- Name
- Email
- Login provider
- Created time
- Last login
- Account status

## 8. अभी क्या working है?

Firebase configuration भरने के बाद:

- Email registration
- Email login
- Google login
- Firebase user profile
- Partner code verification
- Partner lookup
- Dashboard partner display
- Profile update
- Password reset

काम कर सकते हैं।

Chat, projects, payments और बाकी modules की UI तैयार है; इन्हें production में Firestore/backend logic से connect करना होगा।

## 9. Security

`firestore.rules.example` को देखकर अपनी production rules बनाइए।

कभी भी यह rule production में मत लगाइए:

`allow read, write: if true;`

Client को दूसरे client का data नहीं मिलना चाहिए।

## 10. Admin Website

Admin website अलग project/ZIP में बनेगी, लेकिन वही Firebase project इस्तेमाल करेगी।

Admin से:

- Partners
- Partner codes
- Clients
- Projects
- Quotes
- Payments
- Commission
- Notifications
- Analytics
- Chat moderation

control किया जाएगा।
