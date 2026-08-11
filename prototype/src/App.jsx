import { useMemo, useState } from "react";

const spaces = [
  { id: "adam", name: "Adam", type: "Personal", icon: "ph-user" },
  { id: "family", name: "Family", type: "Personal", icon: "ph-users-three" },
  { id: "imrahil", name: "Imrahil Technologies", type: "Business", icon: "ph-buildings" },
  { id: "baine", name: "Baine Industries", type: "Business", icon: "ph-briefcase" },
];

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

function SpaceNav({ activeSpace, onSelect, itemCount }) {
  const personal = spaces.filter((space) => space.type === "Personal");
  const business = spaces.filter((space) => space.type === "Business");

  return (
    <nav className="space-nav" aria-label="Vault navigation">
      <button className={`nav-link ${activeSpace === "all" ? "is-active" : ""}`} onClick={() => onSelect("all")}>
        <Icon name="ph-squares-four" />
        <span>All spaces</span>
        <small>{String(itemCount).padStart(2, "0")}</small>
      </button>
      <SpaceGroup title="Personal spaces" spaces={personal} activeSpace={activeSpace} onSelect={onSelect} />
      <SpaceGroup title="Business spaces" spaces={business} activeSpace={activeSpace} onSelect={onSelect} />
      <div className="nav-rule" />
      <button className="nav-link nav-link--quiet">
        <Icon name="ph-clock-counter-clockwise" />
        <span>Recently viewed</span>
      </button>
      <button className="nav-link nav-link--quiet">
        <Icon name="ph-gear-six" />
        <span>Settings</span>
      </button>
    </nav>
  );
}

function SpaceGroup({ title, spaces: groupSpaces, activeSpace, onSelect }) {
  return (
    <section className="space-group">
      <div className="space-group__head">
        <span>{title}</span>
        <button aria-label={`Add ${title.toLowerCase()}`}><Icon name="ph-plus" size={14} /></button>
      </div>
      {groupSpaces.map((space) => (
        <button key={space.id} className={`nav-link ${activeSpace === space.id ? "is-active" : ""}`} onClick={() => onSelect(space.id)}>
          <Icon name={space.icon} />
          <span>{space.name}</span>
          {activeSpace === space.id && <span className="nav-active-dot" />}
        </button>
      ))}
    </section>
  );
}

function App() {
  const [activeSpace, setActiveSpace] = useState("adam");
  const [activeCategory, setActiveCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("banking");
  const [items, setItems] = useState(initialItems);
  const [customCategories, setCustomCategories] = useState([]);
  const [modal, setModal] = useState(null);

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
  const selectedItemSpace = spaces.find((space) => space.id === selectedItem.spaceId);

  function selectSpace(spaceId) {
    setActiveSpace(spaceId);
    setActiveCategory("All items");
    const next = items.find((item) => spaceId === "all" || item.spaceId === spaceId);
    if (next) setSelectedId(next.id);
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

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><Icon name="ph-vault" size={22} weight="duotone" /></div>
          <div>
            <div className="brand-name">Agent Vault</div>
            <div className="brand-meta">LOCAL-FIRST / PRIVATE</div>
          </div>
        </div>
        <SpaceNav activeSpace={activeSpace} onSelect={selectSpace} itemCount={items.length} />
        <div className="sidebar-foot">
          <span className="status-dot" />
          <div><strong>On this device</strong><small>Secrets stay local</small></div>
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

      {modal === "category" && <Modal onClose={() => setModal(null)} title="Add category" eyebrow={`VAULT SPACE / ${selectedSpace?.name || "ALL SPACES"}`}><form onSubmit={addCategory}><div className="form-intro">Add a label when the current categories do not fit. It will appear here and can be used on new Vault Items.</div><label className="form-field"><span>Category name</span><input name="categoryName" placeholder="e.g. Travel" required autoFocus /></label><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Add category</button></div></form></Modal>}
      {modal === "add" && <Modal onClose={() => setModal(null)} title="Add Vault Item" eyebrow="NEW RECORD"><form onSubmit={addVaultItem}><div className="form-intro">A Vault Item holds one service/account record. Reusable Core Info can fill matching fields later.</div><label className="form-field"><span>Service name</span><input name="service" placeholder="e.g. Harborline Checking" required /></label><label className="form-field"><span>Account label</span><input name="account" placeholder="e.g. Primary checking" required /></label><div className="form-grid"><label className="form-field"><span>Category</span><select name="category" defaultValue={categoryOptions[0]}>{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select></label><label className="form-field"><span>Site</span><input name="site" placeholder="service.example" /></label></div><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Create item</button></div></form></Modal>}
      {modal === "core" && <Modal onClose={() => setModal(null)} title="Core Info" eyebrow={`REUSABLE / ${selectedSpace?.name || "ALL SPACES"}`}><div className="core-modal-copy">Core Info belongs to a Vault Space. Matching fields can be reused across its Vault Items, with an item-level override when the account needs something different.</div><div className="core-modal-list"><FieldRow label="Full name" value="Adam Ironside" inherited /><FieldRow label="Email" value="adam@example.dev" inherited /><FieldRow label="Address" value="123 Market St" inherited /><FieldRow label="Phone" value="+1 555 010 0198" inherited /></div><div className="modal-actions"><button className="button button--light" onClick={() => setModal(null)}>Close</button><button className="button button--dark" onClick={() => setModal(null)}>Save changes</button></div></Modal>}
    </div>
  );
}

function FieldRow({ label, value, mono = false, inherited = false }) {
  return <div className="field-row"><span>{label}</span><strong className={mono ? "is-mono" : ""}>{value}</strong>{inherited && <small><Icon name="ph-link" size={12} /> inherited</small>}</div>;
}

function Modal({ title, eyebrow, children, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true"><div className="modal-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="ph-x" size={19} /></button></div>{children}</div></div>;
}

export { App };
