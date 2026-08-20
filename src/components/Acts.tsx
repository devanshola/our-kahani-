import HeroStage from './HeroStage';
import StorybookPaths from './StorybookPaths';
import Act1Story from './Act1Story';
import Act2Teacher from './Act2Teacher';
import Act3Classes from './Act3Classes';
import StoryLibrary from './StoryLibrary';
import WhyKahaanii from './WhyKahaanii';
import OurPromise from './OurPromise';
import TrustSection from './TrustSection';
import ContactWhatsApp from './ContactWhatsApp';
import FinalAct from './FinalAct';

export default function Acts() {
  return (
    <div className="flex flex-col w-full">
      <HeroStage />
      <StorybookPaths />
      <Act1Story />
      <Act2Teacher />
      <Act3Classes />
      <StoryLibrary />
      <WhyKahaanii />
      <OurPromise />
      <TrustSection />
      <ContactWhatsApp />
      <FinalAct />
    </div>
  );
}
