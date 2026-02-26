import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = ["Главная", "Услуги", "Калькулятор", "Контакты"];

const SERVICES = [
  { icon: "Truck", title: "Эвакуация легковых", desc: "Все типы легковых авто, включая повреждённые и заблокированные", price: "от 1 500 ₽" },
  { icon: "Zap", title: "Срочный выезд", desc: "Эвакуатор у вас через 20–40 минут после звонка", price: "от 2 000 ₽" },
  { icon: "Shield", title: "Внедорожники и SUV", desc: "Полноприводные авто, кроссоверы, тяжёлые внедорожники", price: "от 2 200 ₽" },
  { icon: "Layers", title: "Спецтехника и грузовые", desc: "Автобусы, микроавтобусы, малотоннажный транспорт", price: "от 3 500 ₽" },
  { icon: "MapPin", title: "Межгород", desc: "Доставка авто по Красноярскому краю и соседним регионам", price: "от 50 ₽/км" },
  { icon: "Lock", title: "Охраняемая стоянка", desc: "Временное хранение автомобиля на охраняемой площадке", price: "от 500 ₽/сут" },
];

const DISTANCES = [5, 10, 15, 20, 30, 50];

function RadarBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-neon"
            style={{ transform: `scale(${i * 0.2})`, opacity: 1 - i * 0.15 }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
          style={{
            background: "linear-gradient(to right, transparent, #00FFB2)",
            animation: "rotate-radar 3s linear infinite",
          }}
        />
      </div>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#00FFB2 1px, transparent 1px), linear-gradient(90deg, #00FFB2 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-20"
        style={{ animation: "scan 4s linear infinite" }}
      />
    </div>
  );
}

