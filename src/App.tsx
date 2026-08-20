import SmoothScroll from './components/SmoothScroll';
import Opening from './components/Opening';
import TheatreLayout from './components/TheatreLayout';
import Acts from './components/Acts';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative w-full bg-charcoal min-h-screen text-ivory overflow-x-clip antialiased selection:bg-gold selection:text-charcoal">
        <Opening />
        <TheatreLayout>
          <Acts />
        </TheatreLayout>
      </div>
    </SmoothScroll>
  );
}
