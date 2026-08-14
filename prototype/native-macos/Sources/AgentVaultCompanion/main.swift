import AppKit

@MainActor
final class AgentVaultCompanionApp: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem!
    private let popover = NSPopover()

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)

        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        statusItem.button?.image = NSImage(
            systemSymbolName: "checklist",
            accessibilityDescription: "Agent Activity"
        )
        statusItem.button?.imagePosition = .imageLeading
        statusItem.button?.title = "2"
        statusItem.button?.setAccessibilityLabel("Agent Activity companion, 2 needs action")
        statusItem.button?.target = self
        statusItem.button?.action = #selector(togglePopover)
        print("Agent Vault Companion: status item registered")

        popover.behavior = .transient
        popover.animates = true
        popover.contentSize = NSSize(width: 380, height: 526)
        popover.contentViewController = CompanionViewController()

        if ProcessInfo.processInfo.environment["AGENT_VAULT_COMPANION_OPEN"] == "1" {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in self?.togglePopover() }
        }
    }

    @objc private func togglePopover() {
        guard let button = statusItem.button else { return }

        if popover.isShown {
            popover.performClose(nil)
        } else {
            NSApp.activate(ignoringOtherApps: true)
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
            print("Agent Vault Companion: popover shown")
        }
    }
}

@main
@MainActor
struct AgentVaultCompanionMain {
    static func main() {
        let application = NSApplication.shared
        let delegate = AgentVaultCompanionApp()
        application.delegate = delegate
        application.run()
    }
}

