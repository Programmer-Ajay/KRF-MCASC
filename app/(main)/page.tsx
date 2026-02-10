
import HeroSection from "@/components/landing-page/hero-section";
import EventsSection from "@/components/landing-page/Event-section";
import GallerySection from "@/components/landing-page/gallery/gallery";
  import { getEventList } from "@/server/services/get-competiton-details";
import { getEventListType } from "@/server/services/get-competiton-details";
import JsonLd from "@/components/seo/jsonLd";

export default  async function Home() {
        let events:getEventListType[]=[];
  try {
     events= await getEventList();

  } catch (error) {
    // 1. Log the error on the server so YOU see it in Vercel logs

    console.error("Failed to fetch events for landing page:", error);
  }
   
  return (
    <div>

     <JsonLd />
    <HeroSection/>
    <EventsSection events={events}/>
    <GallerySection />
   
    </div>
  );
}

