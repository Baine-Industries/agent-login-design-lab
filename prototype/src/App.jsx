import { useMemo, useState } from "react";

const initialSpaces = [
  { id: "adam", name: "Adam", type: "Personal", icon: "ph-user", accessLive: true },
  { id: "family", name: "Family", type: "Personal", icon: "ph-users-three", accessLive: false },
  { id: "imrahil", name: "Imrahil Technologies", type: "Business", icon: "ph-buildings", accessLive: false },
  { id: "baine", name: "Baine Industries", type: "Business", icon: "ph-briefcase", accessLive: false },
];

const spaceIconOptions = {
  Personal: [
    { value: "ph-user", label: "Person" },
    { value: "ph-users-three", label: "Family" },
    { value: "ph-house", label: "Home" },
    { value: "ph-heart", label: "Care" },
  ],
  Business: [
    { value: "ph-buildings", label: "Building" },
    { value: "ph-briefcase", label: "Briefcase" },
    { value: "ph-storefront", label: "Storefront" },
    { value: "ph-factory", label: "Factory" },
  ],
};

const currentUser = "Adam";

const commonCategories = ["Banking", "ERP", "Housing", "Utilities", "Taxes"];

const initialItems = [
  {
    id: "banking",
    spaceId: "adam",
    service: "Chase Checking",
    descriptor: "Checking account",
    category: "Banking",
    icon: "ph-bank",
    logo: "/logos/chase.jpg",
    account: "adam@example.dev",
    site: "harborline.example",
    fields: 8,
    updated: "2h ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Billing address", siteLabel: "billing_address_line_1", value: "Inherited · 123 Market St" },
      { label: "Account nickname", siteLabel: "account_nickname", value: "Daily checking" },
    ],
  },
  {
    id: "insurance",
    spaceId: "adam",
    service: "State Farm Insurance",
    descriptor: "Home policy",
    category: "Housing",
    icon: "ph-shield-check",
    logo: "/logos/state-farm.png",
    account: "Policy · GE-4077",
    site: "falador-mutual.example",
    fields: 14,
    updated: "Yesterday",
    username: "a. ironside@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Street address", siteLabel: "address_line_1", value: "Inherited · 123 Market St" },
      { label: "Policy number", siteLabel: "policy_number", value: "GE-4077" },
    ],
  },
  {
    id: "netsuite",
    spaceId: "adam",
    service: "NetSuite ERP",
    descriptor: "Business operations",
    category: "ERP",
    icon: "ph-chart-line-up",
    logo: "/logos/netsuite.png",
    account: "adam@imrahiltech.dev",
    site: "netsuite.example",
    fields: 18,
    updated: "Yesterday",
    username: "adam@imrahiltech.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Company code", siteLabel: "company_code", value: "IMR-1000" },
      { label: "Billing address", siteLabel: "billing_address_line_1", value: "Inherited · 123 Market St" },
    ],
  },
  {
    id: "pge",
    spaceId: "adam",
    service: "PG&E Utilities",
    descriptor: "Electric service",
    category: "Utilities",
    icon: "ph-lightning",
    logo: "/logos/pge.png",
    account: "adam@example.dev",
    site: "pge.example",
    fields: 10,
    updated: "2d ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Service address", siteLabel: "service_address_line_1", value: "Inherited · 123 Market St" },
      { label: "Account number", siteLabel: "account_number", value: "CU-88931" },
    ],
  },
  {
    id: "google-workspace",
    spaceId: "adam",
    service: "Google Workspace",
    descriptor: "Email and files",
    category: "ERP",
    icon: "ph-google-logo",
    logo: "/logos/google.png",
    account: "adam@example.dev",
    site: "workspace.google.com",
    fields: 12,
    updated: "3d ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Recovery email", siteLabel: "recovery_email", value: "Inherited · recovery@example.dev" },
      { label: "Workspace domain", siteLabel: "workspace_domain", value: "example.dev" },
    ],
  },
  {
    id: "amazon",
    spaceId: "adam",
    service: "Amazon",
    descriptor: "Shopping account",
    category: "Banking",
    icon: "ph-shopping-bag-open",
    logo: "/logos/amazon.png",
    account: "adam@example.dev",
    site: "amazon.com",
    fields: 8,
    updated: "4d ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Delivery address", siteLabel: "address_line_1", value: "Inherited · 123 Market St" },
      { label: "Phone", siteLabel: "phone_number", value: "Inherited · +1 555 010 0198" },
    ],
  },
  {
    id: "target",
    spaceId: "adam",
    service: "Target RedCard",
    descriptor: "Retail account",
    category: "Banking",
    icon: "ph-credit-card",
    logo: "/logos/target.png",
    account: "adam@example.dev",
    site: "target.com",
    fields: 9,
    updated: "5d ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Shipping address", siteLabel: "shipping_address_line_1", value: "Inherited · 123 Market St" },
      { label: "Card nickname", siteLabel: "card_nickname", value: "Household" },
    ],
  },
  {
    id: "dropbox",
    spaceId: "adam",
    service: "Dropbox",
    descriptor: "Cloud files",
    category: "ERP",
    icon: "ph-dropbox-logo",
    logo: "/logos/dropbox.png",
    account: "adam@example.dev",
    site: "dropbox.com",
    fields: 7,
    updated: "6d ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Recovery phone", siteLabel: "recovery_phone", value: "Inherited · +1 555 010 0198" },
      { label: "Team name", siteLabel: "team_name", value: "Personal files" },
    ],
  },
  {
    id: "vanguard",
    spaceId: "adam",
    service: "Vanguard Brokerage",
    descriptor: "Investment account",
    category: "Banking",
    icon: "ph-chart-line-up",
    logo: "/logos/vanguard.jpg",
    account: "adam@example.dev",
    site: "vanguard.com",
    fields: 13,
    updated: "1w ago",
    username: "adam@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Account nickname", siteLabel: "account_nickname", value: "Long-term" },
      { label: "Mailing address", siteLabel: "mailing_address_line_1", value: "Inherited · 123 Market St" },
    ],
  },
  {
    id: "family-health",
    spaceId: "family",
    service: "Northstar Health",
    descriptor: "Family member portal",
    category: "Utilities",
    icon: "ph-heartbeat",
    account: "Family portal",
    site: "northstar-health.example",
    fields: 11,
    updated: "3d ago",
    username: "family@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Member name", siteLabel: "member_name", value: "Family space" },
      { label: "Phone", siteLabel: "contact_phone", value: "Inherited · +1 555 010 0198" },
    ],
  },
  {
    id: "quickbooks",
    spaceId: "imrahil",
    service: "Ledgerline ERP",
    descriptor: "Finance operations",
    category: "ERP",
    icon: "ph-chart-line-up",
    account: "Company · Imrahil",
    site: "ledgerline.example",
    fields: 18,
    updated: "Yesterday",
    username: "finance@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Company code", siteLabel: "company_code", value: "IMR-1000" },
      { label: "Billing address", siteLabel: "billing_address_line_1", value: "Inherited · 123 Stonebrook Way" },
    ],
  },
  {
    id: "workspace",
    spaceId: "imrahil",
    service: "Workroom",
    descriptor: "Team workspace",
    category: "ERP",
    icon: "ph-grid-four",
    account: "Imrahil Technologies",
    site: "workroom.example",
    fields: 9,
    updated: "4d ago",
    username: "team@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Workspace name", siteLabel: "workspace_name", value: "Imrahil Technologies" },
      { label: "Support email", siteLabel: "support_email", value: "Inherited · support@example.dev" },
    ],
  },
  {
    id: "vendors",
    spaceId: "baine",
    service: "Vendor Desk",
    descriptor: "Procurement portal",
    category: "ERP",
    icon: "ph-handshake",
    account: "Baine Industries",
    site: "vendor-desk.example",
    fields: 12,
    updated: "5d ago",
    username: "ops@example.dev",
    password: "••••••••••••",
    mfa: "••••••••••••",
    custom: [
      { label: "Legal entity", siteLabel: "legal_entity_name", value: "Baine Industries" },
      { label: "Tax address", siteLabel: "tax_address_line_1", value: "Inherited · 123 Market St" },
    ],
  },
];

