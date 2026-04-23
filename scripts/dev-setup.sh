#!/usr/bin/env bash
set -e

echo "Setting up local development environment..."

# 1. Check/Install Rust
if ! command -v rustc &> /dev/null; then
    echo "Rust not found. Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
else
    echo "Rust is already installed."
fi

# 2. Add proper WASM target
echo "Adding wasm32-unknown-unknown target..."
rustup target add wasm32-unknown-unknown || rustup target add wasm32-unknown-unknown --toolchain stable

# Wait for a moment to ensure cargo is accessible
export PATH="$HOME/.cargo/bin:$PATH"

# 3. Check/Install Stellar CLI
if ! command -v stellar &> /dev/null; then
    echo "Stellar CLI not found. Installing via cargo..."
    cargo install --locked stellar-cli --features opt
else
    echo "Stellar CLI is already installed."
fi

echo "Setup complete! You can now run 'make build'"
