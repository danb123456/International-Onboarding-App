
/**
 * FUME Onboarding App Backend
 * 1. Create a Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Paste this code.
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone).
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Process Menu Items
    const menuSheet = getOrCreateSheet(ss, "Menu");
    data.menu.forEach(item => {
      menuSheet.appendRow([
        new Date(), data.teamName, item.dishName, item.description, 
        item.meatType, item.meatSpec, item.meatQty, item.meatDate,
        item.otherIngredients, item.otherQty, item.otherDate
      ]);
    });

    // Process Equipment
    const equipSheet = getOrCreateSheet(ss, "Equipment");
    data.equipment.forEach(item => {
      equipSheet.appendRow([
        new Date(), data.teamName, item.item, item.spec, item.qty, item.dateNeeded
      ]);
    });

    // Process Fuel
    const fuelSheet = getOrCreateSheet(ss, "Fuel");
    data.fuel.forEach(item => {
      fuelSheet.appendRow([
        new Date(), data.teamName, item.type, item.spec, item.qty, item.dateNeeded
      ]);
    });

    // Process Staff
    const staffSheet = getOrCreateSheet(ss, "Staff");
    data.staff.forEach(person => {
      staffSheet.appendRow([
        new Date(), data.teamName, person.fullName, person.passportNumber, 
        person.dob, person.address, person.needsSupplementary
      ]);
    });

    // Process Flights
    const flightSheet = getOrCreateSheet(ss, "Flights");
    const f = data.flights;
    flightSheet.appendRow([
      new Date(), data.teamName, f.numFlights, f.outboundAirport, f.outboundDate,
      f.inboundAirport, f.inboundDate
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    // Add basic headers if new
    if (name === "Menu") sheet.appendRow(["Timestamp", "Team", "Dish", "Desc", "Meat", "Meat Spec", "Meat Qty", "Meat Date", "Other", "Other Qty", "Other Date"]);
    if (name === "Equipment") sheet.appendRow(["Timestamp", "Team", "Item", "Spec", "Qty", "Date"]);
    if (name === "Fuel") sheet.appendRow(["Timestamp", "Team", "Type", "Spec", "Qty", "Date"]);
    if (name === "Staff") sheet.appendRow(["Timestamp", "Team", "Name", "Passport", "DOB", "Address", "Extra Staff"]);
    if (name === "Flights") sheet.appendRow(["Timestamp", "Team", "Qty", "Out Airport", "Out Date", "In Airport", "In Date"]);
  }
  return sheet;
}
