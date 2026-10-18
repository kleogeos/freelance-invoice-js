# freelance-invoice-js

[![test](https://github.com/kleogeos/freelance-invoice-js/actions/workflows/test.yml/badge.svg)](https://github.com/kleogeos/freelance-invoice-js/actions/workflows/test.yml)

Generate a clean, printable HTML invoice from a JSON file. Zero dependencies
— a direct Node.js port of
[freelance-invoice-cli](https://github.com/kleogeos/freelance-invoice-cli)
(Python), for people who reach for `npx` instead of `pip`.

Output is cross-checked byte-for-byte against the Python version (same input
→ identical HTML) — see `test.js`.

## Run without installing

```bash
npx github:kleogeos/freelance-invoice-js example.json -o invoice.html
```

No npm account, no registry publish, no global install — `npx` clones the
repo and runs it directly.

Open `invoice.html` in a browser, or print to PDF (Ctrl/Cmd+P → Save as PDF).

## Invoice JSON format

```json
{
  "invoice_number": "INV-0001",
  "from": "Jane Doe, Freelance Developer",
  "to": "Acme Corp",
  "date": "2026-10-14",
  "due_date": "2026-10-28",
  "tax_rate": 0,
  "items": [
    {"description": "Website redesign", "qty": 1, "rate": 1800}
  ],
  "notes": "Net 14. Late payments accrue 1.5% monthly interest after the due date."
}
```

See [`example.json`](example.json) for a full example.

## Install locally (optional)

```bash
git clone https://github.com/kleogeos/freelance-invoice-js.git
cd freelance-invoice-js
npm link   # makes `freelance-invoice` available globally
```

## Tests

```bash
npm test
```

## Why a CLI instead of a web app?

If you're already comfortable in a terminal, this is faster than filling out
a form every time — keep a JSON template per client, tweak the line items,
and generate. No account, no data leaving your machine.

Prefer a web form instead? Use the free browser version: [invoice generator](https://kleogeos.github.io/freelancer-tools/invoice.html) · [rate calculator](https://kleogeos.github.io/freelancer-tools/rate-calculator.html)

Prefer Python? Same tool, same output: [freelance-invoice-cli](https://github.com/kleogeos/freelance-invoice-cli). Calculate your hourly rate via npx too: [freelance-rate-js](https://github.com/kleogeos/freelance-rate-js). Scan a contract for missing clauses via npx too: [contract-checklist-js](https://github.com/kleogeos/contract-checklist-js).

Need the paperwork beyond invoices — proposals, contracts, late-payment emails, client scripts? [Freelancer Starter Kit ($15, Telegram Stars or crypto, no KYC)](https://kleogeos.github.io/freelancer-tools/kit.html?src=cli-invoice-js)

Free and will stay free. If it saved you time: [tip with crypto](https://kleogeos.github.io/freelancer-tools/donate.html).

## License

MIT — do whatever you want with it.
