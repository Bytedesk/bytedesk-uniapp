# Visitor UniApp

Visitor UniApp is the reference visitor demo for the Bytedesk multi-end visitor experience. It implements the same three-tab flow used by the native iOS, native Android, and Flutter visitor apps.

## Features

- Three tabs: Home, Messages, Profile.
- Home tab provides direct entry to plain chat, goods chat, and order chat scenes.
- Messages tab loads visitor threads from the online Bytedesk API and opens the matching chat page.
- Profile tab switches between preset demo users.
- Chat pages use the online web chat entry by default.

## Default Online Endpoints

- Chat page: https://cdn.weiyuai.cn
- API base: https://api.weiyuai.cn

These defaults are defined in common/demo-config.js.

## Main Files

- pages/index/index.vue: home scene list
- pages/thread/index.vue: history thread list
- pages/profile/index.vue: demo user switcher
- pages/chat/index.vue: chat webview container
- common/demo-config.js: shared demo profile, URL builder, thread parser

## How To Run

This app is maintained as a UniApp project and is best run from HBuilderX.

1. Open HBuilderX.
2. Import the directory frontend/apps/visitorUniapp.
3. Run the project to H5 or to an App simulator/device from HBuilderX.
4. Use the default online endpoints unless you intentionally change common/demo-config.js.

## How To Use

1. Open the Home tab and tap any scene card to enter a chat page directly.
2. Open the Messages tab to load remote visitor threads, then tap a thread to continue the conversation.
3. Open the Profile tab and switch between preset users to test different visitor identities.

## Notes

- The default org and workgroup profile is configured in common/demo-config.js.
- The selected demo user is stored locally and restored on the next launch.
- In debug mode, the chat page can expose a details button for thread inspection.