function Icon({ name, size = 18, weight = "regular" }) {
  return <i className={`ph ${name} ${weight}`} style={{ fontSize: size }} aria-hidden="true" />;
}

function ServiceLogo({ item, size = "row" }) {
  if (item.logo) return <img className={`service-logo service-logo--${size}`} src={item.logo} alt={`${item.service} logo`} />;
  return <Icon name={item.icon} size={size === "inspector" ? 32 : 21} weight="duotone" />;
}

function SpaceNav({ spaces, activeSpace, onSelect, onAddSpace, onSpaceAction, openMenuId, onToggleMenu, onSettings }) {
  const visibleSpaces = spaces.filter((space) => !space.archived);
  const personal = visibleSpaces.filter((space) => space.type === "Personal");
  const business = visibleSpaces.filter((space) => space.type === "Business");

  return (
    <nav className="space-nav" aria-label="Vault navigation">
      <button className={`nav-link ${activeSpace === "all" ? "is-active" : ""}`} onClick={() => onSelect("all")}>
        <Icon name="ph-squares-four" />
        <span>All spaces</span>
      </button>
      <SpaceGroup title="Personal spaces" spaces={personal} activeSpace={activeSpace} onSelect={onSelect} onAddSpace={onAddSpace} openMenuId={openMenuId} onToggleMenu={onToggleMenu} onSpaceAction={onSpaceAction} />
      <SpaceGroup title="Business spaces" spaces={business} activeSpace={activeSpace} onSelect={onSelect} onAddSpace={onAddSpace} openMenuId={openMenuId} onToggleMenu={onToggleMenu} onSpaceAction={onSpaceAction} />
      <div className="nav-rule" />
      <button className="nav-link nav-link--quiet" onClick={onSettings}>
        <Icon name="ph-gear-six" />
        <span>Settings</span>
      </button>
    </nav>
  );
}

