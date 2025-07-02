

### **Product Requirements Document (PRD): Solo Foodies**

---

## **📌 Overview**

**Solo Foodies** is a mobile-first platform designed to connect micro and macro foodie influencers with local restaurants for brand collaborations. The app enables streamlined discovery, communication, and execution of influencer partnerships, helping restaurants gain exposure and giving foodies new promotional opportunities.

---

## **🎯 Goals**

* Help restaurants discover relevant food influencers and create collaboration offers.  
* Provide influencers with a central hub to browse, apply, and manage restaurant collabs.  
* Facilitate easy, structured brand deals, improving speed and reducing friction for both parties.  
* Enable monetization through restaurant subscriptions and commission-based premium collabs.

---

## **👥 User Roles**

### **1\. Restaurants**

* Can create public or private collab campaigns.  
* Search and explore influencer profiles.  
* View foodies' bios, media kits, and metrics.  
* Send private invites or approve public requests.  
* Manage and track active and completed collaborations.

### **2\. Foodie Influencers**

* Create profiles with bio, follower count, photos, and media kit.  
* Search/explore restaurant profiles and public collabs.  
* Request to join public collabs.  
* Receive and respond to private invites.  
* Manage accepted or completed collabs.

---

## **📱 Core App Features**

### **🔹 Landing Page (Web)**

* Email/password authentication  
* Intro to platform value prop

### **🔹 Tabs for Both User Types (Mobile App)**

* **Search Tab:** Search the opposite user type (restaurants for foodies and vice versa).  
* **Explore Tab:** Curated or trending accounts and collabs.  
* **Messages Tab:**  
  * *Restaurants:* Message foodies they’ve invited or worked with.  
  * *Foodies:* Messaging is locked until a collab is initiated and approved.  
* **Profile Tab:** Manage personal or business profile, media, past collabs.

### **🔹 Collaboration Management**

* **Public Collabs:** Visible to all foodies, who can request to join.  
* **Private Invites:** Sent directly to specific foodies.  
* **Collab Detail Page:**  
  * Restaurant name & logo  
  * Party size  
  * Restaurant credit or reward  
  * Address & contact  
  * Terms/expectations (e.g. social post)  
  * Button to apply or accept

---

## **🔐 Authentication**

* Email/password login (required at signup)  
* Optional: OAuth integrations in later phase

---

## **💰 Monetization**

* **Restaurants**: Required to subscribe to create or view collabs  
* **Foodies**: Free to use  
* **Premium Collabs**: Allow high-tier influencers to charge; app takes a commission on transaction

---

## **🛠️ Tech Stack Recommendation**

* **Frontend:** Vite, React, TypeScript, Tailwind, shadcn/ui  
* **Backend & DB:** Supabase  
* **Auth:** Supabase email/password  
* **Payments:** Stripe for subscriptions & commissions

---

## **🧪 MVP Scope (Phase 1\)**

* User auth for restaurants and foodies  
* Role-based dashboard and tabs  
* Collab creation (restaurants)  
* Collab viewing & application (foodies)  
* Basic messaging for active collabs  
* Restaurant subscription via Stripe

---

## **🧭 Future Features (Phase 2+)**

* Ratings/reviews after collabs  
* Influencer verification system  
* Notifications and reminders  
* Analytics for restaurants (views, applications, ROI)  
* Location-based search & filters  
* AI matching engine for foodies \<\> restaurants

---

## **🎨 Design Requirements**

* Mobile-first UI with responsive web fallback  
* Card-based layouts for profiles & collabs  
* Consistent tab bar navigation for both user types  
* Design aesthetic: clean, minimal, vibrant imagery  
* Font: Inter; Colors: Primary (\#F97316), Accent (\#10B981), Background: white & light gray

---

## **🔗 Integrations**

* **Stripe** (for payments and commissions)  
* **Supabase** (database, auth, and storage)  
* Optional: Google Maps API for restaurant location

---

## **✅ Success Metrics**

* Number of successful collabs initiated  
* Restaurant retention rate after first subscription  
* % of collabs completed with positive feedback  
* User activity & message response rates

