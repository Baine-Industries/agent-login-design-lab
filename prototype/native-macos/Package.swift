// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "AgentVaultCompanion",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "AgentVaultCompanion", targets: ["AgentVaultCompanion"])
    ],
    targets: [
        .executableTarget(name: "AgentVaultCompanion")
    ]
)
