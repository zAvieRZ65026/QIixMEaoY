// 代码生成时间: 2025-08-29 04:32:27
// Import necessary modules and setup
import { defineNuxtPlugin } from '#app';

// Define the UserPermissions plugin
export default defineNuxtPlugin(nuxtApp => {
  // Create a store for user permissions
  nuxtApp.provide('userPermissions', {
    // Initialize permissions
    permissions: {
      admin: ['read', 'write', 'delete'],
      user: ['read'],
      guest: []
    },

    // Check if a user has a specific permission
    hasPermission(userRole, permission) {
      if (!this.permissions[userRole] || !this.permissions[userRole].includes(permission)) {
        throw new Error('Permission denied');
      }
      return true;
    },

    // Add a new permission to a role
    addPermission(role, permission) {
      if (!this.permissions[role]) {
        this.permissions[role] = [];
      }
      this.permissions[role].push(permission);
    },

    // Remove a permission from a role
    removePermission(role, permission) {
      if (!this.permissions[role]) return;
      this.permissions[role] = this.permissions[role].filter(p => p !== permission);
    }
  });
});