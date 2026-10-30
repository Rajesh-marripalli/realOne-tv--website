import { Component, ElementRef, HostListener, OnDestroy, ViewChild, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, DisplayCategory, NATURE_IMAGES, PRODUCTS, TvProduct } from './catalog';
import { STORE } from './store.config';
import { RevealDirective } from './reveal.directive';

type SceneId = 'owl' | 'lake' | 'aurora';
type SizeFilter = 'all' | 'small' | 'medium' | 'large' | 'extra';
interface DemoScene { id: SceneId; number: string; title: string; detail: string; image: string; }
interface ChatMessage { author: 'bot' | 'customer'; text: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  @ViewChild('heroVideo') heroVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('backgroundVideo') backgroundVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('chatConversation') chatConversation?: ElementRef<HTMLDivElement>;

  readonly store = STORE;
  readonly products = PRODUCTS;
  readonly categories = CATEGORIES;
  readonly natureImages = NATURE_IMAGES;
  readonly year = new Date().getFullYear();
  readonly scenes: DemoScene[] = [
    { id:'owl', number:'01', title:'Wildlife film', detail:'Your uploaded motion clip', image:'images/owl-poster.jpg' },
    { id:'lake', number:'02', title:'Landscapes', detail:'Scenic still image', image:NATURE_IMAGES.lake },
    { id:'aurora', number:'03', title:'Night sky', detail:'Colour-rich still image', image:NATURE_IMAGES.aurora },
  ];

  readonly activeSceneId = signal<SceneId>('owl');
  readonly activeScene = computed(() => this.scenes.find(s => s.id === this.activeSceneId())!);
  readonly isPaused = signal(false);
  readonly isVideoContained = signal(false);
  readonly isMenuOpen = signal(false);
  readonly sizeFilter = signal<SizeFilter>('all');
  readonly categoryFilter = signal<DisplayCategory | 'all'>('all');
  readonly filteredProducts = computed(() => this.products.filter(product => {
    const size = this.sizeFilter();
    const sizeMatches = size === 'all' ||
      (size === 'small' && product.size <= 43) ||
      (size === 'medium' && product.size > 43 && product.size <= 55) ||
      (size === 'large' && product.size > 55 && product.size <= 85) ||
      (size === 'extra' && product.size > 85);
    return sizeMatches && (this.categoryFilter() === 'all' || product.category === this.categoryFilter());
  }));
  readonly categoryName = computed(() => this.categories.find(c => c.id === this.categoryFilter())?.name ?? 'All categories');
  readonly comparedIds = signal<string[]>([]);
  readonly comparedProducts = computed(() => this.products.filter(p => this.comparedIds().includes(p.id)));
  readonly isCompareOpen = signal(false);
  readonly selectedProduct = signal<TvProduct | null>(null);
  readonly isEnquiryOpen = signal(false);
  readonly requestedModel = signal('Help me choose a display');
  readonly visualBrightness = signal(100);
  readonly toast = signal('');
  readonly isCopied = signal(false);
  readonly chatOpen = signal(false);
  readonly chatMessages = signal<ChatMessage[]>([
    { author:'bot', text:'Hello! 👋 Welcome to RealOne. I can help you explore home TVs, advertising displays, monitors, installation, or comparing screens. What are you looking for?' },
  ]);

  customer = { name:'', phone:'', message:'' };
  chatText = '';
  private toastTimer?: ReturnType<typeof setTimeout>;

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.isCompareOpen.set(false);
    this.isEnquiryOpen.set(false);
    this.selectedProduct.set(null);
    this.isMenuOpen.set(false);
    this.chatOpen.set(false);
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  selectScene(id: SceneId): void {
    this.activeSceneId.set(id);
    const video = this.heroVideo?.nativeElement;
    const background = this.backgroundVideo?.nativeElement;
    if (!video) return;
    if (id === 'owl') {
      void video.play().then(() => this.isPaused.set(false)).catch(() => this.isPaused.set(true));
      if (background) void background.play().catch(() => undefined);
    } else {
      video.pause();
      background?.pause();
    }
  }

  synchronizeVideo(): void {
    const tv = this.heroVideo?.nativeElement;
    const bg = this.backgroundVideo?.nativeElement;
    if (!tv || !bg || !Number.isFinite(tv.currentTime)) return;
    if (Math.abs(tv.currentTime - bg.currentTime) > 0.7) bg.currentTime = tv.currentTime;
  }

