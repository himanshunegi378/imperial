# Sidebar Component

A modern, accessible sidebar component built with shadcn/ui components and following the latest UI/UX practices.

## Features

- **Modern Design**: Built with shadcn/ui components for consistent styling
- **Responsive**: Collapsible sidebar with smooth transitions
- **Accessible**: Proper ARIA labels, keyboard navigation, and screen reader support
- **Interactive**: Hover effects, active states, and smooth animations
- **Flexible**: Customizable navigation items and chat history
- **User Management**: Built-in user account dropdown with logout functionality

## Usage

### Basic Implementation

```tsx
import { Sidebar } from './features/Sidebar/Component/Sidebar';
import type { NavItem } from './features/Sidebar/types/NavItem';

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <FiHome className="h-4 w-4" />,
    onClick: (id) => navigate('/home'),
    isActive: location.pathname === '/home',
  },
  // ... more items
];

const chatHistory = [
  { 
    chatId: '1', 
    name: 'Project Discussion', 
    onClick: (chatId) => navigate(`/chat/${chatId}`) 
  },
  // ... more chats
];

<Sidebar
  navItems={navItems}
  chatHistory={chatHistory}
  onDeleteChat={handleDeleteChat}
/>
```

### With Collapsible Functionality

```tsx
const [collapsed, setCollapsed] = useState(false);

<Sidebar
  navItems={navItems}
  chatHistory={chatHistory}
  onDeleteChat={handleDeleteChat}
  collapsed={collapsed}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navItems` | `NavItem[]` | Required | Array of navigation items to display |
| `chatHistory` | `ChatHistoryItem[]` | Required | Array of chat history items |
| `onDeleteChat` | `(chatId: string) => void` | Optional | Callback for deleting chat items |
| `className` | `string` | Optional | Additional CSS classes |
| `collapsed` | `boolean` | `false` | Whether the sidebar is collapsed |

## Types

### NavItem

```tsx
interface NavItem {
  id: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  isActive?: boolean;
  isDisabled?: boolean;
}
```

### ChatHistoryItem

```tsx
interface ChatHistoryItem {
  chatId: string;
  name: string;
  onClick: (chatId: string) => void;
}
```

## Components

### NavButton

Individual navigation button with active states and accessibility features.

### ChatHistoryItem

Chat history item with delete functionality and hover effects.

### User Account Section

User profile display with dropdown menu for account actions.

## Styling

The component uses CSS variables from your design system:

- `--background`: Main background color
- `--foreground`: Text color
- `--primary`: Primary accent color
- `--secondary`: Secondary background color
- `--muted`: Muted text color
- `--border`: Border color
- `--accent`: Hover state background

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: Proper contrast ratios

## Responsive Behavior

- **Desktop**: Full sidebar with labels and icons
- **Collapsed**: Icon-only sidebar with tooltips
- **Mobile**: Responsive design considerations

## Dependencies

- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-tooltip`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-separator`
- `@radix-ui/react-avatar`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

## Examples

See `SidebarDemo.tsx` for a complete working example with all features demonstrated.

## Best Practices

1. **Icons**: Use consistent icon sizes (recommended: 16x16 or 20x20)
2. **Labels**: Keep navigation labels concise and clear
3. **Active States**: Always provide visual feedback for current route
4. **Chat Names**: Use descriptive names for chat history items
5. **Accessibility**: Test with screen readers and keyboard navigation

## Migration from Old Sidebar

The new Sidebar component is a complete rewrite with the following improvements:

- ✅ Modern shadcn/ui components
- ✅ Better accessibility
- ✅ Collapsible functionality
- ✅ Improved visual design
- ✅ Better TypeScript support
- ✅ Consistent styling system
- ✅ Enhanced user experience

## Contributing

When modifying the Sidebar component:

1. Maintain accessibility standards
2. Follow the existing component patterns
3. Test with different screen sizes
4. Ensure keyboard navigation works
5. Update this documentation
