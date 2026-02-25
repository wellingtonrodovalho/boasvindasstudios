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
  DoorClosed
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---
type Section = 'home' | 'studio' | 'checkin' | 'casa' | 'local' | 'checkout' | 'emergencia';
type Category = 'todos' | 'saude' | 'lazer' | 'compras' | 'bancos' | 'feiras' | 'gastronomia';

const STUDIO_INFO = {
  name: "Studio Ipê",
  units: ["101A", "101B"],
  address: "Setor Bueno, Goiânia",
  wifi: "STUDIO IPE-2G",
  wifiPass: "RT45101Ipe",
  checkinTime: "14:00",
  checkoutTime: "11:00",
  keySafeCode: "0906",
  hostWhatsapp: "5562985451980",
  emergencyContacts: [
    { name: "Suporte Anfitrião (Wellington)", number: "62 98545-1980", type: 'whatsapp' },
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
  { id: 'todos', label: 'Todos', icon: LayoutGrid, color: 'bg-amber-600' },
  { id: 'saude', label: 'Saúde', icon: HeartPulse, color: 'bg-rose-500' },
  { id: 'lazer', label: 'Lazer', icon: Palmtree, color: 'bg-emerald-500' },
  { id: 'compras', label: 'Compras', icon: ShoppingBag, color: 'bg-sky-500' },
  { id: 'bancos', label: 'Bancos', icon: Landmark, color: 'bg-amber-700' },
  { id: 'feiras', label: 'Feiras', icon: Store, color: 'bg-indigo-500' },
  { id: 'gastronomia', label: 'Comer', icon: Coffee, color: 'bg-orange-500' },
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
    <path d="M256 460V180" stroke="#5c4017" strokeWidth="44" strokeLinecap="round"/>
    <path d="M256 380L120 280" stroke="#5c4017" strokeWidth="44" strokeLinecap="round"/>
    <path d="M256 380L392 280" stroke="#5c4017" strokeWidth="44" strokeLinecap="round"/>
    <circle cx="256" cy="150" r="110" fill="#f1b51c"/>
    <circle cx="90" cy="300" r="95" fill="#f1b51c"/>
    <circle cx="422" cy="300" r="95" fill="#f1b51c"/>
  </svg>
);

const Header = ({ title, onBack }: { title: string, onBack?: () => void }) => (
  <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md py-4 px-6 border-b border-amber-100 shadow-sm">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-amber-50 rounded-full transition-colors text-amber-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Logo className="w-8 h-8" />
      </div>
    </div>
  </header>
);

const Card = ({ title, icon: Icon, color, onClick }: { title: string, icon: any, color: string, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full p-5 flex items-center justify-between rounded-2xl bg-white shadow-sm border border-gray-100 group transition-all hover:shadow-md h-full text-left"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} shadow-sm group-hover:shadow-amber-200 transition-all flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-lg font-semibold text-gray-700 leading-tight">{title}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors flex-shrink-0" />
  </motion.button>
);

const LocalSectionItem: React.FC<{ title: string, desc?: string, icon: any, href: string, color?: string }> = ({ title, desc, icon: Icon, href, color }) => (
  <motion.a 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:border-amber-300 transition-all group active:scale-[0.98] h-full"
  >
    <div className={`w-10 h-10 ${color || 'bg-amber-50'} rounded-xl flex-shrink-0 flex items-center justify-center font-black transition-colors`}>
      <Icon className={`w-5 h-5 ${color ? 'text-white' : 'text-amber-600'}`} />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-gray-800 text-sm tracking-tight">{title}</h4>
        <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-amber-500" />
      </div>
      {desc && <p className="text-gray-500 text-[11px] leading-relaxed">{desc}</p>}
    </div>
  </motion.a>
);

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('todos');

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
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card title="Nosso Studio" icon={Home} color="bg-amber-600" onClick={() => setActiveSection('studio')} />
              <Card title="Check-in" icon={Key} color="bg-emerald-600" onClick={() => setActiveSection('checkin')} />
              <Card title="Guia do Studio" icon={LayoutGrid} color="bg-amber-500" onClick={() => setActiveSection('casa')} />
              <Card title="Guia Local" icon={MapPin} color="bg-sky-600" onClick={() => setActiveSection('local')} />
              <Card title="Checkout" icon={LogOut} color="bg-rose-600" onClick={() => setActiveSection('checkout')} />
              <Card title="Emergências" icon={AlertCircle} color="bg-red-700" onClick={() => setActiveSection('emergencia')} />
            </div>
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
                      <div className="w-full space-y-4 text-center">
                          <div className="space-y-1">
                             <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">Rede</h4>
                             <p className="text-base font-bold text-gray-700 font-mono tracking-tight">{STUDIO_INFO.wifi}</p>
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">Senha</h4>
                             <p className="text-base font-bold text-gray-700 font-mono tracking-tight">{STUDIO_INFO.wifiPass}</p>
                          </div>
                      </div>
                      <button onClick={() => {navigator.clipboard.writeText(STUDIO_INFO.wifiPass); alert("Senha copiada!");}} className="w-full bg-white py-3 rounded-xl shadow-sm border border-amber-100 flex items-center justify-center gap-2 text-xs font-black uppercase text-amber-700 active:scale-95 transition-all">
                        <Clipboard className="w-4 h-4"/> Copiar Senha
                      </button>
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
                    <p className="text-[10px] text-gray-300 mt-1 leading-tight">Devolver na caixa 101A (bicicletário/térreo).</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <Trash2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">🗑 Lixo</h4>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">Descarte nas lixeiras do térreo (atrás da recepção).</p>
                  </div>
                </div>
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
                <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
                  <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-md flex-shrink-0">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">🗑️ Lixo</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      Deposite o lixo nas lixeiras localizadas no térreo, ao lado do bicicletário, atrás da recepção.
                    </p>
                  </div>
                </div>
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
                    Após trancar a porta, coloque a TAG na <strong>caixa de correspondência do 101 A</strong>.
                  </p>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 border-l-4 border-amber-500 mt-4">
                    <p className="text-xs md:text-sm text-amber-100 leading-relaxed font-bold">
                      Localização: Ao lado do bicicletário, nos fundos, atrás da recepção, no térreo.
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
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col relative antialiased selection:bg-amber-100 selection:text-amber-900">
      <main className="flex-grow w-full">{renderContent()}</main>
      
      <div className="fixed bottom-6 inset-x-0 px-6 flex justify-between items-end max-w-5xl mx-auto z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence>
            {activeSection !== 'home' && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => setActiveSection('home')} className="w-14 h-14 bg-white text-amber-600 rounded-2xl shadow-xl flex items-center justify-center border border-amber-100 active:scale-90 transition-all hover:bg-amber-50">
                <Home className="w-6 h-6" />
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
            className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] flex items-center justify-center active:scale-90 transition-all hover:bg-[#128C7E] border-4 border-white"
            title="Falar com o Anfitrião"
          >
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 fill-current" />
          </motion.a>
        </div>
      </div>

      <footer className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
          <Logo className="w-6 h-6 opacity-40 grayscale hover:grayscale-0 transition-all" />
          <p className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-[0.4em]">{STUDIO_INFO.name} • Setor Bueno • Welcome Home</p>
          
          <div className="space-y-1 text-[9px] md:text-[10px] text-gray-400 font-medium uppercase tracking-wider max-w-lg">
            <p>Corretor de Imóveis: <span className="text-gray-500 font-bold">WELLINGTON RODOVALHO FONSECA</span></p>
            <p>CAEPF: 269.462.701/001-49 • CRECI: CRECI-GO 42695 • CNAI: 54826</p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
              <a href="https://www.alugagoias.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">www.alugagoias.com.br</a>
              <a href="https://wa.me/5562985451980" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">WhatsApp: 62 98545-1980</a>
              <a href="mailto:contato@alugagoias.com.br" className="hover:text-amber-600 transition-colors">contato@alugagoias.com.br</a>
            </div>
          </div>

          <div className="h-px w-20 bg-amber-100 mt-2"></div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);