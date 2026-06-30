## Plan: "Cat Meme Cheer-Up Page"

A single-page interactive experience designed to make someone smile. She opens a link and gets hit with playful cat energy, silly memes, and interactive surprises.

### Page Structure
- **Hero section**: Big animated cat illustration with a funny get-well message ("Sending you purr-fect healing vibes" or similar meme-y tone). The cat has subtle idle animation (floating/bobbing).
- **Interactive Cat Grid**: 6-9 clickable cat meme cards. Clicking each triggers a different silly reaction — a popup quote, a wiggle animation, a confetti burst, or a sound-effect-like visual (e.g., "boop!" text appearing). Each cat has a caption in meme-style text (Impact font, white with black outline).
- **"How are you feeling?" Mood Picker**: Three big buttons — "Sad 😿", "Okay 😼", "Mad as in "Tired but tolerating existence" 😹". Clicking each triggers a personalized cat GIF/image response + a funny message tailored to that mood.
- **Surprise Button**: A big tempting "DO NOT PRESS" button. Pressing it unleashes a shower of cat emojis/confetti across the screen + a hidden funny message.
- **Footer**: "Get well soon, you amazing human" — sweet but not overly sappy.

### Design Direction
- **Palette**: Warm and cozy — soft pinks, creams, and a playful accent color (coral or peach). Avoid sterile medical vibes.
- **Typography**: A chunky rounded heading font for meme energy (e.g., Outfit or Space Grotesk) + a clean body font. Meme captions use bold condensed style with shadow.
- **Animation**: Springy, bouncy animations on every interaction. Cats wiggle when hovered. Buttons squish on press. Mood responses slide in with a spring. Confetti on the surprise button.
- **Style**: Kawaii/cute-meets-meme. Not childish, but unapologetically silly and warm.

### Technical Details
- Single route: `/` (homepage). Replace the existing placeholder.
- No backend needed — purely client-side interactive page.
- Use `framer-motion` or `motion` for animations (spring physics on interactions).
- Use `canvas-confetti` for the surprise button effect.
- Cat images: Generate 6-9 fun cat images via image generation (silly poses, cute expressions) and save to `src/assets/`.
- Responsive layout — should feel great on mobile since she'll likely open it on her phone.

### Deliverable
A shareable link she can open. The page is lighthearted, fast to load, and every interaction rewards her with a little dopamine hit.