function SpaceGroup({ title, spaces: groupSpaces, activeSpace, onSelect, onAddSpace, openMenuId, onToggleMenu, onSpaceAction }) {
  return (
    <section className="space-group">
      <div className="space-group__head">
        <span>{title}</span>
        <button onClick={() => onAddSpace(title.startsWith("Personal") ? "Personal" : "Business")} aria-label={`Add ${title.toLowerCase()}`}><Icon name="ph-plus" size={14} /></button>
      </div>
      {groupSpaces.map((space) => (
        <div className="space-row" key={space.id}>
          <button className={`nav-link ${activeSpace === space.id ? "is-active" : ""}`} onClick={() => onSelect(space.id)}>
            <Icon name={space.icon} />
            <span>{space.name}</span>
            {activeSpace === space.id && <span className="nav-active-dot" />}
          </button>
          <button className="space-more" onClick={() => onToggleMenu(space.id)} aria-label={`Manage ${space.name}`} aria-expanded={openMenuId === space.id}><Icon name="ph-dots-three" size={17} /></button>
          {openMenuId === space.id && <div className="space-menu" role="menu">
            <button onClick={() => onSpaceAction("rename", space.id)} role="menuitem"><Icon name="ph-pencil-simple" size={14} /> Rename</button>
            <button onClick={() => onSpaceAction("merge", space.id)} role="menuitem"><Icon name="ph-arrows-left-right" size={14} /> Merge</button>
            <button onClick={() => onSpaceAction("archive", space.id)} role="menuitem"><Icon name="ph-archive" size={14} /> Archive</button>
            <button className="is-danger" onClick={() => onSpaceAction("delete", space.id)} role="menuitem"><Icon name="ph-trash" size={14} /> Delete</button>
          </div>}
        </div>
      ))}
    </section>
  );
}