function CoordDisplay() {
  const [tick, setTick] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setTick(v => !v), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-4 font-mono text-xs text-neon/60">
      <span>56.0184° N</span>
      <span className={tick ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.1s" }}>|</span>
      <span>92.8672° E</span>
      <span className="ml-2 text-neon/40">КРАСНОЯРСК</span>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
        <span className="text-neon">СИСТЕМА АКТИВНА</span>
      </span>
      <span className="text-grid">|</span>
      <span className="text-neon/50">12 МАШИН В СЕТИ</span>
      <span className="text-grid">|</span>
      <span className="text-neon/50">ВРЕМЯ ОТКЛИКА: ~28 МИН</span>
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("Главная");
  const [distance, setDistance] = useState(10);
  const [vehicleType, setVehicleType] = useState("Легковой");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const basePrice = vehicleType === "Легковой" ? 1500 : vehicleType === "Внедорожник" ? 2200 : 3500;
  const totalPrice = basePrice + distance * 50;

  const scrollTo = (section: string) => {
    setActiveNav(section);
    const map: Record<string, string> = {
      "Главная": "hero",
      "Услуги": "services",
      "Калькулятор": "calculator",
      "Контакты": "contacts",
    };
    document.getElementById(map[section])?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-ibm text-white overflow-x-hidden" style={{ background: "#060B14" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-grid/50"
        style={{ background: "rgba(6, 11, 20, 0.9)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border border-neon/40 flex items-center justify-center animate-pulse-neon">
              <Icon name="Truck" size={16} className="text-neon" />
            </div>
            <div>
              <div className="font-oswald font-bold text-base tracking-[0.15em] text-white leading-none">ЭВАКУАТОР</div>
              <div className="font-mono text-[10px] text-neon/60 tracking-[0.2em]">КРАСНОЯРСК</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-2 font-oswald text-sm tracking-widest transition-all duration-200 ${
                  activeNav === link
                    ? "text-neon border-b border-neon"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.toUpperCase()}
              </button>
            ))}
          </div>

          <a href="tel:+79293550404"
            className="flex items-center gap-2 bg-neon text-steel px-4 py-2 font-oswald font-semibold text-sm tracking-wider hover:bg-neon/90 transition-colors"
            style={{ color: "#060B14" }}>
            <Icon name="Phone" size={14} />
            +7 (929) 355-04-04
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <RadarBg />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="opacity-0 animate-fade-in mb-6">
              <StatusBar />
            </div>

            <h1 className="opacity-0 animate-fade-in-delay font-oswald font-bold leading-none mb-6"
              style={{ fontSize: "clamp(52px, 8vw, 96px)", letterSpacing: "0.02em" }}>
              <span className="text-white">ЭВАКУАТОР</span>
              <br />
              <span style={{ color: "#00FFB2", textShadow: "0 0 40px #00FFB260" }}>24/7</span>
            </h1>

            <p className="opacity-0 animate-fade-in-delay2 text-white/60 text-lg leading-relaxed mb-10 max-w-md font-ibm font-light">
              Быстрая помощь на дороге в Красноярске.
              GPS-мониторинг каждого выезда — вы знаете,
              где находится эвакуатор в реальном времени.
            </p>

            <div className="opacity-0 animate-fade-in-delay3 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("Контакты")}
                className="flex items-center justify-center gap-2 px-8 py-4 font-oswald font-bold text-base tracking-widest transition-all duration-200"
                style={{ background: "#00FFB2", color: "#060B14", boxShadow: "0 0 30px #00FFB240" }}>
                <Icon name="Zap" size={18} />
                ВЫЗВАТЬ ЭВАКУАТОР
              </button>
              <button
                onClick={() => scrollTo("Калькулятор")}
                className="flex items-center justify-center gap-2 border px-8 py-4 font-oswald text-base tracking-widest hover:bg-neon/10 transition-all duration-200"
                style={{ borderColor: "#00FFB280", color: "#00FFB2" }}>
                <Icon name="Calculator" size={18} />
                РАССЧИТАТЬ ЦЕНУ
              </button>
            </div>

            <div className="opacity-0 animate-fade-in-delay3 mt-10 flex gap-8">
              {[["< 40 мин", "Время выезда"], ["24/7", "Работаем"], ["12+", "Машин в парке"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-oswald font-bold text-2xl" style={{ color: "#00FFB2" }}>{val}</div>
                  <div className="font-mono text-xs text-white/40 tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GPS CARD */}
          <div className="opacity-0 animate-fade-in-delay2 relative">
            <div className="relative border border-grid rounded-sm overflow-hidden"
              style={{ background: "#0D1626", boxShadow: "0 0 60px #00FFB215, inset 0 0 40px #00FFB205" }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-grid/50">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-neon" />
                  <span className="font-mono text-xs text-neon/70 tracking-wider">GPS ТРЕКИНГ</span>
                </div>
                <CoordDisplay />
              </div>

              <div className="relative h-64 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #060B14 0%, #0D1A2D 50%, #060B14 100%)" }}>
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(#00FFB2 1px, transparent 1px), linear-gradient(90deg, #00FFB2 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }} />
                {[80, 140, 200].map((r, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{ width: r, height: r, borderColor: "#00FFB230" }} />
                ))}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{ background: "#00FFB2", boxShadow: "0 0 20px #00FFB2, 0 0 40px #00FFB260" }} />
                <div
                  className="absolute top-1/2 left-1/2 w-1/2 h-px origin-left"
                  style={{ background: "linear-gradient(to right, #00FFB260, transparent)", animation: "rotate-radar 3s linear infinite" }}
                />
                <div className="absolute top-8 right-8 flex flex-col gap-1">
                  {["ТЦ Планета", "пр. Кр. рабочий", "Сопка"].map((label, i) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i === 0 ? "#FF3B30" : "#00FFB2", opacity: 0.7 }} />
                      <span className="font-mono text-[9px] text-white/40">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 grid grid-cols-3 gap-4 border-t border-grid/50">
                {[
                  { label: "МАШИНА #7", value: "В ПУТИ", neon: true },
                  { label: "РАССТ.", value: "3.2 КМ", neon: false },
                  { label: "ПРИБЫТИЕ", value: "~18 МИН", neon: true },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="font-oswald font-semibold text-base" style={{ color: item.neon ? "#00FFB2" : "white" }}>{item.value}</div>
                    <div className="font-mono text-[9px] text-white/30 tracking-widest mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="font-mono text-xs text-neon/50 tracking-[0.3em] mb-3">// ПРАЙС-ЛИСТ</div>
              <h2 className="font-oswald font-bold text-5xl tracking-wider text-white">УСЛУГИ</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 font-mono text-xs text-white/30">
              <Icon name="Clock" size={12} />
              Актуально на {new Date().toLocaleDateString("ru-RU")}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#1A2640" }}>
            {SERVICES.map((s, i) => (
              <div key={i}
                className="group relative p-6 transition-all duration-300 cursor-default"
                style={{ background: "#0D1626" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0D1A2D")}
                onMouseLeave={e => (e.currentTarget.style.background = "#0D1626")}
              >
                <div className="absolute top-0 left-0 h-px transition-all duration-500 group-hover:w-full w-0"
                  style={{ background: "#00FFB2" }} />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border border-grid flex items-center justify-center transition-colors group-hover:border-neon/50">
                    <Icon name={s.icon} size={18} className="text-neon/70 group-hover:text-neon transition-colors" />
                  </div>
                  <span className="font-oswald font-semibold text-sm" style={{ color: "#00FFB2" }}>{s.price}</span>
                </div>

                <h3 className="font-oswald font-semibold text-lg tracking-wide mb-2 text-white group-hover:text-neon transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-ibm font-light">{s.desc}</p>

                <div className="absolute bottom-0 right-0 font-mono font-bold text-white/[0.03] leading-none select-none"
                  style={{ fontSize: 60 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(ellipse at 70% 50%, #00FFB2 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-14">
            <div className="font-mono text-xs text-neon/50 tracking-[0.3em] mb-3">// ОНЛАЙН РАСЧЁТ</div>
            <h2 className="font-oswald font-bold text-5xl tracking-wider text-white">КАЛЬКУЛЯТОР</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <label className="font-mono text-xs tracking-[0.2em] block mb-4" style={{ color: "#00FFB260" }}>
                  ТИП ТРАНСПОРТНОГО СРЕДСТВА
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Легковой", "Внедорожник", "Грузовой"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setVehicleType(type)}
                      className="py-3 font-oswald text-sm tracking-widest border transition-all duration-200"
                      style={{
                        borderColor: vehicleType === type ? "#00FFB2" : "#1A2640",
                        color: vehicleType === type ? "#00FFB2" : "rgba(255,255,255,0.5)",
                        background: vehicleType === type ? "#00FFB210" : "transparent",
                      }}>
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-mono text-xs tracking-[0.2em]" style={{ color: "#00FFB260" }}>
                    РАССТОЯНИЕ (КМ)
                  </label>
                  <span className="font-oswald font-bold text-lg" style={{ color: "#00FFB2" }}>{distance} КМ</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00FFB2 0%, #00FFB2 ${distance}%, #1A2640 ${distance}%, #1A2640 100%)`,
                    accentColor: "#00FFB2",
                  }}
                />
                <div className="flex justify-between mt-3">
                  {DISTANCES.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDistance(d)}
                      className="font-mono text-xs transition-colors"
                      style={{ color: distance === d ? "#00FFB2" : "rgba(255,255,255,0.3)" }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-grid/50 p-6" style={{ background: "#0D1626" }}>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-white/40 tracking-[0.2em] mb-1">ИТОГОВАЯ СТОИМОСТЬ</div>
                    <div className="font-oswald font-bold text-4xl text-white">
                      {totalPrice.toLocaleString("ru-RU")} <span style={{ color: "#00FFB2" }}>₽</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-white/30">База: {basePrice.toLocaleString()} ₽</div>
                    <div className="font-mono text-xs text-white/30">Км: {distance} × 50 ₽</div>
                  </div>
                </div>
                <div className="h-px bg-grid mb-4" />
                <div className="flex items-center gap-2 text-white/50 text-xs font-ibm">
                  <Icon name="Info" size={12} />
                  Точная стоимость уточняется диспетчером
                </div>
              </div>
            </div>

            <div className="border border-grid" style={{ background: "#0D1626" }}>
              <div className="px-6 py-4 border-b border-grid flex items-center gap-2">
                <Icon name="Zap" size={14} className="text-neon" />
                <span className="font-oswald text-sm tracking-widest" style={{ color: "#00FFB2" }}>БЫСТРЫЙ ЗАКАЗ</span>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {[
                    { key: "name", label: "ВАШЕ ИМЯ", placeholder: "Иван Петров", type: "text" },
                    { key: "phone", label: "ТЕЛЕФОН", placeholder: "+7 (___) ___-__-__", type: "tel" },
                    { key: "address", label: "АДРЕС / ГЕОЛОКАЦИЯ", placeholder: "Улица, дом или GPS координаты", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="font-mono text-[10px] tracking-[0.2em] block mb-2" style={{ color: "#00FFB250" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        required={field.key !== "comment"}
                        className="w-full border px-4 py-3 text-white text-sm outline-none transition-colors"
                        style={{ background: "#060B14", borderColor: "#1A2640", fontFamily: "IBM Plex Sans, sans-serif" }}
                        onFocus={e => (e.target.style.borderColor = "#00FFB260")}
                        onBlur={e => (e.target.style.borderColor = "#1A2640")}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] block mb-2" style={{ color: "#00FFB250" }}>
                      КОММЕНТАРИЙ
                    </label>
                    <textarea
                      placeholder="Описание ситуации, тип авто..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={3}
                      className="w-full border px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                      style={{ background: "#060B14", borderColor: "#1A2640", fontFamily: "IBM Plex Sans, sans-serif" }}
                      onFocus={e => (e.target.style.borderColor = "#00FFB260")}
                      onBlur={e => (e.target.style.borderColor = "#1A2640")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 font-oswald font-bold text-base tracking-widest transition-all duration-200"
                    style={{ background: "#00FFB2", color: "#060B14", boxShadow: "0 0 20px #00FFB230" }}>
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>

                  <p className="text-white/25 text-xs text-center font-ibm">
                    Диспетчер перезвонит в течение 2 минут
                  </p>
                </form>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 border rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-neon"
                    style={{ borderColor: "#00FFB240" }}>
                    <Icon name="CheckCircle" size={32} className="text-neon" />
                  </div>
                  <h3 className="font-oswald font-bold text-2xl mb-3 tracking-wider" style={{ color: "#00FFB2" }}>
                    ЗАЯВКА ПРИНЯТА
                  </h3>
                  <p className="text-white/50 font-ibm font-light">Диспетчер свяжется с вами в течение 2 минут</p>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-6 font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
                    Отправить ещё
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 border-t border-grid/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="font-mono text-xs text-neon/50 tracking-[0.3em] mb-3">// СВЯЗЬ</div>
            <h2 className="font-oswald font-bold text-5xl tracking-wider text-white">КОНТАКТЫ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "#1A2640" }}>
            {[
              { icon: "Phone", label: "ТЕЛЕФОН", value: "+7 (929) 355-04-04", sub: "Круглосуточно, 24/7" },
              { icon: "MapPin", label: "ДИСПЕТЧЕРСКАЯ", value: "Красноярск", sub: "ул. Взлётная, 59" },
              { icon: "MessageCircle", label: "МЕССЕНДЖЕРЫ", value: "WhatsApp / Telegram", sub: "+7 (929) 355-04-04" },
            ].map((c, i) => (
              <div key={i} className="p-8 group transition-all duration-200" style={{ background: "#0D1626" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0D1A2D")}
                onMouseLeave={e => (e.currentTarget.style.background = "#0D1626")}
              >
                <div className="w-12 h-12 border border-grid flex items-center justify-center mb-5 transition-colors group-hover:border-neon/50">
                  <Icon name={c.icon} size={20} className="text-neon/70" />
                </div>
                <div className="font-mono text-[10px] text-white/30 tracking-[0.2em] mb-2">{c.label}</div>
                <div className="font-oswald font-semibold text-xl text-white mb-1">{c.value}</div>
                <div className="font-ibm text-sm text-white/40 font-light">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-grid/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-neon/30 flex items-center justify-center">
              <Icon name="Truck" size={12} className="text-neon/50" />
            </div>
            <span className="font-mono text-xs text-white/30 tracking-wider">ЭВАКУАТОР КРАСНОЯРСК © 2026</span>
          </div>
          <CoordDisplay />
          <a href="tel:+79293550404" className="font-oswald text-sm tracking-wider transition-colors hover:text-neon"
            style={{ color: "#00FFB270" }}>
            +7 (929) 355-04-04
          </a>
        </div>
      </footer>
    </div>
  );
}