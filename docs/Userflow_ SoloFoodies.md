### **App Flow, Pages, and Roles: Solo Foodies**

---

## **👥 User Roles**

### **1\. Restaurant Accounts**

* Can create and manage collaborations (public & private)  
* Can search and explore foodie influencers  
* Can send private invites or approve public requests  
* Can message foodies once a collab is active  
* Can subscribe and pay via Stripe

### **2\. Foodie Influencer Accounts**

* Can browse and request to join public collabs  
* Can accept or decline private invites  
* Can search and explore restaurants and offers  
* Can only message restaurants once a collab is active  
* Can manage their profile and media kit

---

## **📱 App Pages (Shared Core Pages)**

### **✅ Landing Page (Web)**

* Welcome copy and platform intro  
* Email authentication/login

### **✅ Auth Flow (Mobile/Web)**

* Email/password signup or login  
* Role selection: Foodie or Restaurant  
* Basic profile setup

---

## **📲 Mobile App Tabs (Both Roles)**

### **🔹 Search Tab**

* Restaurant View: Search foodies by niche, location, follower count  
* Foodie View: Search restaurants by cuisine, location, offer type

### **🔹 Explore Tab**

* Restaurant View: View trending or suggested foodies  
* Foodie View: View curated public collabs and restaurant profiles

### **🔹 Messages Tab**

* Only visible for approved/active collabs  
* Threaded chat UI per collaboration  
* Read/unread indicators

### **🔹 Profile Tab**

* Foodie View: Avatar, bio, social stats, media kit, past collabs  
* Restaurant View: Business info, menu URL, hours, past campaigns  
* Edit Profile functionality

---

## **🔧 Collab Management Pages**

### **✅ Create/Edit Collab Page (Restaurant Only)**

* Select Public or Private  
* Input: Title, Description, Party Size, Credit/Offer, Location, Contact  
* Save, Publish, or Send Invite

### **✅ Collab Detail Page**

* For both roles: view full details of each collab  
* CTA: Apply (Foodie), Invite (Restaurant), or View Status

### **✅ My Collabs Page**

* Role-specific dashboard showing:  
  * Pending, Active, Completed collabs  
  * Request/Invite status

---

## **💼 Admin Panel (Future Scope)**

* View user growth, platform metrics  
* Approve flagged content or users  
* Adjust subscription pricing or commissions

---

## **🧭 App Flow Summary**

1. **User lands on web → logs in via email → selects role**  
2. **User lands on appropriate dashboard (mobile-first UI)**  
3. **Restaurants create and publish a collab (or invite a foodie)**  
4. **Foodies browse or search for collabs → request to join**  
5. **If approved → messaging opens → collab goes active**  
6. **Post-collab → user can mark complete, log feedback (future)**

---

This flow ensures both roles have tailored experiences while keeping UX parallel. Ideal for MVP iteration and scalable for future enhancements like reviews or recurring deals.

