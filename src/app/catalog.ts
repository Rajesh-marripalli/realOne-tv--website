/** DEMO CATALOG ONLY. Replace every model, claim, and visual with retailer-approved data. */
export type DisplayCategory =
  | 'wall-tv'
  | 'smart-tv'
  | 'banner-tv'
  | 'big-screen'
  | 'advertising-tv'
  | 'video-wall'
  | 'outdoor-display'
  | 'interactive-panel'
  | 'professional-monitor'
  | 'gaming-monitor';

export interface DisplayCategoryInfo {
  id: DisplayCategory;
  name: string;
  short: string;
  description: string;
  icon: string;
  countLabel: string;
  image: string;
}

export interface TvProduct {
  id: string;
  name: string;
  size: number;
  category: DisplayCategory;
  categoryLabel: string;
  subtitle: string;
  feature: string;
  resolution: string;
  panel: string;
  refresh: string;
  brightness: string;
  system: string;
  sound: string;
  orientation: string;
  bestFor: string;
  ports: string;
  warranty: string;
  accent: string;
  image: string;
  number: string;
  highlights: string[];
}

export const NATURE_IMAGES = {
  lake: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85',
  aurora: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1800&q=85',
  mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85',
  tropical: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85',
  desert: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1800&q=85',
};

export const CATEGORIES: DisplayCategoryInfo[] = [
  { id:'wall-tv', name:'Wall TVs', short:'HOME LIVING', icon:'▣', countLabel:'01', description:'Sleek wall-mounted viewing for stylish spaces.', image:NATURE_IMAGES.lake },
  { id:'smart-tv', name:'Smart TVs', short:'ENTERTAINMENT', icon:'◈', countLabel:'02', description:'Streaming, sports and everyday entertainment.', image:NATURE_IMAGES.aurora },
  { id:'banner-tv', name:'Banner TVs', short:'PORTRAIT SIGNAGE', icon:'▯', countLabel:'03', description:'Tall and striking portrait displays for stores.', image:NATURE_IMAGES.forest },
  { id:'big-screen', name:'Big Screens', short:'LARGE FORMAT', icon:'▱', countLabel:'04', description:'Bring bigger stories to halls and venues.', image:NATURE_IMAGES.mountains },
  { id:'advertising-tv', name:'Advertising TVs', short:'DIGITAL SIGNAGE', icon:'✳', countLabel:'05', description:'A beautiful canvas for offers and promotions.', image:NATURE_IMAGES.desert },
  { id:'video-wall', name:'LED Video Walls', short:'MODULAR DISPLAY', icon:'▦', countLabel:'06', description:'Bold modular displays for unforgettable impact.', image:NATURE_IMAGES.aurora },
  { id:'outdoor-display', name:'Outdoor Screens', short:'ALL WEATHER', icon:'☀', countLabel:'07', description:'Bright signage concepts for outdoor spaces.', image:NATURE_IMAGES.tropical },
  { id:'interactive-panel', name:'Interactive Panels', short:'TOUCH & PRESENT', icon:'✧', countLabel:'08', description:'Modern presentation and classroom screens.', image:NATURE_IMAGES.forest },
  { id:'professional-monitor', name:'Professional Monitors', short:'WORKSTATION', icon:'▤', countLabel:'09', description:'Purposeful productivity and business displays.', image:NATURE_IMAGES.lake },
  { id:'gaming-monitor', name:'Gaming Monitors', short:'FAST RESPONSE', icon:'⌁', countLabel:'10', description:'Speed-focused visuals for players and creators.', image:NATURE_IMAGES.aurora },
];