  togglePlayback(): void {
    const video = this.heroVideo?.nativeElement;
    const background = this.backgroundVideo?.nativeElement;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => this.isPaused.set(false)).catch(() => this.isPaused.set(true));
      if (background) void background.play().catch(() => undefined);
    } else {
      video.pause(); background?.pause(); this.isPaused.set(true);
    }
  }

  toggleVideoFit(): void { this.isVideoContained.update(value => !value); }

  playDemo(): void {
    this.selectScene('owl');
    document.getElementById('experience')?.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  setCategory(category: DisplayCategory | 'all'): void {
    this.categoryFilter.set(category);
    this.sizeFilter.set('all');
    this.isMenuOpen.set(false);
    document.getElementById('collection')?.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  setSizeFilter(size: SizeFilter): void { this.sizeFilter.set(size); }

  toggleCompare(id: string): void {
    if (this.comparedIds().includes(id)) { this.comparedIds.update(ids => ids.filter(value => value !== id)); return; }
    if (this.comparedIds().length >= 3) { this.showToast('Select up to three screens to compare.'); return; }
    this.comparedIds.update(ids => [...ids, id]);
  }
  isCompared(id: string): boolean { return this.comparedIds().includes(id); }

  openProduct(product: TvProduct): void { this.selectedProduct.set(product); }
  closeProduct(): void { this.selectedProduct.set(null); }

  openEnquiry(product?: TvProduct): void {
    this.requestedModel.set(product?.name ?? 'Help me choose a display');
    this.isCompareOpen.set(false);
    this.selectedProduct.set(null);
    this.isEnquiryOpen.set(true);
    this.isMenuOpen.set(false);
    this.isCopied.set(false);
  }
  closeEnquiry(): void { this.isEnquiryOpen.set(false); }

  buildEnquiry(): string {
    return [
      'Hello RealOne, I would like help choosing a display.',
      `Interested in: ${this.requestedModel()}`,
      `Name: ${this.customer.name.trim() || 'Not provided'}`,
      `Phone: ${this.customer.phone.trim() || 'Not provided'}`,
      `Message: ${this.customer.message.trim() || 'Please share available options, current prices, and installation details.'}`,
    ].join('\n');
  }

  async copyEnquiry(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.buildEnquiry());
      this.isCopied.set(true);
      this.showToast('Enquiry copied — share it with the store.');
    } catch { this.showToast('Clipboard unavailable; use the WhatsApp button or copy manually.'); }
  }

  openWhatsApp(fromChat = false): void {
    const phone = this.store.whatsappNumber.replace(/\D/g,'');
    if (!/^\d{10,15}$/.test(phone)) {
      this.showToast('Set the real store WhatsApp number in store.config.ts.');
      return;
    }
    const enquiry = fromChat
      ? ['Hi RealOne, I am enquiring from your website chat.',
          ...this.chatMessages().filter(m => m.author === 'customer').map(m => `Customer: ${m.text}`),
          `Contact name: ${this.customer.name || 'Not provided'}`].join('\n')
      : this.buildEnquiry();
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(enquiry)}`, '_blank', 'noopener,noreferrer');
  }

  openSocial(platform: 'instagram' | 'youtube' | 'facebook'): void {
    const url = platform === 'instagram' ? this.store.instagramUrl : platform === 'youtube' ? this.store.youtubeUrl : this.store.facebookUrl;
    if (!/^https:\/\//i.test(url)) { this.showToast(`Configure the official ${platform} profile in store.config.ts.`); return; }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  toggleChat(): void { this.chatOpen.update(value => !value); }
  chooseChatTopic(topic: string): void {
    this.addChat('customer', topic);
    const answers: Record<string,string> = {
      'Home TVs': 'We showcase wall-mounted and smart TV ideas. Pick a size and compare screens, or ask our team for actual models and prices.',
      'Advertising displays': 'We cover banner screens, digital signage, LED video walls, and outdoor display concepts. What size, orientation, and installation location do you need?',
      'Monitors': 'We have sample workstation and gaming monitor categories. Tell us your screen size, work type, and budget for a suitable suggestion.',
      'Installation': 'Tell us your location, wall type, desired size, and whether you need delivery or installation. The store can confirm availability and charges.',
    };
    this.addChat('bot', answers[topic] ?? 'Tell me about the display you have in mind.');
  }
  sendChat(): void {
    const message = this.chatText.trim();
    if (!message) return;
    this.addChat('customer', message);
    this.chatText = '';
    const lower = message.toLowerCase();
    let answer = 'Thanks for the details. Browse and compare our example displays here, then send your enquiry through WhatsApp for a reply from the actual store.';
    if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) answer = 'Prices are not shown because this is demonstration inventory. The store can provide the latest quote on WhatsApp.';
    else if (lower.includes('wall') || lower.includes('led')) answer = 'For wall TVs and LED walls, consider mounting space, viewing distance, screen size, and installation requirements.';
    else if (lower.includes('monitor') || lower.includes('gaming')) answer = 'For monitors, compare size, resolution, connections, and refresh rate. Verify the final model specifications with the seller.';
    else if (lower.includes('banner') || lower.includes('advertis')) answer = 'For banner or advertising screens, portrait orientation, brightness, content management, and operating hours are useful decision factors.';
    this.addChat('bot', answer);
  }
  private addChat(author: ChatMessage['author'], text: string): void {
    this.chatMessages.update(items => [...items, { author, text }]);
    setTimeout(() => {
      const area = this.chatConversation?.nativeElement;
      if (area) area.scrollTop = area.scrollHeight;
    }, 0);
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.includes('owl-poster.jpg')) image.src = 'images/owl-poster.jpg';
  }
  private showToast(message: string): void {
    this.toast.set(message);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 4000);
  }
}
