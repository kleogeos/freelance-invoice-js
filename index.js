#!/usr/bin/env node
"use strict";

const fs = require("fs");

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function money(n) {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function render(data) {
  const items = data.items;
  const subtotal = items.reduce((acc, i) => acc + i.qty * i.rate, 0);
  const taxRate = data.tax_rate || 0;
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const rows = items
    .map(
      (i) =>
        `<tr><td>${escapeHtml(i.description)}</td>` +
        `<td style='text-align:right'>${escapeHtml(String(i.qty))}</td>` +
        `<td style='text-align:right'>${money(i.rate)}</td>` +
        `<td style='text-align:right'>${money(i.qty * i.rate)}</td></tr>`
    )
    .join("\n");

  const notes = escapeHtml(data.notes || "");
  const invoiceNumber = escapeHtml(data.invoice_number || "");

  return `<!doctype html><html><head><meta charset="utf-8">
<title>Invoice ${invoiceNumber}</title>
<style>
body{font-family:-apple-system,Arial,sans-serif;max-width:680px;margin:40px auto;color:#1a1a1a}
table{width:100%;border-collapse:collapse;margin-top:24px}
th,td{padding:8px;border-bottom:1px solid #ddd}
th{text-align:left;color:#666;font-size:13px;text-transform:uppercase}
.total{font-size:20px;font-weight:bold}
.meta{color:#666;font-size:14px}
@media print{body{margin:0}}
</style></head><body>
<h1>Invoice ${invoiceNumber}</h1>
<p class="meta">From: ${escapeHtml(data.from || "")}<br>
To: ${escapeHtml(data.to || "")}<br>
Date: ${escapeHtml(data.date || "")} &middot; Due: ${escapeHtml(data.due_date || "")}</p>
<table>
<tr><th>Description</th><th style="text-align:right">Qty</th><th style="text-align:right">Rate</th><th style="text-align:right">Amount</th></tr>
${rows}
</table>
<p style="text-align:right;margin-top:16px">Subtotal: ${money(subtotal)}<br>
${taxRate ? `Tax (${taxRate}%): ${money(tax)}<br>` : ""}
<span class="total">Total: ${money(total)}</span></p>
${notes ? `<p class='meta'>${notes}</p>` : ""}
</body></html>`;
}

function printHelp() {
  console.log(`freelance-invoice-js - generate a clean HTML invoice from a JSON file

Usage: freelance-invoice <input.json> [-o output.html]

Run without installing:
  npx github:kleogeos/freelance-invoice-js example.json -o invoice.html
`);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    process.exit(argv.length === 0 ? 1 : 0);
  }

  let input = null;
  let output = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-o" || a === "--output") {
      output = argv[++i];
    } else if (!input) {
      input = a;
    }
  }

  if (!input) {
    printHelp();
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(input, "utf8"));
  const out = render(data);

  if (output) {
    fs.writeFileSync(output, out);
    console.error(`wrote ${output}`);
  } else {
    console.log(out);
  }
}

module.exports = { render };

if (require.main === module) {
  main();
}