function App() {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [activeSpace, setActiveSpace] = useState("adam");
  const [activeCategory, setActiveCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("banking");
  const [items, setItems] = useState(initialItems);
  const [customCategories, setCustomCategories] = useState([]);
  const [modal, setModal] = useState(null);
  const [spaceMenuId, setSpaceMenuId] = useState(null);
  const [spaceAction, setSpaceAction] = useState(null);
  const [spaceDraftType, setSpaceDraftType] = useState("Personal");
  const [spaceDraftIcon, setSpaceDraftIcon] = useState(spaceIconOptions.Personal[0].value);
  const [darkMode, setDarkMode] = useState(false);

  const selectedSpace = spaces.find((space) => space.id === activeSpace);
  const scopedItems = activeSpace === "all" ? items : items.filter((item) => item.spaceId === activeSpace);
  const availableCategories = useMemo(() => {
    const itemCategories = scopedItems.map((item) => item.category);
    const addedCategories = customCategories
      .filter((category) => activeSpace === "all" || category.spaceId === "all" || category.spaceId === activeSpace)
      .map((category) => category.name);
    return ["All items", ...new Set([...commonCategories.filter((category) => itemCategories.includes(category)), ...itemCategories, ...addedCategories])];
  }, [activeSpace, customCategories, scopedItems]);
  const categoryOptions = useMemo(() => {
    const addedCategories = customCategories.map((category) => category.name);
    return [...new Set([...commonCategories, ...items.map((item) => item.category), ...addedCategories])];
  }, [customCategories, items]);
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const spaceMatch = activeSpace === "all" || item.spaceId === activeSpace;
      const categoryMatch = activeCategory === "All items" || item.category === activeCategory;
      const queryMatch = !normalizedQuery || [item.service, item.descriptor, item.category, item.account, item.site, ...item.custom.map((field) => `${field.label} ${field.siteLabel}`)].join(" ").toLowerCase().includes(normalizedQuery);
      return spaceMatch && categoryMatch && queryMatch;
    });
  }, [activeCategory, activeSpace, items, query]);

  const selectedItem = visibleItems.find((item) => item.id === selectedId) || visibleItems[0];
  const selectedItemSpace = selectedItem ? spaces.find((space) => space.id === selectedItem.spaceId) : undefined;

  function selectSpace(spaceId) {
    setActiveSpace(spaceId);
    setActiveCategory("All items");
    setSpaceMenuId(null);
    const next = items.find((item) => spaceId === "all" || item.spaceId === spaceId);
    if (next) setSelectedId(next.id);
  }

  function openCreateSpace(type) {
    setSpaceDraftType(type);
    setSpaceDraftIcon(spaceIconOptions[type][0].value);
    setSpaceMenuId(null);
    setModal("space");
  }

  function createSpace(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("spaceName")?.toString().trim();
    if (!name) return;
    const newSpace = { id: `space-${Date.now()}`, name, type: spaceDraftType, icon: spaceDraftIcon, accessLive: false };
    setSpaces((current) => [...current, newSpace]);
    setActiveSpace(newSpace.id);
    setActiveCategory("All items");
    setModal(null);
  }

  function openSpaceAction(action, spaceId) {
    setSpaceMenuId(null);
    setSpaceAction({ action, spaceId });
  }

  function renameSpace(event) {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("spaceName")?.toString().trim();
    if (!name || !spaceAction) return;
    setSpaces((current) => current.map((space) => space.id === spaceAction.spaceId ? { ...space, name } : space));
    setSpaceAction(null);
  }

  function archiveSpace() {
    if (!spaceAction) return;
    setSpaces((current) => current.map((space) => space.id === spaceAction.spaceId ? { ...space, archived: true } : space));
    if (activeSpace === spaceAction.spaceId) setActiveSpace("all");
    setSpaceAction(null);
  }

  function deleteSpace() {
    if (!spaceAction) return;
    setSpaces((current) => current.filter((space) => space.id !== spaceAction.spaceId));
    setItems((current) => current.filter((item) => item.spaceId !== spaceAction.spaceId));
    if (activeSpace === spaceAction.spaceId) setActiveSpace("all");
    setSpaceAction(null);
  }

  function mergeSpace(event) {
    event.preventDefault();
    if (!spaceAction) return;
    const targetId = new FormData(event.currentTarget).get("targetSpaceId")?.toString();
    if (!targetId) return;
    setItems((current) => current.map((item) => item.spaceId === spaceAction.spaceId ? { ...item, spaceId: targetId } : item));
    setSpaces((current) => current.filter((space) => space.id !== spaceAction.spaceId));
    if (activeSpace === spaceAction.spaceId) setActiveSpace(targetId);
    setSpaceAction(null);
  }

  function addVaultItem(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newItem = {
      id: `new-${Date.now()}`,
      spaceId: activeSpace === "all" ? "adam" : activeSpace,
      service: form.get("service") || "New service",
      descriptor: "New Vault Item",
      category: form.get("category") || "Banking",
      icon: "ph-key",
      account: form.get("account") || "Account label",
      site: form.get("site") || "service.example",
      fields: 3,
      updated: "Just now",
      username: form.get("account") || "account@example.dev",
      password: "••••••••••••",
      mfa: "Not added",
      custom: [{ label: "Website field", siteLabel: "field_name", value: "Not added" }],
    };
    setItems((current) => [newItem, ...current]);
    setSelectedId(newItem.id);
    setModal(null);
  }

  function addCategory(event) {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("categoryName")?.toString().trim();
    if (!name) return;
    const scopeId = activeSpace === "all" ? "all" : activeSpace;
    setCustomCategories((current) => current.some((category) => category.name.toLowerCase() === name.toLowerCase() && (category.spaceId === scopeId || category.spaceId === "all")) ? current : [...current, { name, spaceId: scopeId }]);
    setActiveCategory("All items");
    setModal(null);
  }

  const archivedSpaces = spaces.filter((space) => space.archived);
  const actionSpace = spaceAction ? spaces.find((space) => space.id === spaceAction.spaceId) : null;
  const mergeTargets = actionSpace ? spaces.filter((space) => !space.archived && space.id !== actionSpace.id && space.type === actionSpace.type) : [];

  return (
    <div className={`app-shell ${darkMode ? "is-dark" : ""}`}>
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><Icon name="ph-vault" size={22} weight="duotone" /></div>
          <div>
            <div className="brand-name">Agent Vault</div>
            <div className="brand-meta">LOCAL-FIRST / PRIVATE</div>
          </div>
        </div>
        <SpaceNav spaces={spaces} activeSpace={activeSpace} onSelect={selectSpace} onAddSpace={openCreateSpace} openMenuId={spaceMenuId} onToggleMenu={(spaceId) => setSpaceMenuId((current) => current === spaceId ? null : spaceId)} onSpaceAction={openSpaceAction} onSettings={() => { setSpaceMenuId(null); setModal("settings"); }} />
        <div className="sidebar-foot">
          <span className={`status-dot ${selectedSpace?.accessLive ? "" : "status-dot--offline"}`} />
          <div><strong>{currentUser}</strong><small>{selectedSpace?.accessLive ? "Vault Access Live" : "No Vault Access"}</small></div>
        </div>
      </aside>

      <main className="main-stage">
        <header className="topbar">
          <div className="crumbs"><span>VAULT</span><Icon name="ph-slash" size={12} /><span>{selectedSpace?.name || "ALL SPACES"}</span></div>
          <div className="topbar-actions">
            <span className="agent-note"><Icon name="ph-brackets-curly" size={14} /> AGENT-READABLE</span>
            <button className="button button--dark" onClick={() => setModal("add")}> <Icon name="ph-plus" size={15} /> Add Vault Item</button>
          </div>
        </header>

        <div className="content-wrap">
          <section className="page-intro">
            <div>
              <span className="eyebrow">01 / VAULT MANAGEMENT</span>
              <h1>{selectedSpace ? selectedSpace.name : "All spaces"}</h1>
              <p>{selectedSpace ? `${selectedSpace.type} Vault Space · ${visibleItems.length} items` : `${visibleItems.length} items across your Vault Spaces`}</p>
            </div>
            <button className="button button--light" onClick={() => setModal("core")}><Icon name="ph-address-book" size={16} /> Manage Core Info</button>
          </section>

          <div className="search-row">
            <label className="search-field">
              <Icon name="ph-magnifying-glass" size={19} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search service, field label, category…" aria-label="Search vault items" />
              {query && <button onClick={() => setQuery("")} aria-label="Clear search"><Icon name="ph-x" size={14} /></button>}
            </label>
          </div>

          <div className="category-tabs" role="tablist" aria-label="Vault categories">
            {availableCategories.map((category) => (
              <button key={category} className={activeCategory === category ? "is-selected" : ""} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>
            ))}
            <button className="category-add" onClick={() => setModal("category")} aria-label="Add category"><Icon name="ph-plus" size={14} /></button>
          </div>

          <div className="list-meta"><span>{visibleItems.length.toString().padStart(2, "0")} RECORDS</span></div>
          <section className="item-list" aria-label="Vault items">
            {visibleItems.length ? visibleItems.map((item, index) => (
              <button key={item.id} className={`item-row ${selectedItem?.id === item.id ? "is-selected" : ""}`} onClick={() => setSelectedId(item.id)}>
                <span className="item-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-glyph"><ServiceLogo item={item} /></span>
                <span className="item-copy"><strong>{item.service}</strong><small>{item.descriptor} · {item.account}</small></span>
                <span className={`category-mark category-mark--${item.category.toLowerCase()}`}>{item.category}</span>
                <span className="item-fields"><Icon name="ph-brackets-curly" size={13} /> {item.fields}</span>
                <span className="item-updated">{item.updated}</span>
                <Icon name="ph-arrow-up-right" size={17} />
              </button>
            )) : <div className="empty-state"><Icon name="ph-binoculars" size={30} /><strong>No records found</strong><span>Try another field label, service, or category.</span></div>}
          </section>
        </div>
      </main>

      {selectedItem && <aside className="inspector" aria-label="Selected Vault Item">
        <div className="inspector-head">
          <div className="inspector-identity"><div className="inspector-logo"><ServiceLogo item={selectedItem} size="inspector" /></div><div><span className="eyebrow">VAULT ITEM / {selectedItemSpace?.name}</span><h2>{selectedItem.service}</h2><p>{selectedItem.descriptor} · {selectedItem.category}</p></div></div>
          <button className="icon-button" aria-label="Close inspector"><Icon name="ph-x" size={18} /></button>
        </div>
        <div className="inspector-actions"><button className="button button--light button--small"><Icon name="ph-pencil-simple" size={15} /> Edit fields</button><button className="icon-button" aria-label="More item actions"><Icon name="ph-dots-three" size={19} /></button></div>
        <section className="inspector-section"><div className="section-title"><span>LOGIN</span><span className="redacted-note"><Icon name="ph-eye-slash" size={14} /> secrets redacted</span></div><FieldRow label="Username" value={selectedItem.username} /><FieldRow label="Password" value={selectedItem.password} mono /><FieldRow label="MFA secret" value={selectedItem.mfa} mono /></section>
        <section className="inspector-section"><div className="section-title"><span>CORE INFO</span><span className="source-label"><span className="source-dot" /> {selectedItemSpace?.name}</span></div><div className="core-info-callout"><Icon name="ph-arrows-clockwise" size={18} /><div><strong>Reusable by default</strong><span>These values come from this Vault Space.</span></div><button onClick={() => setModal("core")}>Review</button></div><FieldRow label="Full name" value="Adam Ironside" inherited /><FieldRow label="Email" value="adam@example.dev" inherited /><FieldRow label="Address" value="123 Market St" inherited /></section>
        <section className="inspector-section"><div className="section-title"><span>CUSTOM FIELDS</span><button className="text-action"><Icon name="ph-plus" size={13} /> Add field</button></div>{selectedItem.custom.map((field) => <div className="custom-field" key={field.siteLabel}><div className="custom-field__main"><strong>{field.label}</strong><span>{field.value}</span></div><code>{field.siteLabel}</code></div>)}</section>
        <div className="record-foot"><span>RECORD ID</span><code>item_{selectedItem.id}</code></div>
      </aside>}

      {modal === "space" && <Modal onClose={() => setModal(null)} title={`Add ${spaceDraftType} space`} eyebrow="NEW VAULT SPACE"><form onSubmit={createSpace}><div className="form-intro">Create a named Vault Space for one person or business entity.</div><label className="form-field"><span>Space name</span><input name="spaceName" placeholder={spaceDraftType === "Personal" ? "e.g. Jordan" : "e.g. Northstar LLC"} required autoFocus /></label><div className="form-field"><span>Choose an icon</span><SpaceIconPicker type={spaceDraftType} value={spaceDraftIcon} onChange={setSpaceDraftIcon} /></div><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Create space</button></div></form></Modal>}
      {modal === "settings" && <Modal onClose={() => setModal(null)} title="Settings" eyebrow="AGENT VAULT / GLOBAL"><section className="settings-group"><div className="settings-group__title">Appearance</div><div className="settings-row"><div><strong>Theme</strong><span>Paper light or dark ink</span></div><button className="button button--light button--small" onClick={() => setDarkMode((current) => !current)}>{darkMode ? "Dark mode" : "Light mode"}</button></div></section><section className="settings-group"><div className="settings-group__title">Archived spaces</div>{archivedSpaces.length ? archivedSpaces.map((space) => <div className="settings-row" key={space.id}><div><strong>{space.name}</strong><span>{space.type} Vault Space</span></div><button className="button button--light button--small" onClick={() => setSpaces((current) => current.map((item) => item.id === space.id ? { ...item, archived: false } : item))}>Restore</button></div>) : <div className="settings-empty">No archived Vault Spaces.</div>}</section><div className="modal-actions"><button className="button button--light" onClick={() => setModal(null)}>Close</button></div></Modal>}
      {spaceAction?.action === "rename" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Rename ${actionSpace.name}`} eyebrow={`${actionSpace.type.toUpperCase()} VAULT SPACE`}><form onSubmit={renameSpace}><label className="form-field"><span>Space name</span><input name="spaceName" defaultValue={actionSpace.name} required autoFocus /></label><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button type="submit" className="button button--dark">Save name</button></div></form></Modal>}
      {spaceAction?.action === "merge" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Merge ${actionSpace.name}`} eyebrow="MOVE VAULT RECORDS"><form onSubmit={mergeSpace}><div className="form-intro">Move all Vault Items and records into another {actionSpace.type} Vault Space, then remove this space.</div>{mergeTargets.length ? <label className="form-field"><span>Merge into</span><select name="targetSpaceId" defaultValue={mergeTargets[0].id}>{mergeTargets.map((space) => <option key={space.id} value={space.id}>{space.name}</option>)}</select></label> : <div className="settings-empty">No same-type Vault Spaces are available to merge into.</div>}<div className="modal-actions"><button type="button" className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button type="submit" className="button button--dark" disabled={!mergeTargets.length}>Merge space</button></div></form></Modal>}
      {spaceAction?.action === "archive" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Archive ${actionSpace.name}?`} eyebrow="HIDE VAULT SPACE"><div className="form-intro">This hides the space from the left rail. Its records remain available under Settings → Archived spaces.</div><div className="modal-actions"><button className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button className="button button--dark" onClick={archiveSpace}>Archive space</button></div></Modal>}
      {spaceAction?.action === "delete" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Delete ${actionSpace.name}?`} eyebrow="PERMANENT ACTION"><div className="form-intro">This permanently deletes the Vault Space and every Vault Item inside it. This cannot be undone.</div><div className="modal-actions"><button className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button className="button button--danger" onClick={deleteSpace}>Delete permanently</button></div></Modal>}
      {modal === "category" && <Modal onClose={() => setModal(null)} title="Add category" eyebrow={`VAULT SPACE / ${selectedSpace?.name || "ALL SPACES"}`}><form onSubmit={addCategory}><div className="form-intro">Add a label when the current categories do not fit. It will appear here and can be used on new Vault Items.</div><label className="form-field"><span>Category name</span><input name="categoryName" placeholder="e.g. Travel" required autoFocus /></label><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Add category</button></div></form></Modal>}
      {modal === "add" && <Modal onClose={() => setModal(null)} title="Add Vault Item" eyebrow="NEW RECORD"><form onSubmit={addVaultItem}><div className="form-intro">A Vault Item holds one service/account record. Reusable Core Info can fill matching fields later.</div><label className="form-field"><span>Service name</span><input name="service" placeholder="e.g. Harborline Checking" required /></label><label className="form-field"><span>Account label</span><input name="account" placeholder="e.g. Primary checking" required /></label><div className="form-grid"><label className="form-field"><span>Category</span><select name="category" defaultValue={categoryOptions[0]}>{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select></label><label className="form-field"><span>Site</span><input name="site" placeholder="service.example" /></label></div><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Create item</button></div></form></Modal>}
      {modal === "core" && <Modal onClose={() => setModal(null)} title="Core Info" eyebrow={`REUSABLE / ${selectedSpace?.name || "ALL SPACES"}`}><div className="core-modal-copy">Core Info belongs to a Vault Space. Matching fields can be reused across its Vault Items, with an item-level override when the account needs something different.</div><div className="core-modal-list"><FieldRow label="Full name" value="Adam Ironside" inherited /><FieldRow label="Email" value="adam@example.dev" inherited /><FieldRow label="Address" value="123 Market St" inherited /><FieldRow label="Phone" value="+1 555 010 0198" inherited /></div><div className="modal-actions"><button className="button button--light" onClick={() => setModal(null)}>Close</button><button className="button button--dark" onClick={() => setModal(null)}>Save changes</button></div></Modal>}
    </div>
  );
}

function FieldRow({ label, value, mono = false, inherited = false }) {
  return <div className="field-row"><span>{label}</span><strong className={mono ? "is-mono" : ""}>{value}</strong>{inherited && <small><Icon name="ph-link" size={12} /> inherited</small>}</div>;
}

function SpaceIconPicker({ type, value, onChange }) {
  return <div className="space-icon-picker">{spaceIconOptions[type].map((option) => <button type="button" key={option.value} className={value === option.value ? "is-selected" : ""} onClick={() => onChange(option.value)} aria-label={option.label} aria-pressed={value === option.value}><Icon name={option.value} size={22} /></button>)}</div>;
}

function Modal({ title, eyebrow, children, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true"><div className="modal-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="ph-x" size={19} /></button></div>{children}</div></div>;
}

export { App };
