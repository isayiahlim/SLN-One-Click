# SLN One-Click 🐶🚀
> **The fastest way to register for UW classes.** > *A Chrome Extension that bridges the gap between "Notify.UW" and "Registered."*

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![University](https://img.shields.io/badge/Built%20For-University%20of%20Washington-purple)

## 🚨 The Problem
Every UW student knows the struggle:
1.  You need a specific class (CSE 311, INFO 200, etc.) but it's full.
2.  You subscribe to **Notify.UW**.
3.  You get the text/email alert: *"Seat available!"*
4.  **The Race Begins:** You scramble to open `sdb.admin.uw.edu`, log in, find the text box, type the SLN code...
5.  **Result:** *Class closed.* Someone else was faster.

## 💡 The Solution
**SLN One-Click** is a browser extension that eliminates the manual data entry. It allows you to "Queue" SLN codes in advance. When you're getting some work done and get a notify notification, you can open the extension and click the named registration preset, which opens register.uw.edu with the corresponding SLN codes and clicks the "Update Schedule" button for you.

## ✨ Features
* **SLN Queue:** Save multiple Schedule Line Numbers (SLNs) in a persistent popup list.
* **Instant Autofill:** Automatically loads the SLNs, which are built into the page url.
* **One-Click Registration:** Replaces 5+ clicks and typing with a single page load.
* **Smart Safety:** Only runs on the official `sdb.admin.uw.edu` domain to prevent accidents.

## 🛠 Installation (Developer Mode)
*Since this is a hackathon project, it is not yet on the Chrome Web Store.*

1.  **Clone this repo:**
    ```bash
    git clone [https://github.com/isayiahlim/SLN-One-Click.git](https://github.com/isayiahlim/SLN-One-Click.git)
    ```
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Toggle **Developer mode** (top right corner).
4.  Click **Load unpacked**.
5.  Select the folder where you cloned this repository.
6.  Pin the extension to your toolbar!

## 📖 How to Use
1.  **Prep:** Navigate to register.uw.edu. Fill in the SLNs you want to register for. 
2.  **Save:** Click the SLN One-Click icon. Name the preset and click **"Queue Code"**.
2.  **Wait:** When you get a Notify.UW text, click the link to the registration page.
3.  **Win:** As soon as the page loads, the SLN is already in the box. Just hit "Update Schedule" (or enable auto-submit in settings).

## ⚠️ Disclaimer
**Use responsibly.** This tool is an *autofill utility*, similar to password managers. It is not a "bot" that spams the server with requests. However, automating university registration actions can exist in a gray area of student conduct codes. 
* **Do not** modify the code to refresh the page automatically (this is "hammering" and will get you IP banned by UW IT).
* The developers are not responsible for any misuse of this tool.

---
*Built by Benoit Le, Daniel Zhang, and Isayiah Lim for the Autumn 2025 Claude Builders Club Hackathon*