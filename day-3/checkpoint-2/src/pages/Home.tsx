import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import keyboardImage from "../assets/promo/promo-keyboard.jpg";
import mouseImage from "../assets/promo/promo-mouse.avif";
import headsetImage from "../assets/promo/promo-headset.jpg";
import monitorImage from "../assets/promo/promo-monitor.png";
import chairtImage from "../assets/promo/promo-chair.jpg";

export default function Home() {
  return (
    <div>
      <Carousel className="h-[400px]">
        <CarouselContent>
          {[
            keyboardImage,
            mouseImage,
            headsetImage,
            monitorImage,
            chairtImage,
          ].map((image, i) => (
            <CarouselItem
              key={i}
              className="md:basis-1/2 overflow-hidden flex items-center justify-center"
            >
              <div className="w-full h-full aspect-video">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
