import React, { useEffect, useRef, useState } from "react"
import emBokashi from "./assets/em-bokashi.jpg"
import binBlueBag from "./assets/bin-blue-bag.jpg"
import binTcl from "./assets/bin-tcl.jpg"
import binBlack from "./assets/bin-black.jpg"
import bugBoomLoop from "./assets/bugboom-loop.png"
import bugBoomLarvae from "./assets/bugboom-larvae.jpg"

const recyclingBins = [
  {
    src: binBlueBag,
    label: "Cups with leftover drinks",
    alt: "Recycling bin lined with a blue bag, holding cups with leftover drinks, straws and paper",
  },
  {
    src: binTcl,
    label: "Drinks and paper mixed in",
    alt: "Canteen recycling bin holding plastic cups with drinks still inside and paper packaging",
  },
  {
    src: binBlack,
    label: "Wrappers, paper cups, residue",
    alt: "Recycling bin full of drink cups, paper cups, snack wrappers and bottles with liquid left inside",
  },
]

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

const outputs: {
  title: string
  note: string
  icon: IconName
  photo: string
  alt: string
  credit: string
}[] = [
  {
    title: "Compost",
    note: "For hall gardens, Foodscape Collective and Project Black Gold",
    icon: "soil",
    photo: unsplash("1708014750399-c0b86e16aea5"),
    alt: "Close-up of dark, crumbly soil",
    credit: "Juan Aguirre",
  },
  {
    title: "Liquid",
    note: "Replaces high-chemical drain cleaners in NTU drains",
    icon: "drop",
    photo: unsplash("1654440122140-f1fc995ddb34"),
    alt: "Close-up of a metal sink drain",
    credit: "Daniel Dan",
  },
]

type IconName = "leaf" | "bucket" | "drop" | "soil" | "cycle" | "pin" | "check" | "arrow" | "bug" | "users" | "expand" | "close" | "home"

interface IconProps {
  name: IconName
  size?: number
}

function Icon({ name, size = 20 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    leaf: (
      <>
        <path d="M20 4C12 4 5 8 5 15c0 2 1 4 3 5 1-6 5-10 10-12-5 4-7 8-8 13 8 1 12-5 10-17Z" />
        <path d="M4 21c2-5 6-9 12-12" />
      </>
    ),
    bucket: (
      <>
        <path d="M6 8h12l-1 13H7L6 8Z" />
        <path d="M5 5h14v3H5zM8 5c0-2 1-3 4-3s4 1 4 3" />
      </>
    ),
    drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    soil: (
      <>
        <path d="M3 18c4-4 14-4 18 0M5 14c4-3 10-3 14 0M8 10c2-1 6-1 8 0" />
        <path d="M12 10V5m0 0c-3 0-5-2-5-4 3 0 5 1 5 4Zm0 0c3 0 5-2 5-4-3 0-5 1-5 4Z" />
      </>
    ),
    cycle: (
      <>
        <path d="M20 7h-5V2" />
        <path d="M20 7a9 9 0 1 0 1 8" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    check: <path d="m4 12 5 5L20 6" />,
    home: <path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    expand: <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    bug: (
      <>
        <ellipse cx="12" cy="14" rx="5" ry="6" />
        <path d="M12 8v12M9 6 7 3m8 3 2-3M7 12H3m4 5-3 2m13-7h4m-4 5 3 2" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 21c.5-4 3-6 6.5-6s6 2 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.6 3.5 6" />
      </>
    ),
  }
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  )
}

function Reveal({
  as = "div",
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "footer"
}) {
  const ref = useRef<HTMLElement>(null)
  // Kept in state, not added with classList, so a className change (e.g. opening a pop-up) can't wipe it
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRevealed(true)
        observer.disconnect()
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return React.createElement(
    as,
    { ref, className: `reveal ${revealed ? "revealed" : ""} ${className}`, ...rest },
    children,
  )
}

/* Small segmented control; used for card views and in-card toggles */
function Segments<T extends string>({
  items,
  value,
  onChange,
  label,
  className = "",
  labels,
}: {
  items: readonly T[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
  labels?: Partial<Record<T, string>>
}) {
  return (
    <div className={`segments ${className}`} role="group" aria-label={label}>
      {items.map((item) => (
        <Button
          key={item}
          className={value === item ? "active" : ""}
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {labels?.[item] ?? item}
        </Button>
      ))}
    </div>
  )
}

/* Pop-up state shared by every tile: opens on a click, stays open until × is pressed */
function usePopup() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    toggleRef.current?.focus()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])
  const openPopup = () => setOpen(true)
  // Let the shrink animation play, then drop back into the grid
  const closePopup = () => {
    setClosing(true)
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
      toggleRef.current?.focus()
    }, 220)
  }
  /* Clicks on the tile's own controls keep working; anywhere else opens the pop-up */
  const onCardClick = (e: React.MouseEvent) => {
    if (open) return
    const target = e.target as HTMLElement
    if (target.closest("button, input, a, label, [role=button]")) return
    setOpen(true)
  }
  const tileProps = {
    onClick: onCardClick,
    ...(open ? { role: "dialog", "aria-modal": true } : {}),
  }
  const tileClass = `tile ${open ? "expanded" : ""} ${closing ? "closing" : ""}`
  return { open, closing, toggleRef, openPopup, closePopup, tileProps, tileClass }
}

