// 代码生成时间: 2025-09-18 16:36:11
const inventory = [];

// InventoryItem class to represent an item in the inventory
class InventoryItem {
  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  // Method to update item quantity
  updateQuantity(newQuantity) {
    if (newQuantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    this.quantity = newQuantity;
  }

  // Method to update item price
  updatePrice(newPrice) {
    if (newPrice < 0) {
      throw new Error("Price cannot be negative");
    }
    this.price = newPrice;
  }
}

// InventoryService class to handle inventory operations
class InventoryService {
  constructor() {}

  // Method to add an item to the inventory
  addItem(item) {
    if (!(item instanceof InventoryItem)) {
      throw new Error("Invalid item type");
    }
    inventory.push(item);
  }

  // Method to remove an item from the inventory
  removeItem(itemId) {
    const index = inventory.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error("Item not found");
    }
    inventory.splice(index, 1);
  }

  // Method to get all items in the inventory
  getAllItems() {
    return inventory;
  }

  // Method to find an item by ID
  findItemById(itemId) {
    const item = inventory.find(item => item.id === itemId);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  }
}

// Example usage
try {
  const inventoryService = new InventoryService();
  const item1 = new InventoryItem(1, "Widget", 10, 9.99);
  inventoryService.addItem(item1);
  console.log("All items:", inventoryService.getAllItems());
  inventoryService.removeItem(1);
  console.log("All items after removal:", inventoryService.getAllItems());
} catch (error) {
  console.error(error.message);
}