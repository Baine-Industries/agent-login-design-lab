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
const spaceNameMaxLength = 32;
const typeScales = { small: 1, medium: 1.12, large: 1.25 };

const emptyCoreInfo = {
  prefix: "",
  firstName: "",
  middleName: "",
  middleInitial: "",
  lastName: "",
  suffix: "",
  preferredName: "",
  fullName: "",
  email: "",
  address: "",
  phone: "",
};
const initialCoreInfo = {
  adam: { ...emptyCoreInfo, firstName: "Adam", lastName: "Ironside", fullName: "Adam Ironside", email: "adam@example.dev", address: "123 Market St", phone: "+1 555 010 0198" },
  family: { ...emptyCoreInfo, firstName: "Adam", lastName: "Ironside", fullName: "Adam Ironside", email: "family@example.dev", address: "123 Market St", phone: "+1 555 010 0198" },
  imrahil: { ...emptyCoreInfo, fullName: "Imrahil Technologies", email: "admin@imrahiltech.dev", address: "123 Stonebrook Way", phone: "+1 555 010 0198" },
  baine: { ...emptyCoreInfo, fullName: "Baine Industries", email: "ops@baineindustries.dev", address: "123 Market St", phone: "+1 555 010 0198" },
};

const reusableFieldTypes = [
  { value: "email", label: "Email" },
  { value: "credit-card", label: "Credit card" },
  { value: "tax-id", label: "Tax ID" },
  { value: "address", label: "Address" },
  { value: "phone", label: "Phone" },
];

const initialReusableFields = [
  { id: "email-adam", label: "Primary email", type: "email", value: "adam@example.dev", sourceSpaceId: "adam", siteLabel: "email" },
  { id: "address-adam", label: "Home address", type: "address", value: "123 Market St", sourceSpaceId: "adam", siteLabel: "address_line_1" },
  { id: "card-adam", label: "Daily card", type: "credit-card", value: "•••• 4821", sourceSpaceId: "adam", siteLabel: "card_number" },
  { id: "tax-imrahil", label: "Federal Tax ID", type: "tax-id", value: "••-•••4821", sourceSpaceId: "imrahil", siteLabel: "tax_id" },
];

const personalCategories = [
  "Banking", "Credit Cards", "Investing", "Insurance", "Healthcare", "Housing", "Utilities", "Taxes", "Government", "Education", "Travel", "Shopping", "Subscriptions", "Transportation", "Legal", "Employment", "Family", "Documents", "Communications", "Other",
];

const businessCategories = [
  "Banking", "Accounting", "ERP", "Finance", "Payroll", "HR", "CRM & Sales", "Procurement", "Vendors", "Contracts", "Insurance", "Taxes", "Legal", "Compliance", "Government", "IT & Infrastructure", "Hosting & Domains", "Marketing", "Analytics", "Communications", "Office & Facilities", "Utilities", "Travel", "Other",
];

const categorySeedsByType = { Personal: personalCategories, Business: businessCategories };
const commonCategories = [...new Set([...personalCategories, ...businessCategories])];

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
      { label: "Billing address", siteLabel: "", value: "Prefilled · 123 Market St", needsAttention: true },
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
      { label: "Street address", siteLabel: "address_line_1", value: "Prefilled · 123 Market St" },
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
      { label: "Billing address", siteLabel: "billing_address_line_1", value: "Prefilled · 123 Market St" },
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
      { label: "Service address", siteLabel: "service_address_line_1", value: "Prefilled · 123 Market St" },
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
      { label: "Recovery email", siteLabel: "recovery_email", value: "Prefilled · recovery@example.dev" },
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
      { label: "Delivery address", siteLabel: "address_line_1", value: "Prefilled · 123 Market St" },
      { label: "Phone", siteLabel: "phone_number", value: "Prefilled · +1 555 010 0198" },
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
      { label: "Shipping address", siteLabel: "shipping_address_line_1", value: "Prefilled · 123 Market St" },
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
      { label: "Recovery phone", siteLabel: "recovery_phone", value: "Prefilled · +1 555 010 0198" },
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
      { label: "Mailing address", siteLabel: "mailing_address_line_1", value: "Prefilled · 123 Market St" },
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
      { label: "Phone", siteLabel: "contact_phone", value: "Prefilled · +1 555 010 0198" },
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
      { label: "Billing address", siteLabel: "billing_address_line_1", value: "Prefilled · 123 Stonebrook Way" },
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
      { label: "Support email", siteLabel: "support_email", value: "Prefilled · support@example.dev" },
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
      { label: "Tax address", siteLabel: "tax_address_line_1", value: "Prefilled · 123 Market St" },
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