/* Keeps the tile's grid spot and dims the dashboard; clicking it does nothing on purpose */
function PopupShell({
  open,
  closing,
  className = "",
}: {
  open: boolean
  closing: boolean
  className?: string
}) {
  if (!open) return null
  return (
    <>
      <div className={`tile tile-placeholder ${className}`} aria-hidden="true" />
      <div className={`tile-backdrop ${closing ? "closing" : ""}`} />
    </>
  )
}

function PopupToggle({
  popup,
  title,
}: {
  popup: ReturnType<typeof usePopup>
  title: string
}) {
  return (
    <button
      ref={popup.toggleRef}
      type="button"
      className="button tile-toggle"
      aria-label={popup.open ? "Close" : `Expand ${title}`}
      onClick={popup.open ? popup.closePopup : popup.openPopup}
    >
      <Icon name={popup.open ? "close" : "expand"} size={14} />
    </button>
  )
}

/* One dashboard card per section: number, section name, title, optional meta, optional view switcher */
function Card<T extends string>({
  id,
  n,
  kicker,
  title,
  meta,
  views,
  view,
  onView,
  className = "",
  children,
}: {
  id: string
  n: string
  kicker: string
  title: string
  meta?: string
  views?: readonly T[]
  view?: T
  onView?: (view: T) => void
  className?: string
  children: React.ReactNode
}) {
  const popup = usePopup()
  return (
    <>
      <PopupShell open={popup.open} closing={popup.closing} />
      <Reveal
        as="article"
        id={id}
        className={`${popup.tileClass} ${className}`}
        aria-labelledby={`${id}-title`}
        {...popup.tileProps}
      >
        <div className="tile-head">
          <span>{n}</span>
          <div className="tile-title">
            <small>{kicker}</small>
            <h2 id={`${id}-title`}>{title}</h2>
          </div>
          {meta && <em>{meta}</em>}
          <PopupToggle popup={popup} title={title} />
        </div>
        {views && view && onView && (
          <Segments
            className="views"
            items={views}
            value={view}
            onChange={onView}
            label={`${title}: views`}
          />
        )}
        <div className="tile-body">{children}</div>
      </Reveal>
    </>
  )
}

function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number
  prefix?: string
  suffix?: string
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const tick = (time: number) => {
        const progress = Math.min((time - start) / 1100, 1)
        setValue(to * (1 - Math.pow(1 - progress, 3)))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])
  return (
    <span ref={ref}>
      {prefix}
      {Number.isInteger(to) ? Math.round(value) : value.toFixed(1)}
      {suffix}
    </span>
  )
}

const steps: {
  title: string
  owner: string
  icon: IconName
  items: string[]
}[] = [
  {
    title: "Separate",
    owner: "Stall owners · students",
    icon: "leaf",
    items: [
      "Stalls: uncooked scraps in their own bin",
      "Students: follow the poster",
      "Cleaners and CCA check the sorting",
    ],
  },
  {
    title: "Treat",
    owner: "CCA members",
    icon: "bucket",
    items: [
      "Carry the waste to partners",
      "Ferment it with Bokashi",
      "Hall 12, Foodscape, Black Gold",
    ],
  },
  {
    title: "Reuse",
    owner: "Halls · partners",
    icon: "cycle",
    items: [
      "Compost for hall gardens",
      "Compost for external partners",
      "Liquid cleans NTU drains",
    ],
  },
]

const partners: { name: string; label: string; icon: IconName }[] = [
  { name: "Hall 12", label: "Gardening hall", icon: "home" },
  { name: "Foodscape Collective", label: "External partner", icon: "soil" },
  { name: "Project Black Gold", label: "Boon Lay Nature Garden", icon: "pin" },
]

const kpis = [
  {
    value: "50",
    unit: "%",
    ring: 50,
    label: "Stall owners on board",
    note: "At least half, after one semester.",
  },
  {
    value: "↓",
    unit: "",
    ring: 70,
    label: "Fewer CCA checkers, same recycling rate",
    note: "Students sort on their own.",
  },
]

