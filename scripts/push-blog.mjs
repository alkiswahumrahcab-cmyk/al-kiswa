import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("No MONGODB_URI found in .env");
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db();
    const blogposts = database.collection("blogposts");

    const newPost = {
      slug: 'hajj-makkah-entry-permit-tasreeh-2026',
      title: 'Important Update: Makkah Entry Permit (Tasreeh) Required for Jeddah to Makkah Route During Hajj',
      excerpt: 'Traveling during Hajj? Learn about the mandatory Makkah Entry Permit (Tasreeh) for the Jeddah to Makkah route. Read our official travel guidelines.',
      content: `# Important Travel Notice: Makkah Entry Permit (Tasreeh) Required During Hajj Season

Dear Valued Pilgrims and Travelers,

At **Al Kiswah Umrah Transport**, your spiritual journey, safety, and comfort are our absolute priorities. As we approach the sacred season of Hajj, we are issuing an essential service update regarding travel regulations within the Kingdom of Saudi Arabia. To ensure a seamless and compliant journey, please carefully review the latest **Makkah travel guidelines** issued by the Saudi authorities.

## Official Update: Jeddah to Makkah Route Restrictions

During the Hajj season, the Saudi government implements temporary **Hajj travel restrictions** to manage the massive influx of pilgrims safely and efficiently. As a result, travel along the **Jeddah to Makkah route** becomes strictly regulated. We wish to inform all our guests that transport along this specific corridor is restricted during the official Hajj period to ensure the safety and security of all Guests of Allah.

## Understanding the Strict Tasreeh Requirement

To maintain order during the world's largest annual gathering, Saudi authorities have mandated a strict **Tasreeh requirement**. Here is what you need to know before booking your journey:

*   **Mandatory Documentation:** Only passengers holding a valid, officially issued **Makkah entry permit** (Tasreeh) are legally allowed to pass through the security checkpoints and enter the holy city of Makkah.
*   **Zero Exceptions:** Please be aware that without this official permit, no traveler—whether a Saudi citizen, expatriate resident, or international visitor—is permitted to enter Makkah. Consequently, to ensure compliance with the law, our chauffeurs cannot accept bookings or transport passengers for **Jeddah to Makkah taxi / transport** services unless the required documentation is presented.
*   **A Government Mandate:** We kindly remind our guests that this is a non-negotiable government regulation enforced by local security forces, not an internal policy instituted by our company. 

Our goal is to prevent any travel disruptions, delays, or turnarounds at checkpoints. We urge all travelers to secure their permits well in advance to avoid disappointment.

## Continued Excellence in Umrah Transport Services

While the **Jeddah to Makkah route** requires special documentation during Hajj, we are pleased to confirm that **all other routes operated by Al Kiswah Umrah Transport remain fully operational**. 

Whether you require a transfer from Madinah to Jeddah Airport, wish to embark on a comprehensive historical Ziyarat tour within Madinah, or need premium city-to-city transfers outside the restricted zones, our luxury fleet and professional chauffeurs are at your complete disposal.

Once the Hajj season officially concludes and the restrictions are lifted by the authorities, the **Jeddah to Makkah route** will instantly reopen for all passengers without the need for a permit, resuming our standard, uninterrupted VIP service.

## How to Prepare for Your Journey

If your travel itinerary strictly requires you to enter Makkah during the restricted Hajj period, we strongly advise you to secure your **Makkah entry permit** (Tasreeh) through the official government portals prior to your arrival in the Kingdom. Preparing your documentation early will ensure that you can utilize our **Umrah transport services** without any logistical friction, allowing you to focus entirely on the spiritual magnitude of your journey.

***

### **Need Assistance Navigating Your Travel Plans?**

At **Al Kiswah Umrah Transport**, we are dedicated to providing a smooth, premium, and stress-free experience from the moment you land. If you have any questions regarding the **Tasreeh requirement**, or if you need help adjusting your itinerary around the **Hajj travel restrictions**, our team is ready to assist you.

👉 **[Check Route Availability & Book Your Premium Transfer](/booking)**
📞 **Contact Our 24/7 Support Team via WhatsApp** for real-time guidance and expert travel advice.

*May Allah (SWT) accept your prayers, grant you a safe journey, and bless your pilgrimage.*`,
      category: 'Guide',
      date: new Date(),
      readTime: '4 min read',
      image: '/images/blog/tasreeh_blog_header.png',
      alt: 'Professional Arab woman marketing agent in office at sunset',
      author: 'Al Kiswah Transport',
      tags: ['Hajj 2026', 'Makkah Entry Permit', 'Tasreeh', 'Jeddah to Makkah'],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const existing = await blogposts.findOne({ slug: newPost.slug });
    if (existing) {
        console.log("Updating existing post in database...");
        await blogposts.updateOne({ slug: newPost.slug }, { $set: newPost });
    } else {
        console.log("Inserting new post into database...");
        await blogposts.insertOne(newPost);
    }
    console.log("Blog post successfully pushed to live server database!");
  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