function SpaceNav({ spaces, activeSpace, onSelect, onAddSpace, onSpaceAction, openMenuId, onToggleMenu, onActivity, onSettings, activityCount }) {
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
      <button className="nav-link nav-link--quiet" onClick={onActivity} aria-label={`Activity, ${activityCount} unresolved actions`}>
        <Icon name="ph-activity" />
        <span className="nav-link__label">Activity{activityCount > 0 && <span className="nav-badge">{activityCount}</span>}</span>
      </button>
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
  const [addItemSpaceId, setAddItemSpaceId] = useState("adam");
  const [coreInfoBySpace, setCoreInfoBySpace] = useState(initialCoreInfo);
  const [coreDraftsBySpace, setCoreDraftsBySpace] = useState({});
  const [reusableFields, setReusableFields] = useState(initialReusableFields);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("small");
  const [pendingRequest, setPendingRequest] = useState(true);
  const [recentActivity, setRecentActivity] = useState(null);
  const attentionItem = items.find((item) => item.custom.some((field) => field.needsAttention));
  const activityCount = (pendingRequest ? 1 : 0) + (attentionItem ? 1 : 0);

  const selectedSpace = spaces.find((space) => space.id === activeSpace);
  const typeScale = typeScales[fontSize];
  const scopedItems = activeSpace === "all" ? items : items.filter((item) => item.spaceId === activeSpace);
  const availableCategories = useMemo(() => {
    const itemCategories = scopedItems.map((item) => item.category);
    const addedCategories = customCategories
      .filter((category) => activeSpace === "all" || category.spaceId === "all" || category.spaceId === activeSpace)
      .map((category) => category.name);
    return ["All items", ...new Set([...commonCategories.filter((category) => itemCategories.includes(category)), ...itemCategories, ...addedCategories])];
  }, [activeSpace, customCategories, scopedItems]);
  const categoryOptions = useMemo(() => {
    const seededCategories = activeSpace === "all" ? commonCategories : categorySeedsByType[selectedSpace?.type] || commonCategories;
    const itemCategories = scopedItems.map((item) => item.category);
    const addedCategories = customCategories
      .filter((category) => activeSpace === "all" || category.spaceId === "all" || category.spaceId === activeSpace)
      .map((category) => category.name);
    return [...new Set([...seededCategories, ...itemCategories, ...addedCategories])];
  }, [activeSpace, customCategories, scopedItems, selectedSpace?.type]);
  const addItemCategoryOptions = useMemo(() => {
    const addSpace = spaces.find((space) => space.id === addItemSpaceId);
    const seededCategories = addSpace ? categorySeedsByType[addSpace.type] : commonCategories;
    const itemCategories = items.filter((item) => item.spaceId === addItemSpaceId).map((item) => item.category);
    const addedCategories = customCategories
      .filter((category) => category.spaceId === "all" || category.spaceId === addItemSpaceId)
      .map((category) => category.name);
    return [...new Set([...seededCategories, ...itemCategories, ...addedCategories])];
  }, [addItemSpaceId, customCategories, items, spaces]);
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const spaceMatch = activeSpace === "all" || item.spaceId === activeSpace;
      const categoryMatch = activeCategory === "All items" || item.category === activeCategory;
      const queryMatch = !normalizedQuery || [item.service, item.descriptor, item.category, item.account, item.site, ...item.custom.map((field) => `${field.label} ${field.siteLabel}`)].join(" ").toLowerCase().includes(normalizedQuery);
      return spaceMatch && categoryMatch && queryMatch;
    });
  }, [activeCategory, activeSpace, items, query]);

  const selectedItem = items.find((item) => item.id === selectedId && (activeSpace === "all" || item.spaceId === activeSpace)) || visibleItems[0];
  const selectedItemSpace = selectedItem ? spaces.find((space) => space.id === selectedItem.spaceId) : undefined;
  const coreInfoSpace = selectedItemSpace || selectedSpace;
  const coreInfo = coreInfoSpace ? coreInfoBySpace[coreInfoSpace.id] || emptyCoreInfo : emptyCoreInfo;
  const coreInfoDraft = coreInfoSpace ? coreDraftsBySpace[coreInfoSpace.id] : undefined;

  function selectSpace(spaceId) {
    setActiveSpace(spaceId);
    setActiveCategory("All items");
    setSpaceMenuId(null);
    const next = items.find((item) => spaceId === "all" || item.spaceId === spaceId);
    if (next) setSelectedId(next.id);
  }

  function openActivityItem(itemId, { edit = false } = {}) {
    const item = items.find((candidate) => candidate.id === itemId);
    if (!item) return;
    setActiveSpace(item.spaceId);
    setActiveCategory("All items");
    setSelectedId(item.id);
    setModal(edit ? { type: "edit", itemId: item.id } : null);
  }

  function openActivityRequest() {
    setModal("request");
  }

  function resolvePendingRequest(outcome) {
    setPendingRequest(false);
    if (outcome === "approved") {
      const northstarItem = {
        id: "northstar-health",
        spaceId: "family",
        service: "Northstar Health",
        descriptor: "Family member portal",
        category: "Healthcare",
        icon: "ph-heartbeat",
        account: "Family account",
        site: "northstar-health.example",
        fields: 6,
        updated: "just now",
        username: "Not entered",
        password: "••••••••••••",
        mfa: "••••••••••••",
        custom: [
          { label: "Member name", siteLabel: "member_name", value: "Family space" },
          { label: "Phone", siteLabel: "contact_phone", value: "Prefilled · +1 555 010 0198" },
        ],
      };
      setItems((current) => current.some((item) => item.id === northstarItem.id) ? current : [...current, northstarItem]);
      setActiveSpace("family");
      setActiveCategory("All items");
      setSelectedId(northstarItem.id);
      setRecentActivity({ title: "Northstar Health added to Family", detail: "Adam · just now", status: "Added" });
    } else {
      setRecentActivity({ title: "Create Vault Item rejected", detail: "Adam · just now", status: "Rejected" });
    }
    setModal("activity");
  }

  function openCreateSpace(type) {
    setSpaceDraftType(type);
    setSpaceDraftIcon(spaceIconOptions[type][0].value);
    setSpaceMenuId(null);
    setModal("space");
  }

  function openAddItem() {
    setAddItemSpaceId(activeSpace === "all" ? "" : activeSpace);
    setModal("add");
  }

  function openEditItem() {
    if (selectedItem) setModal({ type: "edit", itemId: selectedItem.id });
  }

  function createSpace(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("spaceName")?.toString().trim().slice(0, spaceNameMaxLength);
    if (!name) return;
    const newSpace = { id: `space-${Date.now()}`, name, type: spaceDraftType, icon: spaceDraftIcon, accessLive: false };
    setSpaces((current) => [...current, newSpace]);
    setCoreInfoBySpace((current) => ({ ...current, [newSpace.id]: emptyCoreInfo }));
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
    const name = new FormData(event.currentTarget).get("spaceName")?.toString().trim().slice(0, spaceNameMaxLength);
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
    const spaceId = form.get("spaceId")?.toString();
    if (!spaceId || !spaces.some((space) => space.id === spaceId && !space.archived)) return;
    const newItem = {
      id: `new-${Date.now()}`,
      spaceId,
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
    setActiveSpace(spaceId);
    setActiveCategory("All items");
    setSelectedId(newItem.id);
    setModal({ type: "edit", itemId: newItem.id });
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

  function saveItem(itemId, draft) {
    setItems((current) => current.map((item) => item.id === itemId ? { ...item, ...draft, updated: "Just now" } : item));
    setModal(null);
  }

  function saveCoreInfoDraft(spaceId, draft) {
    setCoreDraftsBySpace((current) => ({ ...current, [spaceId]: draft }));
    setModal(null);
  }

  function compileCoreInfo(spaceId, draft) {
    setCoreInfoBySpace((current) => ({ ...current, [spaceId]: draft }));
    setCoreDraftsBySpace((current) => {
      const next = { ...current };
      delete next[spaceId];
      return next;
    });
    setModal(null);
  }

  function saveReusableField(field, sourceSpaceId) {
    if (!field?.label || !field.value) return;
    const duplicate = reusableFields.some((saved) => saved.label.toLowerCase() === field.label.toLowerCase() && saved.value === field.value && saved.sourceSpaceId === sourceSpaceId);
    if (duplicate) return;
    setReusableFields((current) => [...current, { ...field, id: `reusable-${Date.now()}`, sourceSpaceId }]);
  }

  const archivedSpaces = spaces.filter((space) => space.archived);
  const actionSpace = spaceAction ? spaces.find((space) => space.id === spaceAction.spaceId) : null;
  const mergeTargets = actionSpace ? spaces.filter((space) => !space.archived && space.id !== actionSpace.id && space.type === actionSpace.type) : [];
  const editItem = modal?.type === "edit" ? items.find((item) => item.id === modal.itemId) : null;

  return (
    <div className={`app-shell ${darkMode ? "is-dark" : ""}`} style={{ "--type-scale": typeScale }}>
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-name">Agent Vault</div>
        </div>
        <SpaceNav spaces={spaces} activeSpace={activeSpace} onSelect={selectSpace} onAddSpace={openCreateSpace} openMenuId={spaceMenuId} onToggleMenu={(spaceId) => setSpaceMenuId((current) => current === spaceId ? null : spaceId)} onSpaceAction={openSpaceAction} onActivity={() => { setSpaceMenuId(null); setModal("activity"); }} onSettings={() => { setSpaceMenuId(null); setModal("settings"); }} activityCount={activityCount} />
        <div className="sidebar-foot">
          <div className="sidebar-agent-status" aria-label="Agent working">
            <span className="agent-working-animation" aria-hidden="true" />
            <div><strong>Agent working</strong><small>Update Falador Mutual</small></div>
          </div>
          <div className="sidebar-user-status">
            <span className={`status-dot ${!selectedSpace ? "status-dot--neutral" : selectedSpace.accessLive ? "" : "status-dot--offline"}`} />
            <div><strong>{currentUser}</strong><small>{!selectedSpace ? "No Space Selected" : selectedSpace.accessLive ? "Vault Access Live" : "No Vault Access"}</small></div>
          </div>
        </div>
      </aside>

      <main className="main-stage">
        <header className="topbar">
          <div className="topbar-left">
            <div className="crumbs"><span>VAULT</span><Icon name="ph-slash" size={12} /><span>{selectedSpace?.name || "ALL SPACES"}</span></div>
            <button className="button button--light button--small" onClick={() => setModal("core")}><Icon name="ph-address-book" size={15} /> Manage Core Info</button>
          </div>
          <div className="topbar-actions">
            <button className="button button--dark" onClick={openAddItem}> <Icon name="ph-plus" size={15} /> Add Vault Item</button>
          </div>
        </header>

        <div className="content-wrap">
          <section className="page-intro">
            <div>
              <h1>{selectedSpace ? selectedSpace.name : "All spaces"}</h1>
              <p>{selectedSpace ? `${selectedSpace.type} Vault Space · ${visibleItems.length} items` : `${visibleItems.length} items across your Vault Spaces`}</p>
            </div>
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
              </button>
            )) : <div className="empty-state"><Icon name="ph-binoculars" size={30} /><strong>No records found</strong><span>Try another field label, service, or category.</span></div>}
          </section>
        </div>
      </main>

      <aside className="inspector" aria-label="Selected Vault Item">
        {selectedItem ? <>
        <div className="inspector-head">
          <div className="inspector-identity"><div className="inspector-logo"><ServiceLogo item={selectedItem} size="inspector" /></div><div><span className="eyebrow">VAULT ITEM / {selectedItemSpace?.name}</span><h2>{selectedItem.service}</h2><p>{selectedItem.descriptor} · {selectedItem.category}</p></div></div>
          <button className="button button--light button--small inspector-edit" onClick={openEditItem}><Icon name="ph-pencil-simple" size={14} /> Edit</button>
        </div>
        <section className="inspector-section"><div className="section-title"><span>LOGIN</span><span className="redacted-note"><Icon name="ph-eye-slash" size={14} /> secrets redacted</span></div><FieldRow label="Username" value={selectedItem.username} /><FieldRow label="Password" value={selectedItem.password} mono /><FieldRow label="Verification" value="User prompt if required" /></section>
        <section className="inspector-section"><div className="section-title"><span>CORE INFO</span><span className="source-label"><span className="source-dot" /> {selectedItemSpace?.name}</span></div><FieldRow label="Full name" value={coreInfo.fullName} prefilled /><FieldRow label="Email" value={coreInfo.email} prefilled /><FieldRow label="Address" value={coreInfo.address} prefilled /></section>
        <section className="inspector-section"><div className="section-title"><span>CUSTOM FIELDS</span></div>{selectedItem.custom.map((field) => <div className={`custom-field ${field.needsAttention ? "custom-field--attention" : ""}`} key={`${field.label}-${field.siteLabel}`}><div className="custom-field__main"><div className="custom-field__label"><strong>{field.label}</strong>{field.needsAttention && <span className="field-attention"><Icon name="ph-warning" size={12} /> Needs attention</span>}</div><span>{field.value}</span></div><code>{field.siteLabel || "site label not set"}</code></div>)}</section>
        <div className="record-foot"><span>SAVED {selectedItem.updated}</span><span>RECORD ID <code>item_{selectedItem.id}</code></span></div>
        </> : <div className="inspector-empty"><span className="eyebrow">VAULT ITEM</span><h2>No Vault Item selected</h2><p>Select a record to inspect it.</p></div>}
      </aside>

      {modal === "space" && <Modal onClose={() => setModal(null)} title={`Add ${spaceDraftType} space`} eyebrow="NEW VAULT SPACE"><form onSubmit={createSpace}><div className="form-intro">Create a named Vault Space for one person or business entity.</div><label className="form-field"><span>Space name</span><input name="spaceName" maxLength={spaceNameMaxLength} placeholder={spaceDraftType === "Personal" ? "e.g. Jordan" : "e.g. Northstar LLC"} required autoFocus /></label><div className="form-field"><span>Choose an icon</span><SpaceIconPicker type={spaceDraftType} value={spaceDraftIcon} onChange={setSpaceDraftIcon} /></div><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Create space</button></div></form></Modal>}
      {modal === "settings" && <Modal onClose={() => setModal(null)} title="Settings" eyebrow="AGENT VAULT / GLOBAL"><section className="settings-group"><div className="settings-group__title">Appearance</div><div className="settings-row settings-row--stacked"><div><strong>Text size</strong><span>Choose a comfortable reading size.</span></div><div className="font-size-options" role="group" aria-label="Text size">{Object.keys(typeScales).map((size) => <button key={size} type="button" className={`font-size-option ${fontSize === size ? "is-selected" : ""}`} onClick={() => setFontSize(size)} aria-pressed={fontSize === size}>{size[0].toUpperCase() + size.slice(1)}</button>)}</div></div><div className="settings-row"><div><strong>Theme</strong><span>Paper light or dark ink</span></div><button className="button button--light button--small" onClick={() => setDarkMode((current) => !current)}>{darkMode ? "Use light mode" : "Use dark mode"}</button></div></section><section className="settings-group"><div className="settings-group__title">Archived spaces</div>{archivedSpaces.length ? archivedSpaces.map((space) => <div className="settings-row" key={space.id}><div><strong>{space.name}</strong><span>{space.type} Vault Space</span></div><button className="button button--light button--small" onClick={() => setSpaces((current) => current.map((item) => item.id === space.id ? { ...item, archived: false } : item))}>Restore</button></div>) : <div className="settings-empty">No archived Vault Spaces.</div>}</section><div className="modal-actions"><button className="button button--light" onClick={() => setModal(null)}>Close</button></div></Modal>}
      {modal === "activity" && <ActivityModal pendingRequest={pendingRequest} attentionItem={attentionItem} recentActivity={recentActivity} onClose={() => setModal(null)} onSelectItem={openActivityItem} onSelectRequest={openActivityRequest} />}
      {modal === "request" && <RequestReviewModal onClose={() => setModal(null)} onApprove={() => resolvePendingRequest("approved")} onReject={() => resolvePendingRequest("rejected")} />}
      {spaceAction?.action === "rename" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Rename ${actionSpace.name}`} eyebrow={`${actionSpace.type.toUpperCase()} VAULT SPACE`}><form onSubmit={renameSpace}><label className="form-field"><input name="spaceName" maxLength={spaceNameMaxLength} aria-label="Space name" defaultValue={actionSpace.name} required autoFocus /></label><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button type="submit" className="button button--dark">Save name</button></div></form></Modal>}
      {spaceAction?.action === "merge" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Merge ${actionSpace.name}`} eyebrow="MOVE VAULT RECORDS"><form onSubmit={mergeSpace}><div className="form-intro">Move all Vault Items and records into another {actionSpace.type} Vault Space, then remove this space.</div>{mergeTargets.length ? <label className="form-field"><span>Merge into</span><select name="targetSpaceId" defaultValue={mergeTargets[0].id}>{mergeTargets.map((space) => <option key={space.id} value={space.id}>{space.name}</option>)}</select></label> : <div className="settings-empty">No same-type Vault Spaces are available to merge into.</div>}<div className="modal-actions"><button type="button" className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button type="submit" className="button button--dark" disabled={!mergeTargets.length}>Merge space</button></div></form></Modal>}
      {spaceAction?.action === "archive" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Archive ${actionSpace.name}?`} eyebrow="HIDE VAULT SPACE"><div className="form-intro">This hides the space from the left rail. Its records remain available under Settings → Archived spaces.</div><div className="modal-actions"><button className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button className="button button--dark" onClick={archiveSpace}>Archive space</button></div></Modal>}
      {spaceAction?.action === "delete" && actionSpace && <Modal onClose={() => setSpaceAction(null)} title={`Delete ${actionSpace.name}?`} eyebrow="PERMANENT ACTION"><div className="form-intro">This permanently deletes the Vault Space and every Vault Item inside it. This cannot be undone.</div><div className="modal-actions"><button className="button button--light" onClick={() => setSpaceAction(null)}>Cancel</button><button className="button button--danger" onClick={deleteSpace}>Delete permanently</button></div></Modal>}
      {modal === "category" && <Modal onClose={() => setModal(null)} title="Add category" eyebrow={`VAULT SPACE / ${selectedSpace?.name || "ALL SPACES"}`}><form onSubmit={addCategory}><div className="form-intro">Add a label when the current categories do not fit. It will appear here and can be used on new Vault Items.</div><label className="form-field"><span>Category name</span><input name="categoryName" placeholder="e.g. Travel" required autoFocus /></label><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Add category</button></div></form></Modal>}
      {modal === "add" && <Modal onClose={() => setModal(null)} title="Add Vault Item" eyebrow="NEW RECORD"><form onSubmit={addVaultItem}><div className="form-intro">Start with the service basics. You can finish the record and save it in the next step.</div><label className="form-field"><span>Vault Space</span><select name="spaceId" value={addItemSpaceId} onChange={(event) => setAddItemSpaceId(event.target.value)} required><option value="" disabled>Choose a Vault Space</option>{spaces.filter((space) => !space.archived).map((space) => <option key={space.id} value={space.id}>{space.name} · {space.type}</option>)}</select></label><label className="form-field"><span>Service name</span><input name="service" placeholder="e.g. Harborline Checking" required /></label><label className="form-field"><span>Account label</span><input name="account" placeholder="e.g. Primary checking" required /></label><div className="form-grid"><label className="form-field"><span>Category</span><select key={addItemSpaceId} name="category" defaultValue={addItemCategoryOptions[0]}>{addItemCategoryOptions.map((category) => <option key={category}>{category}</option>)}</select></label><label className="form-field"><span>Site</span><input name="site" placeholder="service.example" /></label></div><div className="modal-actions"><button type="button" className="button button--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="button button--dark">Continue to edit</button></div></form></Modal>}
      {modal === "core" && coreInfoSpace && <CoreInfoModal space={coreInfoSpace} value={coreInfoDraft || coreInfo} hasDraft={Boolean(coreInfoDraft)} onSaveDraft={saveCoreInfoDraft} onCompile={compileCoreInfo} onClose={() => setModal(null)} />}
      {editItem && <EditItemModal item={editItem} spaces={spaces} categoryOptions={categoryOptions.filter((category) => category !== "All items")} reusableFields={reusableFields} onSave={saveItem} onSaveReusableField={saveReusableField} onClose={() => setModal(null)} />}
    </div>
  );
}

function ActivityModal({ pendingRequest, attentionItem, recentActivity, onClose, onSelectItem, onSelectRequest }) {
  return <Modal onClose={onClose} title="Activity" eyebrow="AGENT VAULT / GLOBAL">
    <div className="activity-intro">Requests, active tasks, and changes across your Vault Spaces.</div>
    <section className="activity-group">
      <div className="activity-group__title">Pending requests</div>
      {pendingRequest ? <button className="activity-row activity-row--action" onClick={onSelectRequest} aria-label="Review Create Vault Item request"><span className="activity-dot activity-dot--request" /><div><strong>Create Vault Item</strong><small>Northstar Health · Family</small></div><em>Review</em></button> : <div className="activity-empty">No pending requests.</div>}
    </section>
    <section className="activity-group">
      <div className="activity-group__title">Active tasks</div>
      <div className="activity-row"><span className="activity-dot activity-dot--active" /><div><strong>Update Falador Mutual</strong><small>Adam · item locked</small></div><em>Running</em></div>
    </section>
    <section className="activity-group">
      <div className="activity-group__title">Needs attention</div>
      {attentionItem ? <button className="activity-row activity-row--action" onClick={() => onSelectItem(attentionItem.id, { edit: true })} aria-label={`Open ${attentionItem.service} field needing attention`}><span className="activity-dot activity-dot--attention" /><div><strong>{attentionItem.custom.find((field) => field.needsAttention)?.label || "Field mapping"}</strong><small>{attentionItem.service} · exact site label unknown</small></div><em>Open</em></button> : <div className="activity-empty">No items need attention.</div>}
    </section>
    <section className="activity-group">
      <div className="activity-group__title">Recent activity</div>
      {recentActivity ? <div className="activity-row"><span className="activity-dot activity-dot--recent" /><div><strong>{recentActivity.title}</strong><small>{recentActivity.detail}</small></div><em>{recentActivity.status}</em></div> : <div className="activity-row"><span className="activity-dot activity-dot--recent" /><div><strong>Address saved to Chase Checking</strong><small>Agent · 2h ago</small></div><em>Saved</em></div>}
    </section>
  </Modal>;
}

function RequestReviewModal({ onClose, onApprove, onReject }) {
  return <Modal onClose={onClose} title="Create Vault Item" eyebrow="PENDING REQUEST">
    <div className="request-intro">The agent found a new account during setup and is asking to save it in Agent Vault.</div>
    <section className="request-details">
      <div><span>Service</span><strong>Northstar Health</strong></div>
      <div><span>Vault Space</span><strong>Family</strong></div>
      <div><span>Permission</span><strong><code>vault_write</code> · this task</strong></div>
    </section>
    <div className="modal-actions"><button className="button button--light" onClick={onReject}>Reject</button><button className="button button--dark" onClick={onApprove}>Approve</button></div>
  </Modal>;
}

function CoreInfoModal({ space, value, hasDraft, onSaveDraft, onCompile, onClose }) {
  const [draft, setDraft] = useState(() => ({ ...emptyCoreInfo, ...value }));
  const [dirty, setDirty] = useState(false);

  function update(name, nextValue) {
    setDraft((current) => ({ ...current, [name]: nextValue }));
    setDirty(true);
  }

  function close() {
    if (dirty && !window.confirm("Discard these Core Info changes?")) return;
    onClose();
  }

  function submit(event, compile) {
    event.preventDefault();
    const next = { ...draft, fullName: draft.fullName || [draft.firstName, draft.middleName, draft.lastName].filter(Boolean).join(" ") };
    if (compile) onCompile(space.id, next);
    else onSaveDraft(space.id, next);
  }

  return <Modal onClose={close} title="Core Info" eyebrow={`REUSABLE / ${space.name}`}>
    <form onSubmit={(event) => submit(event, true)}>
      <div className="core-modal-copy">These values belong to {space.name}. They can prefill Vault Items, but the agent receives only the compiled version.</div>
      {(hasDraft || dirty) && <div className="compile-state compile-state--pending"><Icon name="ph-pencil-simple" size={14} /> <span>Working changes are not agent-readable.</span></div>}
      <div className="core-modal-list">
        <div className="form-grid">
          <label className="form-field"><span>First name</span><input value={draft.firstName} onChange={(event) => update("firstName", event.target.value)} /></label>
          <label className="form-field"><span>Last name</span><input value={draft.lastName} onChange={(event) => update("lastName", event.target.value)} /></label>
        </div>
        <div className="form-grid">
          <label className="form-field"><span>Middle name</span><input value={draft.middleName} onChange={(event) => update("middleName", event.target.value)} /></label>
          <label className="form-field"><span>Middle initial</span><input value={draft.middleInitial} maxLength={2} onChange={(event) => update("middleInitial", event.target.value)} /></label>
        </div>
        <div className="form-grid">
          <label className="form-field"><span>Prefix</span><input value={draft.prefix} onChange={(event) => update("prefix", event.target.value)} placeholder="Optional" /></label>
          <label className="form-field"><span>Suffix</span><input value={draft.suffix} onChange={(event) => update("suffix", event.target.value)} placeholder="Optional" /></label>
        </div>
        <label className="form-field"><span>Preferred name</span><input value={draft.preferredName} onChange={(event) => update("preferredName", event.target.value)} placeholder="Optional" /></label>
        <label className="form-field"><span>Full name</span><input value={draft.fullName} onChange={(event) => update("fullName", event.target.value)} /></label>
        <label className="form-field"><span>Email</span><input value={draft.email} type="email" onChange={(event) => update("email", event.target.value)} /></label>
        <label className="form-field"><span>Address</span><input value={draft.address} onChange={(event) => update("address", event.target.value)} /></label>
        <label className="form-field"><span>Phone</span><input value={draft.phone} type="tel" onChange={(event) => update("phone", event.target.value)} /></label>
      </div>
      <div className="modal-actions modal-actions--split"><button type="button" className="button button--light" onClick={close}>Cancel</button><div><button type="button" className="button button--light" onClick={() => submit({ preventDefault() {} }, false)}>Save draft</button><button type="submit" className="button button--dark">Save &amp; Compile</button></div></div>
    </form>
  </Modal>;
}

function EditItemModal({ item, spaces, categoryOptions, reusableFields, onSave, onSaveReusableField, onClose }) {
  const [draft, setDraft] = useState(() => ({ ...item, custom: item.custom.map((field) => ({ type: "text", ...field })) }));
  const [reusableId, setReusableId] = useState("");
  const [showReusablePicker, setShowReusablePicker] = useState(false);
  const [advancedFieldIndex, setAdvancedFieldIndex] = useState(null);
  const [replacePassword, setReplacePassword] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const sourceSpace = spaces.find((space) => space.id === item.spaceId);

  function update(name, value) {
    setDraft((current) => ({ ...current, [name]: value }));
    setDirty(true);
    setValidationMessage("");
  }

  function updateCustom(index, name, value) {
    setDraft((current) => ({ ...current, custom: current.custom.map((field, fieldIndex) => {
      if (fieldIndex !== index) return field;
      return { ...field, [name]: value };
    }) }));
    setDirty(true);
    setValidationMessage("");
  }

  function addCustomField() {
    setDraft((current) => ({ ...current, custom: [...current.custom, { label: "", siteLabel: "", value: "", type: "text" }] }));
    setDirty(true);
  }

  function removeCustomField(index) {
    setDraft((current) => ({ ...current, custom: current.custom.filter((_, fieldIndex) => fieldIndex !== index) }));
    setAdvancedFieldIndex(null);
    setDirty(true);
  }

  function useReusableField() {
    const saved = reusableFields.find((field) => field.id === reusableId);
    if (!saved) return;
    const alreadyAdded = draft.custom.some((field) => field.siteLabel === saved.siteLabel && field.value === saved.value);
    if (!alreadyAdded) setDraft((current) => ({ ...current, custom: [...current.custom, { label: saved.label, siteLabel: saved.siteLabel, value: saved.value, type: saved.type, reusableFieldId: saved.id }] }));
    setReusableId("");
    setShowReusablePicker(false);
    setDirty(true);
  }

  function saveReusable(index) {
    const field = draft.custom[index];
    onSaveReusableField({ label: field.label, siteLabel: field.siteLabel, value: field.value, type: field.type || "text" }, item.spaceId);
  }

  function close() {
    if (dirty && !window.confirm("Discard these item changes?")) return;
    onClose();
  }

  function submit(event) {
    event.preventDefault();
    const nextDraft = { ...draft, custom: draft.custom.map((field) => {
      const siteLabel = (field.siteLabel || "").trim();
      return { ...field, siteLabel, needsAttention: field.needsAttention ? !siteLabel : false };
    }) };
    if (!nextDraft.service.trim() || !nextDraft.account.trim()) {
      setValidationMessage("Add a service name and account label before saving.");
      return;
    }
    if (nextDraft.custom.some((field) => !field.label.trim() || !field.value.trim())) {
      setValidationMessage("Finish each field label and value before saving.");
      return;
    }
    onSave(item.id, nextDraft);
  }

  return <Modal onClose={close} title={`Edit ${item.service}`} eyebrow={`VAULT ITEM / ${sourceSpace?.name || "VAULT SPACE"}`}>
    <form onSubmit={submit}>
      <div className="form-intro">Make your changes here. They take effect when you save.</div>
      {validationMessage && <div className="form-error" role="alert">{validationMessage}</div>}
      <section className="edit-form-section">
        <div className="edit-form-section__head"><span className="section-title">RECORD</span></div>
        <div className="form-grid"><label className="form-field"><span>Service name</span><input value={draft.service} onChange={(event) => update("service", event.target.value)} required /></label><label className="form-field"><span>Account name</span><input value={draft.account} onChange={(event) => update("account", event.target.value)} placeholder="Primary checking" required /></label></div>
        <div className="form-grid"><label className="form-field"><span>Category</span><select value={draft.category} onChange={(event) => update("category", event.target.value)}>{!categoryOptions.includes(draft.category) && <option value={draft.category}>{draft.category}</option>}{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select></label><label className="form-field"><span>Website</span><input value={draft.site} onChange={(event) => update("site", event.target.value)} placeholder="service.example" /></label></div>
      </section>
      <section className="edit-form-section">
        <div className="edit-form-section__head"><span className="section-title">SIGN-IN</span></div>
        <label className="form-field"><span>Username or email</span><input value={draft.username} onChange={(event) => update("username", event.target.value)} /></label>
        <div className="secret-field"><label className="form-field"><span>Password</span><input type={replacePassword ? "text" : "password"} value={replacePassword ? draft.password : ""} onChange={(event) => update("password", event.target.value)} placeholder={replacePassword ? "Enter a new password" : "Saved password"} disabled={!replacePassword} /></label><button type="button" className="text-button" onClick={() => { setReplacePassword(true); update("password", ""); }}>{replacePassword ? "Replacing" : "Replace password"}</button></div>
      </section>
      <section className="edit-form-section edit-form-section--fields">
        <div className="edit-form-section__head"><span className="section-title">FIELDS</span><div className="field-actions"><button type="button" className="text-button" onClick={addCustomField}><Icon name="ph-plus" size={13} /> Add field</button><button type="button" className="text-button" onClick={() => setShowReusablePicker((current) => !current)}><Icon name="ph-arrows-clockwise" size={13} /> Fill from saved field</button></div></div>
        {showReusablePicker && <div className="reuse-picker"><label className="form-field"><span>Saved field</span><select value={reusableId} onChange={(event) => setReusableId(event.target.value)}><option value="">Choose a field from any Vault Space</option>{reusableFields.map((field) => <option key={field.id} value={field.id}>{field.label} · {reusableFieldTypes.find((type) => type.value === field.type)?.label || field.type} · {spaces.find((space) => space.id === field.sourceSpaceId)?.name || "Unknown Space"}</option>)}</select></label><button type="button" className="button button--light button--small" onClick={useReusableField} disabled={!reusableId}>Use selected field</button></div>}
        <div className="edit-custom-list">{draft.custom.map((field, index) => <div className={`edit-custom-row ${field.needsAttention ? "edit-custom-row--attention" : ""}`} key={`${field.label}-${index}`}><div className="edit-custom-row__head"><span className="field-number">FIELD {String(index + 1).padStart(2, "0")}</span><div className="edit-custom-row__actions">{field.needsAttention && <span className="field-attention"><Icon name="ph-warning" size={12} /> Needs attention</span>}<button type="button" className="text-button text-button--quiet" onClick={() => removeCustomField(index)}>Remove</button></div></div>{field.needsAttention && <div className="field-attention-note">Exact website field label is unknown. Add it only when you can verify the site's field name.</div>}<div className="form-grid"><label className="form-field"><span>Label</span><input value={field.label} onChange={(event) => updateCustom(index, "label", event.target.value)} placeholder="e.g. Billing address" /></label><label className="form-field"><span>Value</span><input value={field.value} onChange={(event) => updateCustom(index, "value", event.target.value)} placeholder="Enter a value" /></label></div><div className="edit-field-meta"><label className="field-type"><span>Type</span><select value={field.type || "text"} onChange={(event) => updateCustom(index, "type", event.target.value)}><option value="text">Text</option>{reusableFieldTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label><button type="button" className="text-button text-button--quiet" onClick={() => setAdvancedFieldIndex(advancedFieldIndex === index ? null : index)}>{advancedFieldIndex === index ? "Hide exact site label" : "Add exact site label"}</button><button type="button" className="text-button text-button--quiet" onClick={() => saveReusable(index)} disabled={!field.label || !field.value}><Icon name="ph-bookmark-simple" size={13} /> Save for reuse</button></div>{advancedFieldIndex === index && <div className="advanced-field"><label className="form-field"><span>Website field label</span><input value={field.siteLabel} onChange={(event) => updateCustom(index, "siteLabel", event.target.value)} placeholder="Optional exact field name" /></label><p>Only add this when the website requires an exact field name. Leave it blank otherwise.</p></div>}</div>)}</div>
      </section>
      <div className="modal-actions"><button type="submit" className="button button--dark">Save</button></div>
    </form>
  </Modal>;
}

function FieldRow({ label, value, mono = false, prefilled = false }) {
  return <div className="field-row"><span>{label}</span><strong className={mono ? "is-mono" : ""}>{value}</strong>{prefilled && <small><Icon name="ph-arrows-clockwise" size={12} /> prefilled</small>}</div>;
}

function SpaceIconPicker({ type, value, onChange }) {
  return <div className="space-icon-picker">{spaceIconOptions[type].map((option) => <button type="button" key={option.value} className={value === option.value ? "is-selected" : ""} onClick={() => onChange(option.value)} aria-label={option.label} aria-pressed={value === option.value}><Icon name={option.value} size={22} /></button>)}</div>;
}

function Modal({ title, eyebrow, children, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-head"><div><span className="eyebrow">{eyebrow}</span><h2 id="modal-title">{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="ph-x" size={19} /></button></div><div className="modal-body">{children}</div></div></div>;
}

export { App };
