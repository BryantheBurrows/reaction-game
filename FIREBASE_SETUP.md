# Firebase setup

Plotline uses Firebase Authentication (email/password) and Cloud Firestore. The Firebase web-app config is public client configuration, not a service-account key. Never put a service-account JSON file or private key in this app.

## Configure the app

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. In **Project settings → General → Your apps**, register a Web app and copy its Firebase config.
3. In `index.html`, replace the four `YOUR_*` values in `firebaseConfig` with the matching `apiKey`, `authDomain`, `projectId`, and `appId` values from that config.
4. In **Authentication → Sign-in method**, enable **Email/Password**.
5. Create a Cloud Firestore database.
6. Publish the contents of [`firestore.rules`](./firestore.rules) in **Firestore Database → Rules** before using the app. These rules restrict each entry to its owning authenticated user.
7. Serve the app from `localhost` during development or deploy it to an HTTPS host. Add the deployed hostname under **Authentication → Settings → Authorized domains**. A `file://` URL is not a supported Firebase Auth origin.

## Journal behavior

- Signed-out writing continues to save one local draft in that browser.
- After sign-in, that local draft is imported once per browser into the user's private Firestore journal (if it contains writing). A blank journal gets a new entry.
- Journal entries are stored at `users/{uid}/entries/{entryId}`. Use **New entry** and the **Journal** selector in the writing window to manage multiple entries.
- Edits autosave to Firestore and local storage. The current entry listens for remote updates. If another device changes the same entry while local edits are pending, choose **Use cloud version** or **Keep my edits** to resolve the conflict.
- Passwords are handled by Firebase Authentication and are never stored by Plotline.

Firebase usage may incur charges according to your project's plan and usage.
