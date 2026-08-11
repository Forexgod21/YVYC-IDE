# YVYC-IDE — EXTENSION EXCLUSION REGISTER

Proprietary Microsoft extensions that cannot ship in YVYC-IDE, each paired with its open alternative and capability delta. Governed by Fork Doctrine §5.

| Excluded (proprietary) | Open alternative | Capability delta |
|---|---|---|
| C/C++ (`ms-vscode.cpptools`) | clangd | *to be assessed* |
| C# / .NET (`ms-dotnettools.*`) | OmniSharp / C# Dev Kit alternatives | *to be assessed* |
| GitHub Copilot / Copilot Chat | — (see in-core chat ruling, Amendments v1.1) | *to be assessed* |
| Remote Development pack (SSH, Containers, WSL) | Open Remote SSH (community) | *to be assessed* |
| Live Share | — | *to be assessed* |
| Pylance | Python + community language servers (e.g. BasedPyright) | *to be assessed* |
| Proprietary debugger adapters | per-language open adapters | *to be assessed* |

**Rule:** the language-support story is decided **before** external distribution.
