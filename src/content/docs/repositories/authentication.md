---
title: Authenticating Users
description: A guide to authenticating users on the Internet Computer

---

Authentication is a core part of almost every web application. Whether you're building a social platform, a dApp, or a secure dashboard, verifying who your users are — and ensuring only the right people have access to sensitive actions — is essential.

On the Internet Computer, **Internet Identity (II)** provides a secure, privacy-preserving way to authenticate users without requiring passwords or traditional sign-ups.

This guide will walk you through what Internet Identity is, why it's important, and how to integrate it into your application.

---

## What is Internet Identity?

**Internet Identity** is a blockchain-native authentication system developed by the DFINITY Foundation. It allows users to authenticate using their devices — such as a laptop with a security chip, or a phone using biometrics — without needing usernames or passwords.

Each user is assigned a **unique, anonymous principal ID** per application, ensuring both **security** and **privacy**. Under the hood, Internet Identity uses WebAuthn and hardware-backed key pairs to provide cryptographic guarantees.

### Key Features

- **Passwordless**: Authenticate with biometrics, security keys, or device PINs.
- **Privacy-preserving**: Each service receives a different principal (pseudonymous).
- **Built-in to the IC**: No third-party dependencies — II is hosted on-chain.
- **Secure by design**: Resistant to phishing and credential stuffing.

---

## Why authenticate users?

Authentication enables your app to:

- Personalise the user experience.
- Control access to protected resources.
- Track and manage user accounts.
- Maintain a secure user state across sessions.

On traditional platforms, this is typically done with email/password systems or OAuth providers like Google or Facebook. But these approaches introduce centralised trust, data privacy concerns, and a poor developer experience.

With Internet Identity, authentication becomes decentralized, secure, and user-friendly — without compromising user privacy.

---

## Getting Started

### 1. Clone or Fork the Starter Project

```bash
git clone https://github.com/your-username/internet-identity-integration.git
cd internet-identity-integration
```

> This repo contains an example frontend and backend canister, pre-wired to work with Internet Identity.

---

### 2. Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [DFX (Internet Computer SDK)](https://internetcomputer.org/docs/current/developer-docs/setup/install)

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start the Local Internet Computer Replica

```bash
dfx start --clean --background
```

> ⚠️ Make note of the port shown (e.g., `Replica API running on 127.0.0.1:8080`).

---

### 5. Create the Internet Identity Canister

```bash
dfx canister create internet_identity --specified-id rdmx6-jaaaa-aaaaa-aaadq-cai
```

> The `rdmx6-jaaaa-aaaaa-aaadq-cai` is the official canister ID of Internet Identity used in local development.

---

### 6. Deploy Your Canisters

```bash
dfx deploy
```

This will:

- Deploy the **frontend** canister
- Deploy the **backend** canister
- Deploy the **Internet Identity** canister (if not already available)

---

### 7. View the Application

Open your browser and go to:

```
http://127.0.0.1:8080/?canisterId=<your_frontend_canister_id>
```

Or use the alternative `.localhost` domain:

```
http://<your_frontend_canister_id>.localhost:8080/
```

> You can find the frontend canister ID in the output of `dfx deploy`.

---

## Authenticating with Internet Identity

Once the app is running:

1. Click the **Login** button.
2. Internet Identity will launch in a popup or new tab.
3. Choose a device (e.g., FaceID, fingerprint, or security key).
4. Upon success, you’ll be returned to the app and see your **principal**.

---

## Common Errors

### ❌ ECONNREFUSED on 127.0.0.1:4943

If you see a connection error on port `4943` or similar:

- Check your replica is running: `dfx start --background`
- Ensure your app is using the correct port (typically `8080`)
- Update hardcoded ports in your frontend/backend to match the replica output

---

## Next Steps

Once you’ve successfully integrated authentication, you can:

- Use the authenticated `Principal` to associate user-specific data
- Call update/query methods scoped to the user
- Build permissioned workflows

> Each user’s principal is unique per canister, enabling strong isolation.

---

## Summary

Integrating Internet Identity into your application provides:

- A **seamless login experience** for users.
- **Strong privacy** via pseudonymous principals.
- **Security** by leveraging hardware-backed credentials.
- **Simplicity** for developers building on the Internet Computer.

By adopting II, your project benefits from Web3-native authentication without the friction and pitfalls of legacy identity systems.

## Further Reading

- [Internet Identity Concepts](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/internet-identity-intro)
- [Principal and Identity Explained](https://internetcomputer.org/docs/current/references/icc-spec/#principal)
- [Diátaxis: Writing good guides](https://diataxis.fr/how-to-guides/)