function App() {
  const [researchView, setResearchView] = useState<"BugBoom" | "Gaps">("BugBoom")
  const [joinView, setJoinView] = useState<"Join" | "Thanks">("Join")
  const [seen, setSeen] = useState(0)
  const [step, setStep] = useState(0)
  const introPopup = usePopup()

  return (
    <main className="board">
      <PopupShell open={introPopup.open} closing={introPopup.closing} className="intro-slot" />
      <Reveal
        as="section"
        id="top"
        className={`${introPopup.tileClass} card-intro`}
        aria-labelledby="intro-title"
        {...introPopup.tileProps}
      >
        <div className="intro-top">
          <span className="brand">
            <Icon name="leaf" /> Bokashi <span>Bros</span>
          </span>
          <span className="eyebrow">Group C27</span>
          <PopupToggle popup={introPopup} title="Introduction" />
        </div>
        <h1 id="intro-title">
          Your last meal.
          <br />
          Any <span className="fg-inline-italic">waste?</span>
        </h1>
        <p>Leftover rice, meat, veg. Stall trimmings and unsold food at closing.</p>
        <div
          className="hero-visual"
          aria-label="Scraps transform into soil and a seedling"
        >
          <div className="hero-ring">
            <div className="orbit orbit-one" />
            <img
              className="hero-photo"
              src={emBokashi}
              alt="EM Bokashi organic fermentation starter pack"
            />
            <div className="scrap scrap-a" />
            <div className="scrap scrap-b" />
            <div className="big-bucket">
              <div className="soil-fill" />
              <span className="bucket-mark">
                <Icon name="leaf" size={32} />
              </span>
            </div>
            <div className="sprout">
              <i />
              <b />
              <b />
            </div>
          </div>
        </div>
        <p className="intro-ask">
          <Icon name="leaf" size={16} />
          What if this food waste didn't have to end up as waste at all?
        </p>
        <div className="team">Kiven · Lukas · Joses · Rauf · Li Yang · Zhi Qing</div>
      </Reveal>

      <Card id="problem" n="01" kicker="The problem" title="Food waste is rising">
        <div className="figures">
          <div className="figure terra">
            <strong>
              <CountUp to={4.6} prefix="+" suffix="%" />
            </strong>
            <span>Food waste in two years</span>
            <small>NEA 2025 · ~790k tonnes</small>
          </div>
          <div className="figure amber">
            <strong>
              <CountUp to={18} suffix="%" />
            </strong>
            <span>Food-waste recycling rate</span>
            <small>Stagnant over the same period</small>
          </div>
          <div className="figure slate">
            <strong>
              <CountUp to={2035} />
            </strong>
            <span>Semakau Landfill full</span>
            <small>Minister Grace Fu</small>
          </div>
        </div>
        <p className="footnote">An urgent need to cut food waste in Singapore.</p>
      </Card>

      <Card
        id="research"
        n="02"
        kicker="What already exists"
        title={researchView === "BugBoom" ? "BugBoom, piloted at NTU" : "What we found on campus"}
        views={["BugBoom", "Gaps"] as const}
        view={researchView}
        onView={setResearchView}
      >
        {researchView === "BugBoom" ? (
          <>
            <p className="lede">
              An alumni passion project turned business, using black soldier
              flies to process food waste.
            </p>
            <div className="bsf">
              <figure className="bsf-loop">
                <img
                  src={bugBoomLoop}
                  alt="Loop diagram: food waste goes to a black soldier fly facility and comes back as animal feed and fertilisers"
                />
              </figure>
              <figure className="bsf-photo">
                <img
                  src={bugBoomLarvae}
                  alt="Two tubs held up side by side: dark frass on the left, black soldier fly larvae on the right"
                />
                <figcaption>
                  <span>Waste → fertiliser</span>
                  <span>Larvae → live feed</span>
                </figcaption>
              </figure>
            </div>
            <p className="credit">Graphic: Straits Times</p>
          </>
        ) : (
          <>
            <p className="gap-note">
              <Icon name="bug" size={16} />
              <span>
                <b>Gap 1</b> Students don't want to work with insects.
              </span>
            </p>
            <div className="seen-stage">
              {recyclingBins.map((bin, i) => (
                <img
                  key={bin.label}
                  src={bin.src}
                  alt={i === seen ? bin.alt : ""}
                  className={i === seen ? "active" : ""}
                />
              ))}
              <span className="seen-label">
                <b>Gap 2</b>
                {recyclingBins[seen].label}
              </span>
              <div className="seen-copy">
                <h3>Food mixed with plastic.</h3>
                <p>Most food waste we found was contaminated with non-recyclables.</p>
              </div>
            </div>
            <div className="seen-thumbs">
              {recyclingBins.map((bin, i) => (
                <button
                  key={bin.label}
                  type="button"
                  className={i === seen ? "active" : ""}
                  aria-pressed={i === seen}
                  aria-label={`Show photo ${i + 1}: ${bin.label}`}
                  onClick={() => setSeen(i)}
                >
                  <img src={bin.src} alt="" />
                  <span>0{i + 1}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card id="solution" n="03" kicker="Our solution" title="EM Bokashi, in three steps">
        <div className="stepper">
          <div className="step-tabs">
            {steps.map((item, i) => (
              <Button
                key={item.title}
                className={step === i ? "active" : ""}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <span>0{i + 1}</span>
                {item.title}
              </Button>
            ))}
          </div>
          <div className="step-detail">
            <span className="step-art" aria-hidden="true">
              {step + 1}
            </span>
            <div className="eyebrow">{steps[step].owner}</div>
            <h3>
              <Icon name={steps[step].icon} size={24} />
              {steps[step].title}
            </h3>
            <ul>
              {steps[step].items.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="footnote">
          Student-led. At every step, people see the impact they make.
        </p>
      </Card>


      <Card
        id="partners"
        n="04"
        kicker="Treatment partners"
        title="Where the waste goes"
      >
        <ol className="waste-route">
          <li className="route-step">
            <span className="route-icon source">
              <Icon name="bucket" size={18} />
            </span>
            <div>
              <small>Source</small>
              <strong>NTU canteens</strong>
              <p>Sorted by stall owners and students</p>
            </div>
          </li>
          <li className="route-carry">
            <Icon name="users" size={15} />
            CCA members carry it
            <Icon name="arrow" size={14} />
          </li>
          {partners.map((partner) => (
            <li className="route-step" key={partner.name}>
              <span className="route-icon">
                <Icon name={partner.icon} size={18} />
              </span>
              <div>
                <small>{partner.label}</small>
                <strong>{partner.name}</strong>
              </div>
            </li>
          ))}
        </ol>
        <p className="footnote">Treated with Bokashi at each partner.</p>
      </Card>

      <Card id="outputs" n="05" kicker="What Bokashi makes" title="Two products, both used">
        <div className="outputs">
          {outputs.map((out) => (
            <figure key={out.title}>
              <div className="output-photo">
                <img src={out.photo} alt={out.alt} />
                <span>
                  <Icon name={out.icon} size={15} />
                </span>
              </div>
              <figcaption>
                <strong>{out.title}</strong>
                <span>{out.note}</span>
                <small>Photo: {out.credit} · Unsplash</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="footnote">Everything composted through Bokashi gets used.</p>
      </Card>

      <Card id="cca" n="06" kicker="How we'll run it" title="A new CCA: Bokashi Bros">
        <div className="stakeholder-card cca">
          <div>
            <span className="eyebrow">Core value</span>
            <strong className="cca-value">Accountability</strong>
            <p className="cca-copy">
              A proper annual handover, so closing the loop is more than one
              person's effort.
            </p>
          </div>
          <div>
            <span className="eyebrow">Members get</span>
            <p>
              <Icon name="check" size={16} />
              <span>
                <b>Hall points</b> for dorm allocation
              </span>
            </p>
            <p>
              <Icon name="check" size={16} />
              <span>
                <b>Carbon credits</b> that cut grocery bills
              </span>
            </p>
          </div>
        </div>
      </Card>

      <Card
        id="metrics"
        n="07"
        kicker="Success metrics"
        title="How we'll measure it"
        meta="End of semester"
      >
        <div className="kpis">
          {kpis.map((kpi, i) => (
            <Reveal className="kpi" key={kpi.label}>
              <span className="kpi-n">0{i + 1}</span>
              <div
                className="ring"
                style={{ "--ring": `${kpi.ring * 3.6}deg` } as React.CSSProperties}
              >
                <strong>
                  {kpi.value}
                  <small>{kpi.unit}</small>
                </strong>
              </div>
              <div className="kpi-text">
                <span className="kpi-label">{kpi.label}</span>
                <p>{kpi.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Card>

      <Card
        id="join"
        n="08"
        kicker="Join us"
        title="Join Bokashi Bros"
        views={["Join", "Thanks"] as const}
        view={joinView}
        onView={setJoinView}
      >
        {joinView === "Join" ? (
          <div className="thanks join">
            <Icon name="users" size={26} />
            <h3>Make NTU more sustainable, one bokashi at a time.</h3>
            <p>Join Bokashi Bros and make a difference today.</p>
          </div>
        ) : (
          <div className="thanks">
            <Icon name="leaf" size={26} />
            <h3>Thank you.</h3>
            <p>CC0006 Group A · Kiven, Lukas, Joses, Rauf, Li Yang, Zhi Qing</p>
            <ul aria-label="Sources">
              <li>NEA (2025): food waste up ~4.6% in two years; 18% recycled.</li>
              <li>Minister Grace Fu: Semakau Landfill full around 2035.</li>
              <li>BugBoom: NTU alumni black soldier fly project.</li>
            </ul>
          </div>
        )}
      </Card>
    </main>
  )
}

export default App
