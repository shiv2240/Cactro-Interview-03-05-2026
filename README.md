# Instagram Stories UI Clone

A simplified Instagram Stories feature built using React Native (Expo). This project focuses on UI/UX interactions, specifically the mobile story viewing experience.

## Links

- **Live Demo:** [https://cactro-assessment-03-05-2026.netlify.app/](https://cactro-assessment-03-05-2026.netlify.app/)
- **GitHub Repository:** [https://github.com/shiv2240/Cactro-Interview-03-05-2026](https://github.com/shiv2240/Cactro-Interview-03-05-2026)

> 📱 **Note on Testing**
> Instagram is specifically designed for mobile devices. Since the live demo is a React Native Web build, **please view it on a mobile device**, or toggle the "Device Toolbar" (Mobile View) in your desktop browser's Developer Tools for the correct, intended experience.

## Features Implemented

- **Story Feed:** Horizontally scrollable list of users.
- **Skeleton Loader:** Animated loading state simulating network delay.
- **Story Viewer:** Full-screen modal with touch navigation (Tap left 30% for previous, right 70% for next).
- **Auto-Progression:** Stories advance automatically after a 5-second timer.
- **Gestures:** Swipe down anywhere on the screen to close the viewer smoothly.
- **Interactions:** "Send a message" input bar that automatically pauses the story timer while typing.
- **Logic:** Time-uploaded indicator (e.g., "5h") and automatic filtering of stories older than 24 hours.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/shiv2240/Cactro-Interview-03-05-2026.git
   ```
2. Navigate into the folder and install dependencies:
   ```bash
   cd instagram-stories
   npm install
   ```
3. Start the Expo server:
   ```bash
   npx expo start
   ```
4. Download the **Expo Go** app on your physical iOS or Android device and scan the QR code shown in the terminal.
