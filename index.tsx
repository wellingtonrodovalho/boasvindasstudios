import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Home, 
  Key, 
  MapPin, 
  LogOut, 
  AlertCircle, 
  Wifi, 
  Coffee, 
  Phone, 
  MessageCircle, 
  X, 
  Send,
  ChevronRight,
  Clipboard,
  CheckCircle2,
  Utensils,
  ArrowLeft,
  Lock,
  DoorOpen,
  Hash,
  LayoutGrid,
  Building2,
  Palmtree,
  ShoppingBag,
  Dumbbell,
  Sparkles,
  ExternalLink,
  HeartPulse,
  Pill,
  Landmark,
  Store,
  CreditCard,
  Tv,
  Zap,
  UserCheck,
  ChevronDown,
  Info,
  Paperclip,
  Trash2,
  ScrollText,
  Ban,
  Moon,
  Wind,
  Flame,
  Mail,
  QrCode,
  Clock,
  Bath,
  Search,
  DoorClosed,
  Droplets,
  ChevronUp,
  Download,
  Play,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---
type Section = 'home' | 'studio' | 'checkin' | 'casa' | 'local' | 'checkout' | 'emergencia';
type Category = 'todos' | 'saude' | 'lazer' | 'compras' | 'bancos' | 'feiras' | 'gastronomia';

const STUDIO_INFO = {
  name: "Studio Ipê",
  units: ["101A", "101B"],
  address: "Setor Bueno, Goiânia",
  wifi: "Studio_Ipe",
  wifiPass: "RT45101Ipe",
  checkinTime: "14:00",
  checkoutTime: "11:00",
  keySafeCode: "0906",
  hostWhatsapp: "5562991514568",
  emergencyContacts: [
    { name: "Suporte Anfitrião (Wellington)", number: "62 99151-4568", type: 'whatsapp' },
    { name: "Polícia Militar do Estado de Goiás", number: "190", type: 'phone' },
    { name: "SAMU - Atendimento Móvel de Urgência", number: "192", type: 'phone' },
    { name: "Corpo de Bombeiros", number: "193", type: 'phone' },
    { name: "Polícia Federal", number: "194", type: 'phone' },
    { name: "Polícia Civil", number: "197", type: 'phone' },
    { name: "Guarda Municipal", number: "153", type: 'phone' },
    { name: "Hospital Estadual de Urgências de Goiás", number: "62 3201-4455", type: 'phone' },
    { name: "DEAM – Delegacia da Mulher", number: "62 3201-2801", type: 'phone' },
    { name: "DEAI – Delegacia do Idoso", number: "62 3201-1501", type: 'phone' },
    { name: "Ministério Público de Goiás", number: "62 3243-8000", type: 'phone' },
    { name: "Ministério Público Federal", number: "62 3243-5400", type: 'phone' }
  ]
};

const CATEGORIES: { id: Category, label: string, icon: any, color: string }[] = [
  { id: 'todos', label: 'Todos', icon: LayoutGrid, color: 'bg-[#009B3A]' },
  { id: 'saude', label: 'Saúde', icon: HeartPulse, color: 'bg-[#002776]' },
  { id: 'lazer', label: 'Lazer', icon: Palmtree, color: 'bg-[#009B3A]' },
  { id: 'compras', label: 'Compras', icon: ShoppingBag, color: 'bg-yellow-500' },
  { id: 'bancos', label: 'Bancos', icon: Landmark, color: 'bg-[#002776]' },
  { id: 'feiras', label: 'Feiras', icon: Store, color: 'bg-emerald-700' },
  { id: 'gastronomia', label: 'Comer', icon: Coffee, color: 'bg-amber-600' },
];

const getMapsLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + " Goiânia")}`;

const LOCAL_PLACES = [
  { category: 'compras', title: 'Hiper Mercado Moreira', desc: 'Mercado completo e tradicional da região.', icon: ShoppingBag, href: getMapsLink("Hiper Mercado Moreira") },
  { category: 'saude', title: 'Hospital Neurológico', desc: 'Referência em neurologia e pronto atendimento.', icon: HeartPulse, href: getMapsLink("Hospital Neurológico") },
  { category: 'saude', title: 'Drogaria Medfácil', desc: 'Farmácia próxima com entrega.', icon: Pill, href: getMapsLink("Drogaria Medfácil") },
  { category: 'lazer', title: 'Zoológico de Goiânia', desc: 'Passeio clássico para famílias e crianças.', icon: Palmtree, href: getMapsLink("Zoológico de Goiânia") },
  { category: 'lazer', title: 'Parque Vaca Brava', desc: 'O coração do Setor Bueno, ótimo para caminhadas.', icon: Palmtree, href: getMapsLink("Parque Vaca Brava") },
  { category: 'lazer', title: 'Parque Flamboyant', desc: 'Trilhas, lagos e área verde urbana.', icon: Palmtree, href: getMapsLink("Parque Flamboyant") },
  { category: 'compras', title: 'Goiânia Shopping', desc: 'Shopping moderno com diversas opções no Bueno.', icon: ShoppingBag, href: getMapsLink("Goiânia Shopping") },
  { category: 'bancos', title: 'Banco do Brasil', icon: CreditCard, href: getMapsLink("Banco do Brasil") },
  { category: 'bancos', title: 'Itaú', icon: CreditCard, href: getMapsLink("Itaú") },
  { category: 'feiras', title: 'Feira do Sol', desc: 'Domingos, a partir das 15h na Praça do Sol.', icon: Store, href: getMapsLink("Feira do Sol") },
  { category: 'gastronomia', title: 'Engenho Restaurante', desc: 'Cozinha típica com buffet variado.', icon: Utensils, href: getMapsLink("Engenho Restaurante") },
  { category: 'gastronomia', title: 'Colonial Biscoiteria', desc: 'Padaria e confeitaria favorita.', icon: Coffee, href: "https://maps.app.goo.gl/78ybtPDBmPYUcvnU6" },
  { category: 'gastronomia', title: 'Smart Fit', desc: 'Academia completa para o seu treino.', icon: Dumbbell, href: "https://maps.app.goo.gl/2wPMes7xJxm5jXJG6" },
];

// --- Components ---
const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M256 460V180" stroke="#009B3A" strokeWidth="44" strokeLinecap="round"/>
    <path d="M256 380L120 280" stroke="#009B3A" strokeWidth="44" strokeLinecap="round"/>
    <path d="M256 380L392 280" stroke="#009B3A" strokeWidth="44" strokeLinecap="round"/>
    <circle cx="256" cy="150" r="110" fill="#FEE101"/>
    <circle cx="90" cy="300" r="95" fill="#002776"/>
    <circle cx="422" cy="300" r="95" fill="#009B3A"/>
  </svg>
);

const Header = ({ title }: { title: string, onBack?: () => void }) => (
  <div className="flex items-center gap-3 py-3 border-b border-[#009B3A]/10 mb-5 bg-[#009B3A]/5 p-3.5 rounded-2xl">
    <div className="w-2.5 h-6 bg-[#009B3A] rounded-full"></div>
    <h2 className="text-lg font-black text-[#002776] tracking-tight uppercase">{title}</h2>
  </div>
);

const Card = ({ title, icon: Icon, color, onClick }: { title: string, icon: any, color: string, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full p-5 flex items-center justify-between rounded-2xl bg-white shadow-sm border border-gray-100 group transition-all hover:shadow-md h-full text-left"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} shadow-sm group-hover:shadow-emerald-200 transition-all flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-lg font-semibold text-gray-700 leading-tight">{title}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#002776] transition-colors flex-shrink-0" />
  </motion.button>
);

const LocalSectionItem: React.FC<{ title: string, desc?: string, icon: any, href: string, color?: string }> = ({ title, desc, icon: Icon, href, color }) => (
  <motion.a 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:border-[#009B3A] transition-all group active:scale-[0.98] h-full"
  >
    <div className={`w-10 h-10 ${color || 'bg-[#009B3A]/10'} rounded-xl flex-shrink-0 flex items-center justify-center font-black transition-colors`}>
      <Icon className={`w-5 h-5 ${color ? 'text-white' : 'text-[#009B3A]'}`} />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-gray-800 text-sm tracking-tight">{title}</h4>
        <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-[#002776]" />
      </div>
      {desc && <p className="text-gray-500 text-[11px] leading-relaxed">{desc}</p>}
    </div>
  </motion.a>
);

const NAVIGATION_TABS = [
  { id: 'studio' as Section, title: 'Nosso Studio', icon: Home },
  { id: 'checkin' as Section, title: 'Check-In', icon: Key },
  { id: 'casa' as Section, title: 'Guia Studio', icon: LayoutGrid },
  { id: 'local' as Section, title: 'Guia Local', icon: MapPin },
  { id: 'checkout' as Section, title: 'Checkout', icon: LogOut },
  { id: 'emergencia' as Section, title: 'Emergências', icon: AlertCircle },
];

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCoffeeTutorial, setShowCoffeeTutorial] = useState(false);
  const [showTrashGuide, setShowTrashGuide] = useState(false);

  // Index of searchable content
  const searchableContent = useMemo(() => {
    const items: { label: string, desc?: string, section?: Section, href?: string, icon: any, category?: string }[] = [
      // Sections
      { label: 'Nosso Studio', desc: 'Informações sobre as unidades 101A e 101B', section: 'studio', icon: Home },
      { label: 'Check-in', desc: 'Instruções de acesso e cofre de chaves', section: 'checkin', icon: Key },
      { label: 'Guia do Studio', desc: 'Regras da casa, Wifi e limpeza', section: 'casa', icon: LayoutGrid },
      { label: 'Guia Local', desc: 'Restaurantes, shoppings e lazer na região', section: 'local', icon: MapPin },
      { label: 'Checkout', desc: 'Procedimentos de saída e devolução da TAG', section: 'checkout', icon: LogOut },
      { label: 'Emergências', desc: 'Contatos úteis e endereço de socorro', section: 'emergencia', icon: AlertCircle },
      // Specific Info
      { label: 'Cafeteira Tres Corações', desc: 'Guia passo a passo de como usar a cafeteira elétrica', section: 'casa', icon: Coffee },
      { label: 'Wifi', desc: `Rede: ${STUDIO_INFO.wifi} | Senha: ${STUDIO_INFO.wifiPass}`, section: 'casa', icon: Wifi },
      { label: 'Lixo', desc: 'Descarte nas lixeiras do térreo', section: 'casa', icon: Trash2 },
      { label: 'Ar Condicionado', desc: 'Controles na cabeceira ou bancada', section: 'casa', icon: Tv },
      { label: 'Elevador', desc: 'Andar 1, saindo à esquerda', section: 'checkin', icon: Building2 },
    ];

    // Add all local places
    LOCAL_PLACES.forEach(place => {
      items.push({
        label: place.title,
        desc: place.desc,
        href: place.href,
        icon: place.icon,
        category: CATEGORIES.find(c => c.id === place.category)?.label
      });
    });

    // Add emergency contacts
    STUDIO_INFO.emergencyContacts.forEach(contact => {
      items.push({
        label: contact.name,
        desc: contact.number,
        section: 'emergencia',
        icon: contact.type === 'whatsapp' ? MessageCircle : Phone
      });
    });

    return items;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const normalizedSearch = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return searchableContent.filter(item => {
      const label = item.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const desc = (item.desc || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return label.includes(normalizedSearch) || desc.includes(normalizedSearch);
    });
  }, [searchTerm, searchableContent]);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'todos') return LOCAL_PLACES;
    return LOCAL_PLACES.filter(place => place.category === activeCategory);
  }, [activeCategory]);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="p-6 space-y-8 pb-24 max-w-5xl mx-auto animate-in fade-in duration-700">
            <header className="pt-12 flex flex-col items-center text-center gap-6 pb-8">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center shadow-2xl rotate-3 border-4 border-amber-500 overflow-hidden p-6"
              >
                <Logo className="w-full h-full" />
              </motion.div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter italic">{STUDIO_INFO.name}</h1>
                <p className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Welcome Home • Bueno</p>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-md mx-auto relative mt-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="O que você está procurando?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-sm border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-300 transition-all text-gray-800 placeholder:text-gray-400"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Live Search Results */}
                <AnimatePresence>
                  {searchTerm.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-amber-50 overflow-hidden z-[100] max-h-[60vh] overflow-y-auto hide-scrollbar p-2"
                    >
                      {searchResults.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.map((item, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                if (item.label.toLowerCase().includes('cafeteira')) setShowCoffeeTutorial(true);
                                if (item.section) setActiveSection(item.section);
                                else if (item.href) window.open(item.href, '_blank');
                                setSearchTerm('');
                              }}
                              className="w-full flex items-center gap-4 p-4 hover:bg-amber-50 rounded-2xl transition-all text-left group"
                            >
                              <div className="p-3 bg-amber-100 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                <item.icon className="w-5 h-5" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="font-bold text-gray-800 text-sm truncate">{item.label}</h4>
                                {item.desc && <p className="text-[10px] text-gray-500 truncate">{item.desc}</p>}
                                {item.category && <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-[8px] font-black uppercase text-gray-500 rounded-full">{item.category}</span>}
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-12 text-center space-y-3">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-6 h-6 text-gray-200" />
                          </div>
                          <p className="text-sm text-gray-500 font-medium italic">Nenhum resultado encontrado para "{searchTerm}"</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </header>
            
            {!searchTerm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card title="Nosso Studio" icon={Home} color="bg-amber-600" onClick={() => setActiveSection('studio')} />
                <Card title="Check-in" icon={Key} color="bg-emerald-600" onClick={() => setActiveSection('checkin')} />
                <Card title="Guia do Studio" icon={LayoutGrid} color="bg-amber-500" onClick={() => setActiveSection('casa')} />
                <Card title="Guia Local" icon={MapPin} color="bg-sky-600" onClick={() => setActiveSection('local')} />
                <Card title="Checkout" icon={LogOut} color="bg-rose-600" onClick={() => setActiveSection('checkout')} />
                <Card title="Emergências" icon={AlertCircle} color="bg-red-700" onClick={() => setActiveSection('emergencia')} />
              </div>
            )}
          </div>
        );
      case 'studio':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-3xl mx-auto">
            <Header title="Nosso Studio" onBack={() => setActiveSection('home')} />
            <div className="p-6 space-y-6 pb-24">
              <div className="flex gap-2">
                {STUDIO_INFO.units.map(u => (
                  <span key={u} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Unidade {u}</span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Seu Refúgio Ideal: Conforto e Praticidade em um Local Privilegiado</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 prose prose-sm text-gray-600 leading-relaxed max-w-none">
                <div className="space-y-4">
                  <p>Bem-vindo ao seu novo lar temporário! Nosso estúdio é a escolha perfeita para quem busca conforto, praticidade e uma localização privilegiada no <strong>Setor Bueno</strong>.</p>
                  <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 space-y-3">
                    <h4 className="font-bold text-amber-900 flex items-center gap-2"><MapPin className="w-4 h-4"/> Localização Imbatível</h4>
                    <p className="text-xs">Situado em uma região vibrante e rica em comércio, você terá tudo o que precisa ao seu alcance. Estamos próximos ao Hiper Mercado Moreira, hospitais, clínicas e ao zoológico.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500"/> Conforto e Funcionalidade</h4>
                    <p className="text-xs">Acomoda até <strong>3 e 4 pessoas</strong>. Totalmente mobiliado com cama de casal e sofá-cama. Cozinha equipada com <strong>cooktop e geladeira</strong>, além de ar condicionado e Smart TV.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'checkin':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto">
            <Header title="Check-in" onBack={() => setActiveSection('home')} />
            <div className="p-6 space-y-8 pb-24">
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
                <UserCheck className="w-12 h-12 text-emerald-500 flex-shrink-0" />
                <div>
                  <h3 className="text-emerald-900 font-bold text-lg md:text-xl">Seja bem-vindo(a)! 👋</h3>
                  <p className="text-emerald-700 text-xs md:text-sm font-medium leading-relaxed">Siga as instruções abaixo para o seu primeiro acesso ao {STUDIO_INFO.name}. Atenção aos procedimentos de segurança. 🔒</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">I</div>
                    <h4 className="font-bold text-gray-800 text-lg">Cofre de Chaves</h4>
                  </div>
                  <div className="flex items-start gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                    <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">Localize o <strong>cofre (cadeado preto)</strong> no <strong>poste amarelo</strong> na calçada.</p>
                  </div>
                  <div className="space-y-3 pl-4 border-l-2 border-amber-100">
                    <div className="flex gap-3 bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <Lock className="w-4 h-4 text-amber-700 mt-0.5" />
                      <p className="text-sm text-amber-900 font-bold">Senha: {STUDIO_INFO.keySafeCode}</p>
                    </div>
                    <p className="text-xs text-gray-600">Pressione o botão de liberação esquerdo. Retire a chave e a tag. 🔑</p>
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-3 mt-2">
                      <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-rose-900 font-bold leading-tight">Embaralhe os números após fechar!</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">II</div>
                    <h4 className="font-bold text-gray-800 text-lg">Acesso e Elevador</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-rose-500 p-2 rounded-lg text-white shadow-sm flex-shrink-0"><DoorOpen className="w-5 h-5" /></div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800 text-sm">Portão Vermelho</p>
                        <p className="text-xs text-gray-500 leading-tight">Use a tag no leitor. Interfone desativado.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-700 flex-shrink-0"><Building2 className="w-5 h-5" /></div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800 text-sm">Elevador</p>
                        <p className="text-xs text-gray-500 font-bold">Andar 1. ⬆️</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <section className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">III</div>
                  <h4 className="font-bold text-gray-800 text-lg">Unidade e Fechadura</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                    <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">Localização</p>
                      <p className="text-xs text-amber-800">Saindo do elevador, esquerda até o final do corredor.</p>
                    </div>
                  </div>
                  <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                      <Lock className="w-20 h-20" />
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.3em]">Senha Digital</p>
                      <p className="text-xl font-mono tracking-tighter">
                        <span className="text-amber-500">*</span> ddd + prefixo <span className="text-amber-500">#</span>
                      </p>
                      <p className="text-[10px] text-gray-400">Ex: Celular 62 98545-1980 &rarr; <strong>*6298545#</strong></p>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="text-center py-8 space-y-4">
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic px-6">"Agradecemos a colaboração e desejamos uma excelente estadia!" 😊</p>
                <div className="space-y-1">
                   <p className="text-[10px] text-amber-600 uppercase font-black tracking-widest">Atenciosamente,</p>
                   <p className="text-lg font-black text-gray-900 tracking-tight">Wellington Rodovalho</p>
                </div>
              </footer>
            </div>
          </div>
        );
      case 'casa':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto">
            <Header title="Guia do Studio" onBack={() => setActiveSection('home')} />
            <div className="p-6 space-y-10 pb-24">
              
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-6 py-4 w-full lg:w-1/3">
                  <div className="text-center space-y-1">
                    <h2 className="text-3xl font-bold tracking-tighter italic text-gray-800">{STUDIO_INFO.name}</h2>
                    <div className="w-16 h-0.5 bg-amber-200 mx-auto"></div>
                  </div>
                  <div className="bg-black text-white p-3 rounded-full flex items-center justify-center gap-3 px-8 shadow-xl">
                    <Wifi className="w-8 h-8" />
                    <span className="text-3xl font-black italic tracking-tighter">Wi Fi</span>
                  </div>
                  <div className="relative w-full max-w-xs group mx-auto">
                    <div className="absolute -top-4 right-8 z-10 transform rotate-12 group-hover:rotate-0 transition-transform">
                      <Paperclip className="w-10 h-10 text-gray-600 drop-shadow-md" />
                    </div>
                    <div className="bg-[#f2eadc] p-8 rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.1)] border-b-[3px] border-r-[3px] border-[#e0d3be] flex flex-col items-center gap-6 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="flex-1 bg-[#fdfaf5] h-full rounded-t-full -mt-1"></div>
                        ))}
                      </div>
                      
                      {/* QR Code Section */}
                      <div className="w-full space-y-4 text-center">
                          <div className="bg-white p-4 rounded-xl shadow-inner inline-block mx-auto">
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`WIFI:S:${STUDIO_INFO.wifi};T:WPA;P:${STUDIO_INFO.wifiPass};;`)}`} 
                              alt="Wifi QR Code" 
                              className="w-32 h-32 md:w-40 md:h-40"
                            />
                            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Escaneie para Conectar</p>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-1">
                               <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">Rede</h4>
                               <p className="text-base font-bold text-gray-700 font-mono tracking-tight">{STUDIO_INFO.wifi}</p>
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">Senha</h4>
                               <p className="text-base font-bold text-gray-700 font-mono tracking-tight">{STUDIO_INFO.wifiPass}</p>
                            </div>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 w-full mt-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(STUDIO_INFO.wifiPass); 
                            alert("Senha copiada! Agora basta selecionar a rede e colar a senha.");
                          }} 
                          className="w-full bg-white py-3 rounded-xl shadow-sm border border-amber-100 flex items-center justify-center gap-2 text-xs font-black uppercase text-amber-700 active:scale-95 transition-all hover:bg-amber-50"
                        >
                          <Clipboard className="w-4 h-4"/> Copiar Senha
                        </button>
                        
                        <a 
                          href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(`WIFI:S:${STUDIO_INFO.wifi};T:WPA;P:${STUDIO_INFO.wifiPass};;`)}`}
                          download="wifi-qrcode.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-amber-500 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs font-black uppercase text-white active:scale-95 transition-all hover:bg-amber-600"
                        >
                          <QrCode className="w-4 h-4"/> Ver QR Code Ampliado
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-grow space-y-8 w-full lg:w-2/3">
                  <section className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-emerald-500" />
                      <h4 className="font-bold text-gray-800 text-lg">🧹 Limpeza</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Entregue limpo e higienizado com enxoval proporcional aos hóspedes.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                      <p className="text-xs text-emerald-800 font-bold">
                        Limpeza extra (com troca de enxoval): <strong>R$ 120,00</strong>.
                      </p>
                    </div>
                  </section>

                  <section className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <ScrollText className="w-6 h-6 text-sky-600" />
                      <h4 className="font-bold text-gray-800 text-lg">📋 Condomínio</h4>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100">
                      <p className="text-xs text-sky-800 font-bold">Aviso: Não circular sem camisa nas áreas comuns.</p>
                    </div>
                    <p className="text-xs text-gray-600">Mantenha o silêncio entre <strong>22h e 8h</strong>. Respeite as regras para evitar multas.</p>
                    
                    <div className="pt-2 border-t border-gray-50 space-y-3">
                      <p className="text-[10px] text-gray-500 leading-relaxed italic">
                        Qualquer infração será de <span className="text-rose-600 font-bold text-[11px]">inteira responsabilidade do titular da reserva</span>. Por favor, leia atentamente a convenção.
                      </p>
                      <a 
                        href="https://drive.google.com/file/d/1cLtVy5XkgvhI5Tv7EO_EmMcmPc8I_Gzu/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-sky-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-sky-700 transition-all shadow-md active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4" /> Ver Convenção Completa
                      </a>
                    </div>
                  </section>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 flex items-start gap-4 shadow-sm">
                  <Ban className="w-6 h-6 text-rose-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-rose-900 text-sm">🚭 Fumar</h4>
                    <p className="text-[10px] text-rose-800 mt-1 leading-tight">Proibido internamente. Use os bancos na calçada.</p>
                  </div>
                </div>
                <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-400 text-sm">✔ TAG</h4>
                    <p className="text-[10px] text-gray-300 mt-1 leading-tight">Deixar dentro do apartamento na bancada de pedra.</p>
                  </div>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTrashGuide(true)}
                  className="bg-emerald-50/40 p-6 rounded-3xl border border-[#009B3A]/20 flex items-start gap-4 shadow-sm text-left group hover:border-[#009B3A] transition-all"
                >
                  <Trash2 className="w-6 h-6 text-[#009B3A] flex-shrink-0 group-hover:rotate-12 transition-transform" />
                  <div>
                    <h4 className="font-bold text-[#002776] text-sm">🗑 Lixo & Reciclagem</h4>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight font-bold text-[#009B3A]">Ver guia completo de descarte &rarr;</p>
                  </div>
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCoffeeTutorial(true)}
                  className="bg-amber-50 p-6 rounded-3xl border border-amber-200 flex items-start gap-4 shadow-sm text-left group"
                >
                  <Coffee className="w-6 h-6 text-amber-600 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">☕ Cafeteira</h4>
                    <p className="text-[10px] text-amber-700 mt-1 leading-tight font-bold">Ver guia passo a passo Tres Corações &rarr;</p>
                  </div>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2 flex items-center gap-3">
                  <Tv className="w-8 h-8 text-amber-500 flex-shrink-0"/>
                  <div><h5 className="font-bold text-xs uppercase">Controles</h5><p className="text-[10px] text-gray-500">Na cabeceira ou bancada.</p></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2 flex items-center gap-3">
                  <Utensils className="w-8 h-8 text-emerald-500 flex-shrink-0"/>
                  <div><h5 className="font-bold text-xs uppercase">Cozinha</h5><p className="text-[10px] text-gray-500">Favor lavar e guardar louça.</p></div>
                </div>
                <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 shadow-sm flex items-center gap-3">
                  <Flame className="w-8 h-8 text-rose-500 flex-shrink-0"/>
                  <div><h5 className="font-bold text-xs uppercase">Segurança</h5><p className="text-[10px] text-rose-800">Use escadas em caso de fogo.</p></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'local':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto">
            <Header title="Guia Local" onBack={() => setActiveSection('home')} />
            <div className="p-6 bg-white border-b border-amber-50 sticky top-[72px] z-30">
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all min-w-[70px] ${cat.color} ${activeCategory === cat.id ? 'text-white shadow-lg scale-105 z-10' : 'bg-amber-50 text-gray-500 opacity-60'}`}>
                    <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : 'text-amber-600'}`} />
                    <span className="text-[10px] font-bold uppercase text-center truncate w-full">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
              <AnimatePresence mode="popLayout">
                {filteredPlaces.length > 0 ? filteredPlaces.map((place) => (
                  <LocalSectionItem key={place.title} title={place.title} desc={place.desc} icon={place.icon} href={place.href} color={CATEGORIES.find(c => c.id === place.category)?.color} />
                )) : <div className="col-span-full text-center py-12 text-gray-400 font-medium">Nenhum local cadastrado nesta categoria.</div>}
              </AnimatePresence>
            </div>
          </div>
        );
      case 'checkout':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto">
            <Header title="Checkout" onBack={() => setActiveSection('home')} />
            <div className="p-6 space-y-8 pb-24">
              <div className="text-center space-y-4">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                  <LogOut className="w-16 h-16 md:w-20 md:h-20 text-rose-500 mx-auto" />
                </motion.div>
                <h3 className="text-2xl md:text-4xl font-black text-rose-900 tracking-tight">Como será seu check-out:</h3>
                <p className="text-sm text-gray-500 italic">Esperamos que sua estadia tenha sido memorável!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
                  <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-md flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">🕚 Horário</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      O check-out deve ser feito até as <strong>11h</strong>.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
                  <div className="bg-sky-500 p-3 rounded-2xl text-white shadow-md flex-shrink-0">
                    <Bath className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">🧺 Toalhas</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      Por gentileza, recolha as toalhas usadas e estenda-as para facilitar a secagem.
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTrashGuide(true)}
                  className="bg-white p-6 rounded-3xl border border-emerald-100 hover:border-[#009B3A] shadow-sm flex items-start gap-4 text-left group transition-all w-full"
                >
                  <div className="bg-[#009B3A] p-3 rounded-2xl text-white shadow-md flex-shrink-0 group-hover:rotate-6 transition-transform">
                    <Trash2 className="w-6 h-6 text-[#FEE101]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002776] text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                      🗑️ Lixo & Reciclagem <span className="text-[10px] text-[#009B3A] lowercase font-bold font-sans">Ver Guia</span>
                    </h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      Deposite o lixo nas lixeiras localizadas no térreo (atrás da recepção). Clique para ver as instruções de reciclagem.
                    </p>
                  </div>
                </motion.button>
                <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-md flex-shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">🔌 Desligue os equipamentos</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      Antes de sair, certifique-se de desligar todos os aparelhos eletrônicos que não estiverem em uso.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
                  <div className="bg-indigo-500 p-3 rounded-2xl text-white shadow-md flex-shrink-0">
                    <DoorClosed className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">🚪 Feche tudo</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      Verifique se todas as portas e janelas estão devidamente fechadas e trancadas.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
                  <div className="bg-rose-500 p-3 rounded-2xl text-white shadow-md flex-shrink-0">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">🧳 Objetos pessoais</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      Dê uma última olhada nas tomadas, embaixo da cama e do sofá, e dentro do guarda-roupas. Não esqueça carregadores e pertences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <Key className="w-32 h-32" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-amber-400">
                    <Mail className="w-8 h-8" />
                    <h4 className="text-xl font-black uppercase tracking-tight italic">🔑 Devolução da TAG</h4>
                  </div>
                  <p className="text-gray-300 font-medium leading-relaxed">
                    Antes de sair, deixe a TAG dentro do apartamento <strong>sobre a bancada de pedra</strong>.
                  </p>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 border-l-4 border-amber-500 mt-4">
                    <p className="text-xs md:text-sm text-amber-100 leading-relaxed font-bold">
                      Certifique-se de que a porta esteja devidamente trancada ao sair.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'emergencia':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-3xl mx-auto">
            <Header title="Emergências" onBack={() => setActiveSection('home')} />
            <div className="p-6 space-y-4 pb-24">
              <div className="bg-red-50 p-6 rounded-3xl border border-red-100 mb-4 shadow-sm">
                <p className="text-xs text-red-800 font-bold uppercase tracking-widest mb-1">Localização para Socorro</p>
                <p className="text-lg md:text-xl font-black text-red-900 tracking-tight">{STUDIO_INFO.address}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STUDIO_INFO.emergencyContacts.map((contact, i) => {
                  const isWhatsapp = contact.type === 'whatsapp';
                  const href = isWhatsapp 
                    ? `https://wa.me/55${contact.number.replace(/\D/g, '')}`
                    : `tel:${contact.number.replace(/\D/g, '')}`;

                  return (
                    <a 
                      key={i} 
                      href={href} 
                      target={isWhatsapp ? "_blank" : "_self"}
                      rel={isWhatsapp ? "noopener noreferrer" : ""}
                      className={`flex justify-between items-center p-6 rounded-3xl border shadow-sm active:scale-95 transition-all ${isWhatsapp ? 'bg-[#E7F9EE] border-[#25D366]/20' : 'bg-white border-red-100'}`}
                    >
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-gray-800 text-sm truncate">{contact.name}</h4>
                        <p className={`font-black text-xl tracking-tighter ${isWhatsapp ? 'text-[#075E54]' : 'text-red-600'}`}>{contact.number}</p>
                      </div>
                      <div className={`p-3 rounded-full ${isWhatsapp ? 'bg-[#25D366] shadow-emerald-200' : 'bg-red-50 shadow-red-100'} shadow-lg flex-shrink-0 ml-4`}>
                        {isWhatsapp ? (
                          <MessageCircle className="text-white w-6 h-6" />
                        ) : (
                          <Phone className="text-red-600 w-6 h-6" />
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faf4] flex flex-col relative antialiased selection:bg-yellow-200 selection:text-[#002776] text-gray-900">
      
      {/* Dynamic Header Clima da Copa */}
      <header className="sticky top-0 z-50 w-full bg-[#009B3A] text-white py-3 px-4 shadow-md border-b-[5px] border-[#FEE101]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => { setActiveSection('home'); setSearchTerm(''); }} 
            className="flex items-center gap-2.5 text-left hover:opacity-95 active:scale-95 transition-all"
            title="Ir para a Página Inicial"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-inner">
              <Logo className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tighter uppercase flex items-center gap-1.5 leading-none">
                {STUDIO_INFO.name} <span className="text-[#FEE101] text-xs">🇧🇷 Copa</span>
              </h1>
              <p className="text-[9px] text-yellow-100 font-bold uppercase tracking-widest leading-none mt-0.5">Bueno • Goiânia</p>
            </div>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="hidden xs:inline-block px-2.5 py-1 bg-[#002776] text-white border border-white/20 text-[9px] font-black rounded-lg uppercase tracking-wider shadow-sm animate-pulse">
              Rumo ao Hexa! ⚽️🏆
            </span>
          </div>
        </div>
      </header>

      {/* Persistent & Compact Navigation Tabs - Always visible & fixed at the top */}
      <nav className="sticky top-[69px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#009B3A]/20 shadow-sm py-2 px-3">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
            {NAVIGATION_TABS.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id);
                    setSearchTerm(''); // Reset search when navigating sections
                  }}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-1.5 p-1.5 md:p-2.5 rounded-xl border transition-all active:scale-95 ${
                    isActive 
                      ? 'bg-[#009B3A] text-white border-[#FEE101] shadow-md scale-[1.01]' 
                      : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-100'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#FEE101]' : 'text-[#009B3A]'}`} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className={`text-[10px] md:text-xs font-bold leading-none truncate ${isActive ? 'text-white font-black' : 'text-gray-700'}`}>
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Render */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-6 py-6 pb-24">
        {renderContent()}
      </main>

      <AnimatePresence>
        {showCoffeeTutorial && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto border-4 border-[#009B3A]"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#009B3A]/5">
                <div className="flex items-center gap-3 text-[#009B3A]">
                  <div className="p-2 bg-[#009B3A] rounded-xl text-white">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight uppercase">Tutorial Cafeteira Tres</h3>
                </div>
                <button onClick={() => setShowCoffeeTutorial(false)} className="p-2 hover:bg-[#009B3A]/10 rounded-full text-[#009B3A] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-8 hide-scrollbar">
                <div className="grid grid-cols-1 gap-8">
                  {[
                    { title: "Energia", desc: "Conecte o cabo na tomada. Atenção: A rede do prédio é 220V.", icon: Zap, color: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600" },
                    { title: "Água", desc: "Encha o reservatório traseiro com água filtrada até o nível indicado.", icon: Droplets, color: "bg-sky-500", light: "bg-sky-50", text: "text-sky-500" },
                    { title: "Cápsulas", desc: "Escolha sua cápsula favorita no suporte que deixamos para você.", icon: LayoutGrid, color: "bg-orange-600", light: "bg-orange-50", text: "text-orange-600" },
                    { title: "Preparar", desc: "Levante a alavanca superior para abrir o compartimento de cápsulas.", icon: ChevronUp, color: "bg-gray-700", light: "bg-gray-50", text: "text-gray-700" },
                    { title: "Inserir", desc: "Coloque a cápsula na gaveta interna conforme o encaixe.", icon: Download, color: "bg-amber-800", light: "bg-amber-50", text: "text-amber-800" },
                    { title: "Iniciar", desc: "Feche a alavanca e pressione o botão correspondente à cor da cápsula.", icon: Play, color: "bg-emerald-600", light: "bg-emerald-50", text: "text-emerald-600" },
                    { title: "Pronto!", desc: "Aguarde o preparo. A luz ficará fixa quando terminar. Bom café!", icon: Coffee, color: "bg-rose-600", light: "bg-rose-50", text: "text-rose-600" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-6 items-center pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className={`w-full md:w-4/12 aspect-square rounded-3xl overflow-hidden shadow-lg border-4 flex-shrink-0 flex items-center justify-center relative ${step.light} ${step.color.replace('bg-', 'border-').replace('600', '200').replace('500', '200').replace('800', '200').replace('700', '200')}`}>
                        <step.icon className={`w-16 h-16 ${step.text}`} strokeWidth={1.5} />
                        <div className={`absolute top-4 left-4 w-8 h-8 ${step.color} text-white rounded-full flex items-center justify-center font-bold shadow-md text-sm`}>
                          {idx + 1}
                        </div>
                      </div>
                      <div className="w-full md:w-8/12 space-y-3">
                        <h4 className={`font-black text-2xl uppercase tracking-tighter ${step.text}`}>{step.title}</h4>
                        <p className="text-gray-600 text-base leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Visual Section for "Cafézinho" */}
                <div className="pt-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }} 
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-[#009B3A]/20"
                    >
                      <Coffee className="w-12 h-12 text-[#009B3A]" strokeWidth={1.5} />
                    </motion.div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#009B3A] rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-3 h-3 text-[#FEE101] fill-current" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-[#002776] uppercase tracking-widest text-sm">Aproveite seu café</h5>
                    <p className="text-xs text-[#009B3A] italic font-semibold">Feito com carinho no Studio Ipê</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t flex gap-4">
                <button 
                  onClick={() => setShowCoffeeTutorial(false)} 
                  className="w-full bg-[#009B3A] text-[#FEE101] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#007A2E] transition-all shadow-xl active:scale-95"
                >
                  Entendi, quero café!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showTrashGuide && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto border-4 border-[#009B3A]"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#009B3A]/5">
                <div className="flex items-center gap-3 text-[#009B3A]">
                  <div className="p-2 bg-[#009B3A] rounded-xl text-white">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight uppercase">Guia de Lixo e Descarte 🇧🇷</h3>
                </div>
                <button onClick={() => setShowTrashGuide(false)} className="p-2 hover:bg-[#009B3A]/10 rounded-full text-[#009B3A] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6 hide-scrollbar">
                {/* The Main Image requested by the user */}
                <div className="relative rounded-2xl overflow-hidden border border-[#009B3A]/20 shadow-md">
                  <img 
                    src="input_file_0.png" 
                    alt="Guia Descarte Correto" 
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Highly structured, copyable and accessible summary matching the image content */}
                <div className="bg-[#f4faf4] p-5 rounded-2xl border border-[#009B3A]/10 space-y-4 text-left">
                  <h4 className="font-bold text-[#002776] text-sm uppercase tracking-wider flex items-center gap-2">
                    ⚽ Informações Importantes do Condomínio
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-[#009B3A]/10 space-y-2">
                      <h5 className="font-bold text-[#009B3A] text-xs uppercase">♻️ LIXO RECICLÁVEL</h5>
                      <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 leading-relaxed font-medium">
                        <li>Papel e papelão</li>
                        <li>Plásticos</li>
                        <li>Metais</li>
                        <li>Vidros <span className="text-[10px] font-bold text-[#002776]">(bem acondicionados)</span></li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-[#009B3A]/10 space-y-2">
                      <h5 className="font-bold text-emerald-700 text-xs uppercase">🍏 LIXO ORGÂNICO / NÃO RECICLÁVEL</h5>
                      <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 leading-relaxed font-medium">
                        <li>Restos de alimentos</li>
                        <li>Papel higiênico e guardanapos usados</li>
                        <li>Resíduos orgânicos gerais</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-[#009B3A]/10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[#002776] font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#009B3A]" />
                      <span>Coloque o lixo em sacos bem fechados.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#009B3A]" />
                      <span>Não deixe sacos de lixo no chão.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#009B3A]" />
                      <span>Feche as tampas após o descarte.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#009B3A]" />
                      <span>Identifique vidros quebrados se houver.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t flex gap-4">
                <button 
                  onClick={() => setShowTrashGuide(false)} 
                  className="w-full bg-[#009B3A] text-[#FEE101] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#007A2E] transition-all shadow-xl active:scale-95"
                >
                  Entendi, vou colaborar!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons: WhatsApp & Home Section */}
      <div className="fixed bottom-6 inset-x-0 px-6 flex justify-between items-end max-w-5xl mx-auto z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence>
            {activeSection !== 'home' && (
              <motion.button 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0 }} 
                onClick={() => setActiveSection('home')} 
                className="w-14 h-14 bg-white text-[#009B3A] rounded-2xl shadow-xl flex items-center justify-center border-4 border-[#009B3A] active:scale-90 transition-all hover:bg-emerald-50"
                title="Voltar ao Início"
              >
                <Home className="w-6 h-6 animate-pulse" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div className="pointer-events-auto">
          <motion.a 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            href={`https://wa.me/${STUDIO_INFO.hostWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center active:scale-90 transition-all hover:bg-[#128C7E] border-4 border-white"
            title="Falar com o Anfitrião"
          >
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 fill-current" />
          </motion.a>
        </div>
      </div>

      <footer className="py-12 bg-[#009B3A]/5 border-t border-[#009B3A]/10 text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
          <Logo className="w-8 h-8 opacity-60" />
          <p className="text-[10px] md:text-xs text-[#002776] font-black uppercase tracking-[0.4em]">{STUDIO_INFO.name} • Bueno • Welcome Home • 🇧🇷 Copa</p>
          
          <div className="space-y-1 text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider max-w-lg">
            <p className="text-[#002776] font-bold">Corretor de Imóveis: <span className="font-extrabold text-[#009B3A]">WELLINGTON RODOVALHO FONSECA</span></p>
            <p>CAEPF: 269.462.701/001-49 • CRECI: CRECI-GO 42695 • CNAI: 54826</p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
              <a href="https://www.alugagoias.com.br" target="_blank" rel="noopener noreferrer" className="text-[#009B3A] hover:text-[#002776] font-bold transition-colors">www.alugagoias.com.br</a>
              <a href="https://wa.me/5562991514568" target="_blank" rel="noopener noreferrer" className="text-[#009B3A] hover:text-[#002776] font-bold transition-colors">WhatsApp: 62 99151-4568</a>
              <a href="mailto:contato@alugagoias.com.br" className="text-[#009B3A] hover:text-[#002776] font-bold transition-colors">contato@alugagoias.com.br</a>
            </div>
          </div>

          <div className="h-1 w-20 bg-[#FEE101] rounded-full mt-2"></div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);