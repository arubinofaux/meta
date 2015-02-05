const DashboardHandlers = require('./dashboard_handlers');
const IdeasHandlers = require('./ideas_handlers');
const ProductsHandlers = require('./products_handlers');

module.exports = [
  ['/dashboard', require('../components/dashboard/dashboard_index.js.jsx'), DashboardHandlers.showDashboard],
  ['/dashboard/:filter', require('../components/dashboard/dashboard_index.js.jsx'), DashboardHandlers.showDashboard],
  ['/ideas', require('../components/ideas/ideas_index.js.jsx'), IdeasHandlers.showIdeas],
  ['/ideas/new', require('../components/ideas/ideas_new.js.jsx'), IdeasHandlers.showCreateIdea],
  ['/ideas/:id', require('../components/ideas/idea_show.js.jsx'), IdeasHandlers.showIdea],
  ['/ideas/:id/admin', require('../components/ideas/idea_admin.js.jsx'), IdeasHandlers.showIdeaAdmin],
  ['/ideas/:id/edit', require('../components/ideas/idea_edit.js.jsx'), IdeasHandlers.showEditIdea],
  ['/ideas/:id/start-conversation', require('../components/ideas/idea_start_conversation.js.jsx'), IdeasHandlers.showStartConversation],
  ['/:id', require('../components/products/product_show.js.jsx'), ProductsHandlers.showProduct],
  ['/:id/activity', require('../components/products/product_activity.js.jsx'), ProductsHandlers.showProductActivity]
];