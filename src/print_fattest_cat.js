#!/usr/bin/env node

const { fetchCatItems, fetchCatDetails } = require('./fetch_cats');
const { exec } = require('child_process')

async function main() {

  const catPages = await fetchCatItems();
  if (catPages.length === 0) {
    console.log('No cats found. It is a sad day.');
    return;
  }

  const cats = [];
  for (const catPage of catPages) {
    const catDetails = await fetchCatDetails(catPage);
    if (catDetails.lbs != 0) {
      output = "echo \"animal.cat.weight,name=\"" + catDetails.name + "\" " + catDetails.lbs + "\" | dynatrace_ingest -v";
      console.log(output);
      exec(output);
    }
  }
}

main();