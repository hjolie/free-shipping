# **FREE-SHIPPING-GO**

### _A Group Buying Form Generator_

#### Enjoy free delivery by inviting family and friends to shop together!

FREE-SHIPPING-GO is a platform that allows you to easily generate a group buying form with a public link. Share it with family, friends, or colleagues to buy products together and hit the free shipping threshold.

### **Features:**

-   **Quick and Simple**: Create a form in just a few easy steps.
-   **Instant Sharing**: Immediately send the public link to your contacts for order placement.
-   **Effortless Management**: Easily view the buyer list and order history in the user dashboard.
-   **Time-Saving**: Avoid scrolling through conversation history in LINE or other messaging apps.

![](/readme/2-form.png)

<img src="/public/readme/1-home.png" width="400">
<img src="/public/readme/2-form.png" width="400">

### **Built with Modern Technologies:**

-   Built using **React**, **Next.js**, and deployed on **Vercel**.
-   **Firebase Authentication** for email/password sign-in.
-   **Firestore Database** for storing forms and buyers' data.
-   Integrated **Line Login** via **Auth.js Line Provider** for **OAuth**.
-   Implemented global authentication state using
    **React Context**:
    1. Created a custom **AuthContextProvider** using React's **createContext** and **useContext** to manage global authentication state.
    2. Leveraged **onAuthStateChanged** from **Firebase** to sync authentication state for dynamically updating the context when a user signs in or signs out.
-   Developed a reusable custom hook **useAuthContext** to provide clean and centralized access to the authentication context, simplifying the codebase and ensuring proper error handling if the context is used outside its provider.
-   Responsive Web Design (RWD):
    1. Implemented a hamburger menu for easy navigation for mobile users.
    2. Enhanced user experience by using media queries and flexible layout functionalities in **Tailwind CSS**, ensuring smooth transitions across devices.

<img src="/public/readme/3-login.png" width="400">

<img src="/readme/4-home-mobile-ham.png" width="300">
<img src="/readme/5-home-mobile-menu.png" width="300">
