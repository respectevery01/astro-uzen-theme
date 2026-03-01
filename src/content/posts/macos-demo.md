---
title: "MacOS Terminal Style Code Blocks"
description: "A demonstration of how to style your code blocks to look like a macOS terminal window."
pubDate: 2024-03-01
author: "Design Team"
image: 
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    alt: "Code on screen"
category: "Design"
featured: false
---

# Creating Beautiful Code Blocks

One of the best ways to make technical content more engaging is by styling your code blocks. In this example, we've implemented a macOS terminal window style.

## JavaScript Example

Here's a simple JavaScript function:

```javascript
function helloWorld() {
  console.log("Hello, World!");
  
  const user = {
    name: "Developer",
    role: "Admin"
  };
  
  return `Welcome, ${user.name}!`;
}

// Execute the function
helloWorld();
```

## CSS Example

And here's some CSS:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Shell Command

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Python Example

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return(fibonacci(n-1) + fibonacci(n-2))

# Take input from the user
nterms = int(input("How many terms? "))

# check if the number of terms is valid
if nterms <= 0:
   print("Plese enter a positive integer")
else:
   print("Fibonacci sequence:")
   for i in range(nterms):
       print(fibonacci(i))
```

Enjoy the new look!
