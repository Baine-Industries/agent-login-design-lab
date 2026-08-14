# macOS OS-level companion platforms

Research date: 2026-08-13. Sources below are Apple or product-owner documentation/source code. “Fact” means the linked source states it. “Inference” is a design conclusion drawn from those facts.

## Apple platform primitives

- **Fact — `NSStatusItem`:** `NSStatusBar.system.statusItem(withLength:)` creates and inserts a status item into the system menu bar. The item must be retained; it exposes an automatically created `button`, an optional `NSMenu`, visibility, autosave name, and fixed or variable length. Apple warns that menu-bar space is limited, items are not guaranteed to remain available, and apps should offer a preference to hide them. ([`NSStatusBar`](https://developer.apple.com/documentation/appkit/nsstatusbar), [`NSStatusItem`](https://developer.apple.com/documentation/appkit/nsstatusitem), [`statusItem(withLength:)`](https://developer.apple.com/documentation/appkit/nsstatusbar/statusitem%28withlength%3A%29))

- **Fact — `NSPopover`:** a popover is anchored to an existing view and is positioned by AppKit. Its `behavior` can be `transient` (close on interaction outside), `semitransient` (close when interacting with the anchor window), or `applicationDefined` (the app owns dismissal). It can also detach into a separate window. ([`NSPopover`](https://developer.apple.com/documentation/appkit/nspopover), [`NSPopover.Behavior`](https://developer.apple.com/documentation/appkit/nspopover/behavior-swift.enum))

- **Fact — `NSPanel`:** an `NSPanel` is an auxiliary `NSWindow`. `isFloatingPanel` should be used only when the panel is small, mouse-oriented, needs to remain visible while working in standard windows, and hides when the app deactivates. `becomesKeyOnlyIfNeeded` controls whether keyboard focus is taken only when required; its default is `false`. ([`NSPanel`](https://developer.apple.com/documentation/appkit/nspanel), [`isFloatingPanel`](https://developer.apple.com/documentation/appkit/nspanel/isfloatingpanel), [`becomesKeyOnlyIfNeeded`](https://developer.apple.com/documentation/appkit/nspanel/becomeskeyonlyifneeded))

- **Inference:** for a compact Agent Activity surface, the default native shape should be `NSStatusItem` + anchored `NSPopover` with transient/semitransient dismissal. Reserve `NSPanel` for a deliberately persistent, keyboard-oriented task surface; it has more focus, activation, floating-level, and lifecycle decisions than a menu-bar popover.

## SwiftUI `MenuBarExtra`

- **Fact:** `MenuBarExtra` is a `Scene` that renders a persistent control in the system menu bar, including for a utility app that has no normal window. Apple documents two relevant styles: `.menu` (a pull-down menu) and `.window` (a popover-like window containing standard SwiftUI controls). An `isInserted` binding controls whether the extra is present; if a menu-bar-only app’s extra is removed, the app is automatically terminated. Apple also documents `LSUIElement=true` for hiding a menu-bar-only app from the Dock and app switcher. ([`MenuBarExtra`](https://developer.apple.com/documentation/swiftui/menubarextra), [`MenuBarExtraStyle`](https://developer.apple.com/documentation/swiftui/menubarextrastyle))

- **Inference:** choose `MenuBarExtra(.window)` when the companion is a single SwiftUI surface and native anchoring/dismissal are sufficient. Choose AppKit hosting when the app needs multiple status items, detailed placement/visibility control, custom status-button rendering, or precise coordination with panels and other AppKit windows. The choice is architectural, not merely visual.

## Liquid Glass and material constraints

- **Fact:** Apple’s current Liquid Glass guidance says standard SwiftUI, UIKit, and AppKit components automatically pick up the latest system appearance when built with the latest SDK. Standard bars, sheets, popovers, and controls adapt to overlap and focus. Apple specifically advises reducing custom backgrounds in controls/navigation because they can interfere with system effects, and testing reduced-transparency, increased-contrast, and reduced-motion configurations. ([`Adopting Liquid Glass`](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass))

- **Fact:** Liquid Glass is intended for the functional layer—controls and navigation—not the content layer. Apple says to use standard materials for content-layer backgrounds, use Liquid Glass effects sparingly, and use `regular` or `clear` only according to context; `clear` is for visually rich backgrounds. ([HIG: `Materials`](https://developer.apple.com/design/human-interface-guidelines/materials), [`Applying Liquid Glass to custom views`](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views))

- **Fact:** AppKit’s `NSVisualEffectView.Material` includes semantic materials such as `menu`, `popover`, `sidebar`, and `windowBackground`. AppKit already creates visual-effect views for title bars and popovers; custom views should choose materials by intended use, not by the color they appear to produce. ([`NSVisualEffectView`](https://developer.apple.com/documentation/appkit/nsvisualeffectview), [`NSVisualEffectView.Material`](https://developer.apple.com/documentation/AppKit/NSVisualEffectView/Material-swift.enum))

- **Inference:** the companion should let the system own the popover/window surface and keep custom styling mostly in typography, spacing, iconography, and semantic color. A fully opaque “paper” background inside a system popover risks fighting the current material model; treat the Agent Vault editorial style as content placed on the system surface, with a fallback tested under accessibility settings.

## Is Liquid Glass mandatory?

- **Fact:** Liquid Glass is not a requirement that every app view must apply manually. Apple exposes it as an explicit SwiftUI `glassEffect` modifier, including `Glass.identity`, which leaves the content unaffected. AppKit also exposes ordinary window properties such as `isOpaque` and `backgroundColor`. ([`glassEffect(_:in:)`](https://developer.apple.com/documentation/swiftui/view/glasseffect%28_%3Ain%3A%29), [`Glass`](https://developer.apple.com/documentation/swiftui/glass), [`NSWindow.isOpaque`](https://developer.apple.com/documentation/appkit/nswindow/isopaque))

- **Inference:** a native status item can launch a deliberately non-glass Agent Activity surface. The practical boundary is that the status-item anchor and any conventional system menu/popover will still look and behave like macOS; the content inside a hosted view, or a separate nonactivating `NSPanel`, can use an opaque Imrahil paper/editorial treatment. That is a product choice with additional placement, dismissal, focus, accessibility, and multi-display work—not a platform impossibility.

## Official companion references

- **ChatGPT for macOS — Fact:** OpenAI documents a menu-bar icon that opens the Chat Bar, a draggable companion window, and a configurable keyboard shortcut (default `⌥Space`). OpenAI’s release notes document a setting to show ChatGPT in the menu bar, Dock, or both, plus “Launch at Login.” The current system-requirements article says the new desktop app combines Chat, Work, and Codex, while the previous app is ChatGPT Classic. ([`How to launch the Chat Bar`](https://help.openai.com/en/articles/9295241-accessing-the-launcher-chatgpt-macos-app), [`macOS app release notes`](https://help.openai.com/en/articles/9703738-macos-app-re), [`system requirements`](https://help.openai.com/en/articles/9395554))

  - **Inference:** ChatGPT demonstrates a menu-bar launcher whose primary value is fast invocation and refocus, not a continuously information-dense status menu. Agent Activity can borrow the launcher/keyboard-access pattern, but its approval rail needs a more stateful popover or window.

- **Docker Desktop — Fact:** Docker’s official documentation describes a persistent tray/menu-bar whale icon that opens an operational menu with Dashboard, sign-in, Settings, updates, Troubleshoot, documentation, extensions, Kubernetes, Restart, and Quit. Docker also documents “Start Docker Desktop when you sign in” and an optional “Open Docker Dashboard when Docker Desktop starts.” ([`Explore Docker Desktop`](https://docs.docker.com/desktop/use-desktop/), [`Docker Desktop settings`](https://docs.docker.com/desktop/settings-and-maintenance/settings/), [`Install and run on Mac`](https://docs.docker.com/desktop/setup/install/mac-install/))

  - **Inference:** Docker is the stronger reference for a system-control menu: short operational commands, health/maintenance access, and a clear route to the full dashboard. Agent Activity should similarly keep the menu-bar surface focused on pending human actions and attention states, with deeper records/tasks opening Agent Vault.

- **CodexBar — Fact:** CodexBar is an independent open-source macOS menu-bar app, not an OpenAI product. Its official repository describes a macOS 14+ no-Dock app with dynamic status icons, per-provider or merged status items, and provider usage/status menus. Its architecture document separates a SwiftUI app lifecycle from an AppKit `StatusItemController`; the UI notes explicitly say “AppKit-hosted icons, SwiftUI popovers,” while the source creates variable-length `NSStatusItem`s, assigns stable autosave names, customizes the status-button image/accessibility, and attaches `NSMenu`s. ([official repository](https://github.com/steipete/CodexBar), [`architecture.md`](https://github.com/steipete/CodexBar/blob/main/docs/architecture.md), [`ui.md`](https://github.com/steipete/CodexBar/blob/main/docs/ui.md), [`StatusItemController.swift`](https://github.com/steipete/CodexBar/blob/main/Sources/CodexBar/StatusItemController.swift#L297-L320), [`releases`](https://github.com/steipete/CodexBar/releases))

  - **Inference:** CodexBar is the closest technical precedent for a production-grade status-item layer: retain AppKit control for placement, multiple items, visibility, accessibility, and menus; use SwiftUI for richer content. Its explicit handling of stable autosave names and visibility recovery is a warning that menu-bar placement is persistent OS state, not just a view toggle.

## Conclusions for Agent Activity

1. Start with one retained `NSStatusItem` (or one `MenuBarExtra`) and a compact unresolved-action badge; provide a hide/disable preference because menu-bar space is contested.
2. Use a native anchored popover for Pending Requests, Needs Attention, and a small Recent Activity slice. Keep the four-group Agent Activity model in the product, but do not make the menu-bar surface a second full dashboard.
3. Open Agent Vault for approval review, task detail, editing, and recovery. A separate `NSPanel` is justified only if task monitoring must stay visible while the user works elsewhere.
4. Let AppKit/SwiftUI provide the current system material. Avoid hard-coded opaque backgrounds and verify contrast, reduced transparency, reduced motion, focus, click-away dismissal, menu-bar relocation, and multi-display behavior on the target macOS release.
5. Treat native registration, OS visibility state, dismissal, focus handoff, and live Activity transport as host responsibilities. The existing browser companion remains a visual/product proof, not evidence that those native behaviors are implemented.