private final class CompanionViewController: NSViewController {
    override func loadView() {
        let surface = NSVisualEffectView()
        surface.material = .popover
        surface.blendingMode = .behindWindow
        surface.state = .active
        view = surface
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        let content = NSStackView()
        content.orientation = .vertical
        content.alignment = .leading
        content.spacing = 0
        content.translatesAutoresizingMaskIntoConstraints = false

        content.addArrangedSubview(header())
        content.addArrangedSubview(summary())
        content.addArrangedSubview(section(
            title: "Pending Requests",
            rows: [row(title: "Create Vault Item", detail: "Northstar Health · Family", state: "REVIEW", color: .systemOrange)]
        ))
        content.addArrangedSubview(section(
            title: "Active Tasks",
            rows: [row(title: "Updating Falador Mutual", detail: "Adam · item locked", state: "RUNNING", color: .systemBlue)]
        ))
        content.addArrangedSubview(section(
            title: "Needs Attention",
            rows: [row(title: "Billing address", detail: "Chase Checking · exact site label unknown", state: "OPEN", color: .systemRed)]
        ))
        content.addArrangedSubview(section(
            title: "Recent Activity",
            rows: [row(title: "Address saved to Chase Checking", detail: "Agent · 2h ago", state: "SAVED", color: .systemGreen)]
        ))
        content.addArrangedSubview(openVaultButton())

        view.addSubview(content)
        NSLayoutConstraint.activate([
            content.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            content.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            content.topAnchor.constraint(equalTo: view.topAnchor),
            content.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    private func header() -> NSView {
        let stack = NSStackView()
        stack.orientation = .vertical
        stack.alignment = .leading
        stack.spacing = 4
        stack.edgeInsets = NSEdgeInsets(top: 18, left: 18, bottom: 15, right: 18)

        let eyebrow = label("AGENT VAULT", size: 10, weight: .medium, color: .secondaryLabelColor)
        eyebrow.font = NSFont.monospacedSystemFont(ofSize: 10, weight: .medium)
        let title = label("Companion", size: 22, weight: .regular, color: .labelColor)
        let live = label("●  LIVE", size: 10, weight: .medium, color: .systemGreen)
        live.font = NSFont.monospacedSystemFont(ofSize: 10, weight: .medium)

        let titleLine = NSStackView(views: [title, NSView(), live])
        titleLine.orientation = .horizontal
        titleLine.alignment = .centerY
        titleLine.spacing = 8

        stack.addArrangedSubview(eyebrow)
        stack.addArrangedSubview(titleLine)
        return stack
    }

    private func summary() -> NSView {
        let stack = NSStackView()
        stack.orientation = .horizontal
        stack.alignment = .centerY
        stack.spacing = 8
        stack.edgeInsets = NSEdgeInsets(top: 12, left: 18, bottom: 12, right: 18)

        let access = label("Vault Access Live", size: 12, weight: .regular, color: .secondaryLabelColor)
        let spacer = NSView()
        let count = label("2 NEEDS ACTION", size: 10, weight: .medium, color: .systemOrange)
        count.font = NSFont.monospacedSystemFont(ofSize: 10, weight: .medium)
        stack.addArrangedSubview(access)
        stack.addArrangedSubview(spacer)
        stack.addArrangedSubview(count)
        return stack
    }

    private func section(title: String, rows: [NSView]) -> NSView {
        let stack = NSStackView()
        stack.orientation = .vertical
        stack.alignment = .leading
        stack.spacing = 0
        stack.edgeInsets = NSEdgeInsets(top: 11, left: 18, bottom: 11, right: 18)

        let heading = label(title.uppercased(), size: 10, weight: .medium, color: .secondaryLabelColor)
        heading.font = NSFont.monospacedSystemFont(ofSize: 10, weight: .medium)
        stack.addArrangedSubview(heading)
        rows.forEach { stack.addArrangedSubview($0) }
        return stack
    }

    private func row(title: String, detail: String, state: String, color: NSColor) -> NSView {
        let dot = label("●", size: 11, weight: .regular, color: color)
        let titleLabel = label(title, size: 13, weight: .semibold, color: .labelColor)
        let detailLabel = label(detail, size: 11, weight: .regular, color: .secondaryLabelColor)
        detailLabel.lineBreakMode = .byTruncatingTail

        let copy = NSStackView(views: [titleLabel, detailLabel])
        copy.orientation = .vertical
        copy.alignment = .leading
        copy.spacing = 2

        let stateLabel = label(state, size: 10, weight: .medium, color: color)
        stateLabel.font = NSFont.monospacedSystemFont(ofSize: 10, weight: .medium)

        let line = NSStackView(views: [dot, copy, NSView(), stateLabel])
        line.orientation = .horizontal
        line.alignment = .centerY
        line.spacing = 8
        line.edgeInsets = NSEdgeInsets(top: 8, left: 0, bottom: 2, right: 0)
        line.widthAnchor.constraint(equalToConstant: 344).isActive = true
        return line
    }

    private func openVaultButton() -> NSView {
        let button = NSButton(title: "Open Agent Vault  ↗", target: self, action: #selector(openVault))
        button.bezelStyle = .texturedRounded
        button.controlSize = .regular
        button.alignment = .left
        button.contentTintColor = .labelColor
        button.translatesAutoresizingMaskIntoConstraints = false
        button.widthAnchor.constraint(equalToConstant: 344).isActive = true
        let container = NSView()
        container.addSubview(button)
        button.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 18).isActive = true
        button.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -18).isActive = true
        button.topAnchor.constraint(equalTo: container.topAnchor, constant: 10).isActive = true
        button.bottomAnchor.constraint(equalTo: container.bottomAnchor, constant: -12).isActive = true
        return container
    }

    @objc private func openVault() {
        let target = ProcessInfo.processInfo.environment["AGENT_VAULT_COMPANION_URL"] ?? "http://127.0.0.1:4174/"
        guard let url = URL(string: target) else { return }
        NSWorkspace.shared.open(url)
    }

    private func label(_ text: String, size: CGFloat, weight: NSFont.Weight, color: NSColor) -> NSTextField {
        let field = NSTextField(labelWithString: text)
        field.font = NSFont.systemFont(ofSize: size, weight: weight)
        field.textColor = color
        field.lineBreakMode = .byTruncatingTail
        return field
    }
}
