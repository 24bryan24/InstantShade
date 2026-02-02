# Firebase Hosting Deployment via GitHub Actions

## Prerequisites

1. A [Firebase](https://firebase.google.com/) project
2. A GitHub repository with this code pushed to it

## Setup

### 1. Configure Firebase project

Update `.firebaserc` with your Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 2. Create a Firebase service account

1. Go to [Firebase Console](https://console.firebase.google.com/) → your project → Project settings (gear icon) → **Service accounts**
2. Click **Generate new private key**
3. Save the JSON file securely — you'll use its contents in the next step

### 3. Add GitHub secrets

In your repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add:

- **Name:** `FIREBASE_SERVICE_ACCOUNT`
- **Value:** Paste the entire contents of the service account JSON file

### 4. Deploy

Push to the `main` branch. The workflow will:

1. Install dependencies
2. Build the app
3. Deploy to Firebase Hosting

## Local development

```bash
npm install
npm run dev
```

## Manual deploy

```bash
npm run build
firebase deploy
```
