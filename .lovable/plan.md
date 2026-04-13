
## Plan: Fix spacing before animated text in Hero

**Problem**: Line 87 in `Hero.tsx` has `{t('heroTitle')}{' '}` which adds an explicit space before the animated word (e.g. "вместе"). This creates inconsistent spacing.

**Fix**: In `src/components/Hero.tsx`, line 87 — remove the `{' '}` between `{t('heroTitle')}` and the `<span>`, and instead add a line break (`<br />`) or handle the spacing via CSS/layout so the animated text block sits consistently below or beside the title without an extra space character.

Since the title and animated text are on the same line visually ("Создаем город вместе"), the cleanest fix is to simply remove `{' '}` and let the natural inline spacing of the `<span>` handle it — or add the space inside the `heroTitle` translation values themselves for consistent control.

**Changes**:
1. **`src/components/Hero.tsx`** (line 87): Change `{t('heroTitle')}{' '}` to `{t('heroTitle')} ` — actually, the simplest approach: remove `{' '}` and add a trailing space to each `heroTitle` translation value in the translations file, ensuring uniform spacing across all languages.

Alternatively, just keep `{t('heroTitle')}{' '}` but ensure CSS whitespace is consistent — however the user wants the space removed, so:

1. **`src/components/Hero.tsx`** line 87: Remove `{' '}` → change to just `{t('heroTitle')}` followed by the span on a new line (natural inline whitespace from JSX line break will add one space).

This single change ensures consistent single-space separation across all languages.