// Illustration values are not validated hardware specifications. Update before any public launch.
export const PRODUCTS: TvProduct[] = [
  { id:'wall-43', name:'Aura Wall 43', size:43, category:'wall-tv', categoryLabel:'WALL TV', subtitle:'Beautifully slim. Made to belong.', feature:'Spaces reimagined', resolution:'4K UHD*', panel:'LED*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'Smart platform*', sound:'Stereo*', orientation:'Landscape', bestFor:'Bedrooms, living rooms', ports:'HDMI · USB*', warranty:'Confirm with seller', accent:'#a3d0c1', image:NATURE_IMAGES.lake, number:'01', highlights:['Wall-ready profile','Everyday streaming','Compact design'] },
  { id:'smart-55', name:'Vision Smart 55', size:55, category:'smart-tv', categoryLabel:'SMART TV', subtitle:'Every evening feels cinematic.', feature:'Living room favourite', resolution:'4K UHD*', panel:'QLED*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'Smart platform*', sound:'Surround-ready*', orientation:'Landscape', bestFor:'Home cinema, sports', ports:'HDMI · USB*', warranty:'Confirm with seller', accent:'#b8b8f0', image:NATURE_IMAGES.aurora, number:'02', highlights:['Rich colours','Smart entertainment','Balanced screen size'] },
  { id:'banner-49', name:'Banner Pro 49', size:49, category:'banner-tv', categoryLabel:'BANNER DISPLAY', subtitle:'Stand tall. Capture every glance.', feature:'Portrait showcase', resolution:'Full HD*', panel:'Commercial LCD*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'Media player option*', sound:'Optional*', orientation:'Portrait', bestFor:'Retail entryways, promotions', ports:'HDMI · USB*', warranty:'Confirm with seller', accent:'#ffc28e', image:NATURE_IMAGES.tropical, number:'03', highlights:['Portrait format','Store promotions','Slim vertical footprint'] },
  { id:'big-85', name:'CineMax 85', size:85, category:'big-screen', categoryLabel:'BIG SCREEN', subtitle:'Make every gathering monumental.', feature:'Large-format impact', resolution:'4K UHD*', panel:'LED*', refresh:'120 Hz*', brightness:'Confirm with seller', system:'Smart platform*', sound:'External audio suggested', orientation:'Landscape', bestFor:'Event halls, big rooms', ports:'HDMI · USB*', warranty:'Confirm with seller', accent:'#acd6ff', image:NATURE_IMAGES.mountains, number:'04', highlights:['Large viewing area','Group experiences','Big-screen impact'] },
  { id:'ads-55', name:'AdDisplay 55', size:55, category:'advertising-tv', categoryLabel:'ADVERTISING TV', subtitle:'Your message deserves centre stage.', feature:'Business attention', resolution:'4K UHD*', panel:'Commercial LCD*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'Signage player option*', sound:'Optional*', orientation:'Portrait / Landscape*', bestFor:'Menus, ads, announcements', ports:'HDMI · USB · LAN*', warranty:'Confirm with seller', accent:'#ffaeab', image:NATURE_IMAGES.desert, number:'05', highlights:['Digital posters','Rotating campaigns','Business use'] },
  { id:'video-108', name:'LED Wall Studio', size:108, category:'video-wall', categoryLabel:'LED VIDEO WALL', subtitle:'Go beyond the limits of one screen.', feature:'Modular scale', resolution:'Configuration-dependent', panel:'Direct-view LED*', refresh:'Configuration-dependent', brightness:'Configuration-dependent', system:'External controller*', sound:'External system', orientation:'Modular layout', bestFor:'Stages, retail walls, events', ports:'Controller-dependent', warranty:'Confirm with seller', accent:'#c2b7ff', image:NATURE_IMAGES.aurora, number:'06', highlights:['Modular sizing','Seamless-looking visuals','Installation planning'] },
  { id:'outdoor-65', name:'SunView Outdoor 65', size:65, category:'outdoor-display', categoryLabel:'OUTDOOR SIGNAGE', subtitle:'Designed to get noticed outside.', feature:'Bright outdoor concepts', resolution:'4K UHD*', panel:'High-brightness LCD*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'Signage player option*', sound:'Optional*', orientation:'Landscape / Portrait*', bestFor:'Storefronts, covered outdoors', ports:'HDMI · LAN*', warranty:'Confirm with seller', accent:'#b5e79b', image:NATURE_IMAGES.tropical, number:'07', highlights:['Outdoor use case','Visibility planning','Mounting consultation'] },
  { id:'touch-75', name:'TouchBoard 75', size:75, category:'interactive-panel', categoryLabel:'INTERACTIVE PANEL', subtitle:'Think bigger. Collaborate closer.', feature:'Teams and classrooms', resolution:'4K UHD*', panel:'Touch LCD*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'Embedded OS*', sound:'Built-in*', orientation:'Landscape', bestFor:'Boardrooms, education', ports:'USB-C · HDMI*', warranty:'Confirm with seller', accent:'#93d9db', image:NATURE_IMAGES.forest, number:'08', highlights:['Interactive touch concept','Meeting-friendly','Presentation use'] },
  { id:'pro-monitor-32', name:'Studio Monitor 32', size:32, category:'professional-monitor', categoryLabel:'PRO MONITOR', subtitle:'Precision for everyday work.', feature:'Desk essential', resolution:'4K UHD*', panel:'IPS*', refresh:'60 Hz*', brightness:'Confirm with seller', system:'External computer', sound:'Optional*', orientation:'Landscape', bestFor:'Office, design, productivity', ports:'HDMI · DisplayPort*', warranty:'Confirm with seller', accent:'#c7ded0', image:NATURE_IMAGES.lake, number:'09', highlights:['Workspace clarity','Professional look','Desktop friendly'] },
  { id:'gaming-27', name:'Velocity 27', size:27, category:'gaming-monitor', categoryLabel:'GAMING MONITOR', subtitle:'Get closer to every frame.', feature:'Fast-play concept', resolution:'QHD*', panel:'IPS*', refresh:'165 Hz*', brightness:'Confirm with seller', system:'External computer', sound:'Headphone output*', orientation:'Landscape', bestFor:'Gaming, content creation', ports:'HDMI · DisplayPort*', warranty:'Confirm with seller', accent:'#a7e8c8', image:NATURE_IMAGES.aurora, number:'10', highlights:['High refresh concept','Responsive visuals','Gaming setup'] },
];
