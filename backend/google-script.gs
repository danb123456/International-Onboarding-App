
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
    const timestamp = new Date();
    const team = data.teamName || "Unknown Team";
    
    // 1. Process Menu Items
    const menuSheet = getOrCreateSheet(ss, "Menu", ["Timestamp", "Team", "Dish", "Desc", "Protein", "Meat Spec", "Daily Target", "Other Ingredients"]);
    data.menu.forEach(item => {
      const others = (item.otherIngredients || []).map(ing => `${ing.name} (${ing.qty})`).join(", ");
      menuSheet.appendRow([
        timestamp, team, item.dishName, item.description, 
        item.meatType, item.meatSpec, item.dailyPortionTarget, others
      ]);
    });

    // 2. Process Equipment
    const equipSheet = getOrCreateSheet(ss, "Equipment", ["Timestamp", "Team", "Item", "Spec", "Qty", "Date Needed"]);
    data.equipment.forEach(item => {
      equipSheet.appendRow([
        timestamp, team, item.item, item.spec, item.qty, item.dateNeeded
      ]);
    });

    // 3. Process Fuel
    const fuelSheet = getOrCreateSheet(ss, "Fuel", ["Timestamp", "Team", "Type", "Spec", "Qty", "Date Needed"]);
    data.fuel.forEach(item => {
      fuelSheet.appendRow([
        timestamp, team, item.type, item.spec, item.qty, item.dateNeeded
      ]);
    });

    // 4. Process Staff
    const staffSheet = getOrCreateSheet(ss, "Staff", ["Timestamp", "Team", "Name", "Role", "Passport #", "Passport Expiry", "DOB", "Address", "FUME Staff Required?"]);
    data.staff.forEach(person => {
      staffSheet.appendRow([
        timestamp, team, person.fullName, person.role, person.passportNumber, 
        person.passportExpiry, person.dob, person.address, 
        data.needsSupplementaryStaff ? `Yes (${data.supplementaryStaffQty})` : "No"
      ]);
    });

    // 5. Process Flights
    const flightSheet = getOrCreateSheet(ss, "Flights", ["Timestamp", "Team", "Outbound HUB", "Outbound Date", "Inbound HUB", "Inbound Date"]);
    const f = data.flights;
    flightSheet.appendRow([
      timestamp, team, f.outboundAirport, f.outboundDate, f.usArrivalAirport, f.inboundDate
    ]);

    // 6. Process Protocol
    const protocolSheet = getOrCreateSheet(ss, "Protocol", ["Timestamp", "Team", "Activity Date", "Activity", "Result/Requirements"]);
    data.process.forEach(p => {
      protocolSheet.appendRow([
        timestamp, team, p.date, p.process, p.result
      ]);
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
    }
  }
  return sheet;
}