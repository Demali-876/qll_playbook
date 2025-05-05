---
title: Dynamically Deploying Canisters
description: Learn how to deploy canisters dynamically on the Internet Computer using a Manager canister.
---

One of the most powerful features of the Internet Computer is the ability to dynamically create new canisters at runtime. This unlocks the potential for multi-user applications, isolated environments, and scalable architectures — all from within your Motoko code.

This guide explains how to dynamically deploy canisters using a **Manager canister**. The Manager acts as a factory, responsible for creating, configuring, and managing new instances of **Greeter** canisters on behalf of users.

---

## Why dynamic deployment?

Instead of deploying all canisters upfront, dynamic deployment lets you:

- Spin up new canisters *on demand*.
- Assign ownership to users programmatically.
- Enable tenant isolation in multi-user apps.
- Scale resources without manual intervention.

Think of it like giving each user their own personalised smart contract container — securely and with complete autonomy.

---

## Overview

In this model:

- A **Manager** canister is deployed once.
- Users can request their own **Greeter** canister through the Manager.
- Each Greeter canister is owned and controlled by the user who created it.
- Users interact with their Greeter independently of others.

---

## How it works

### 1. Deploy the Manager Canister

The Manager must be deployed first. It holds the logic to instantiate Greeter canisters dynamically.

```bash
dfx deploy dynamic_canister_deployment_backend
```

---

### 2. Create a New Greeter Canister

A user requests a new canister by calling `createGreeter()`.

```bash
dfx canister call dynamic_canister_deployment_backend createGreeter
```

Under the hood, the Manager:

1. Instantiates a new **Greeter** canister.
2. Assigns the **caller** as the controller.
3. Adds the new canister to an internal list of greeters.
4. Returns the new canister’s ID to the user.

This allows users to **own and manage** their canister from that point forward.

---

### 3. Interact with the Greeter

Once created, users can directly interact with their Greeter:

```bash
dfx canister call <greeter_canister_id> greet '("Alice")'
```

Each Greeter exposes a `greet(name: Text)` function that returns a personalised message.

---

## Example Flow

```text
[User] ──(createGreeter)──▶ [Manager]
         └───creates──────▶ [Greeter]
         ◀── returns ID ───┘

[User] ──(greet)──────────▶ [Greeter]
```

This architecture separates concerns and grants fine-grained ownership to individual users or tenants.

---

## Security Considerations

### 🔒 Restricting Anonymous Access

The Manager includes an `inspect` function that rejects anonymous calls:

```motoko
public func inspect(message : Message) : Bool {
  message.caller != Principal.anonymous
}
```

This ensures only authenticated users can trigger deployments.

---

### 🛡 Access Control

Each Greeter canister assigns the *creator* as its sole controller. This ensures that:

- Only the creator can upgrade or manage their canister.
- Data and access are isolated from other users.
- The Manager cannot modify the Greeter after handing over control.

---

## Use cases

Dynamic canister deployment is ideal for:

- **Multi-tenant platforms** (e.g., SaaS dashboards)
- **Personal wallets or vaults**
- **Per-user game worlds or sessions**
- **Isolated compute environments**

By separating logic and ownership into individual canisters, your architecture becomes modular, secure, and infinitely scalable.

---

## Summary

Dynamic deployment allows your application to:

- Create isolated environments for each user
- Grant ownership using the IC’s controller system
- Scale horizontally with independent canisters
- Enable flexible and secure canister-based architecture

With Motoko and the Internet Computer’s management canister, you can programmatically shape your infrastructure in response to user needs — all while preserving ownership, performance, and security.

---

## Further reading

- [Management Canister Interface](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-management-canister)
- [Motoko’s `Principal` type](https://internetcomputer.org/docs/current/motoko/base/Principal)
- [Controlling and upgrading canisters](https://internetcomputer.org/docs/current/developer-docs/customize/canister-control)
